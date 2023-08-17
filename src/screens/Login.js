import React, {useState} from 'react';
import {Avatar, Button, Text, TextInput} from 'react-native-paper';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {getDataFromFirebase} from '../firebase/firebse_CRUD';

const Login = ({navigation}) => {
  let [email, setEmail] = useState(undefined);
  let [password, setPassword] = useState(undefined);
  const handleLogin = () => {
    try {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(abc => {
          console.log(abc);
          console.log('User signed in!');
          getDataFromFirebase(abc.user.uid).then(r => console.log(1));
          navigation.navigate('nav');
        })
        .catch(error => {
          alert(error.code);
        });
    } catch (e) {
      alert('Something went Wrong!!!');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View  >
            <Text
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              Login
            </Text>
          </View>
          <View style={{alignItems: 'center', marginTop: 25}}>
            <Avatar.Icon size={250} icon="wallet" />
          </View>

          <View style={{marginTop: 25, padding: 10}}>
            <TextInput
              mode="outlined"
              label="Email"
              keyboardType="email-address"
              placeholder="Enter email"
              right={<TextInput.Affix text="required" />}
              style={{margin: 10}}
              value={email}
              onChangeText={e => {
                setEmail(e.trim());
              }}
            />
            <TextInput
              mode="outlined"
              label="Password"
              placeholder="Enter password"
              right={<TextInput.Affix text="required" />}
              style={{margin: 10}}
              secureTextEntry={true}
              value={password}
              onChangeText={e => {
                setPassword(e.trim());
              }}
            />
            <TouchableOpacity
              style={{alignSelf: 'center', marginTop: 20}}
              onPress={() => {
                navigation.navigate('signup');
              }}>
              <Text>Not Registered? Create an account now</Text>
            </TouchableOpacity>
            <Button
              icon="login"
              mode="contained"
              onPress={handleLogin}
              style={{marginHorizontal: 100, marginTop: 20, padding: 5}}>
              Login
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
// eslint-disable-next-line no-undef
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
});
export default Login;
