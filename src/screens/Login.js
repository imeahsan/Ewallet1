import React from 'react';
import { TextInput, Avatar, Button } from 'react-native-paper';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import Signup from './Signup';
import auth from '@react-native-firebase/auth';
import { useState } from 'react';
import { getDataFromFirebase } from "../firebase/firebse_CRUD";

const Login = ({ navigation }) => {

  let [email, setEmail] = useState(undefined)
  let [password, setPassword] = useState(undefined)
  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((abc) => {
        console.log(abc);
        console.log('User signed in!');
        getDataFromFirebase(abc.user.uid).then(r => console.log(1))
        navigation.navigate("nav")
      })
      // .catch(error => {
      //   if (error.code === 'auth/email-already-in-use') {
      //     console.log('That email address is already in use!');
      //   }

        // if (error.code === 'auth/invalid-email') {
        //   console.log('That email address is invalid!');
        // }
        //todo error handling
        // console.error(error);
      };


  return (
    <View>
      <View style={{ marginTop: 25 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            alignSelf: 'center',
          }}>
          Login
        </Text>
      </View>
      <View style={{ alignItems: 'center', marginTop: 25 }}>
        <Avatar.Icon size={250} icon="wallet" />
      </View>

      <View style={{ marginTop: 25, padding: 10 }}>
        <TextInput
          mode="outlined"
          label="Email"
          placeholder="Enter email"
          right={<TextInput.Affix text="required" />}
          style={{ margin: 10 }}
          value={email}
          onChangeText={(e) => {
            setEmail(e.trim())
          }}
        />
        <TextInput
          mode="outlined"
          label="Password"
          placeholder="Enter password"
          right={<TextInput.Affix text="required" />}
          style={{ margin: 10 }}
          secureTextEntry={true}
          value={password}
          onChangeText={(e) => { setPassword(e.trim()) }}
        />
        <TouchableOpacity style={{ alignSelf: 'center', marginTop: 20 }} onPress={() => { navigation.navigate('signup') }}>
          <Text>Not Registered? Create an account now</Text>
        </TouchableOpacity>
        <Button
          icon="login"
          mode="contained"
          onPress={handleLogin}
          style={{ marginHorizontal: 100, marginTop: 20, padding: 5 }}>
          Login
        </Button>
      </View>
    </View>
  );
};

export default Login;
