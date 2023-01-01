import React from 'react';
import { TextInput, Button } from 'react-native-paper';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useState } from 'react';


const Settings = ({ navigation }) => {

  const [fName, setfname] = useState('')
  const [lName, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')



  const handleUpdate = () => {
    let user = auth().currentUser
    console.log()

  }

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    // navigation.navigate("Login")
  }

  return (
    <View>
      <View style={{ marginTop: 25 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            alignSelf: 'center',
          }}>
          Settings
        </Text>
      </View>
      <View style={{ marginTop: 50, padding: 10 }}>
        <TextInput
          mode="outlined"
          label="First Name"
          placeholder="Enter first name"
          right={<TextInput.Affix text="required" />}
          style={{ margin: 10 }}
          value={fName}
          onChangeText={(e) => {
            setfname(e.trim())
          }}
        />
        <TextInput
          mode="outlined"
          label="Last Name"
          placeholder="Enter last name"
          right={<TextInput.Affix text="required" />}
          style={{ margin: 10 }}
          value={lName}
          onChangeText={(e) => {
            setLname(e.trim())
          }}
        />
        <TextInput
          mode="outlined"
          label="Email"
          placeholder="Enter email"
          right={<TextInput.Affix text="required" />}
          style={{ margin: 10 }}
        />
        <TextInput
          mode="outlined"
          label="Password"
          placeholder="Enter password"
          right={<TextInput.Affix text="required" />}
          style={{ margin: 10 }}
        />

        <Button
          icon="content-save"
          mode="contained"
          onPress={handleUpdate}
          style={{ marginHorizontal: 100, marginTop: 50, padding: 5 }}>
          Save
        </Button>
        <Button
          icon="logout"
          mode="contained"
          onPress={handleLogout}
          style={{ marginHorizontal: 100, marginTop: 50, padding: 5 }}>
          Logout
        </Button>
      </View>
    </View>
  );
};

export default Settings;
