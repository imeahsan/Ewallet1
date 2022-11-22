import React from 'react';
import {TextInput, Avatar, Button} from 'react-native-paper';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';

const Login = () => {
  return (
    <View>
      <View style={{marginTop: 25}}>
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
          label="Username"
          placeholder="Enter username"
          right={<TextInput.Affix text="required" />}
          style={{margin: 10}}
        />
        <TextInput
          mode="outlined"
          label="Password"
          placeholder="Enter password"
          right={<TextInput.Affix text="required" />}
          style={{margin: 10}}
        />
        <Button
          icon="login"
          mode="contained"
          onPress={() => console.log('Password toh daal bay')}
          style={{marginHorizontal: 100, marginTop: 50, padding: 5}}>
          Login
        </Button>
      </View>
    </View>
  );
};

export default Login;
