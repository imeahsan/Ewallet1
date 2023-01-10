import React from "react";
import { TextInput } from "react-native-paper";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import { Alert, Button } from "react-native";
import auth, { firebase } from "@react-native-firebase/auth";
import { useState } from "react";
import { handleSave, saveData } from "../firebase/firebse_CRUD";
import { useNavigation } from "@react-navigation/native";


const Settings = () => {
  const navigation = useNavigation();
  const [fName, setfname] = useState("");
  const [lName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");


  const handleUpdate = () => {

  };

  const handleLogout = () => {
    // let user = auth().currentUser;

    // saveData(user).then(r => console.log("data saved"));
    handleSave();
    auth()
      .signOut()
      .then(() => console.log("User signed out!"));

    navigation.navigate("Login");
  };
// update password
  const updatePassword = () => {
    firebase.auth().currentUser.updatePassword(pass)
      .then(async (e) => {
        console.log(await firebase.auth().currentUser);
      });
  };
  return (
    <View>
      <View style={{ marginTop: 25 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            alignSelf: "center",
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
            setfname(e.trim());
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
            setLname(e.trim());
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
          title="Save"

          icon="content-save"
          mode="contained"
          onPress={handleUpdate}
          style={{ marginTop: 5, marginBottom: 5 }}
        >
          Save
        </Button>
        <Button
          title="Logout"
          // icon="logout"
          mode="contained"
          onPress={handleLogout}
          style={{ marginTop: 5, marginBottom: 5 }}
        />

      </View>
    </View>
  );
};

export default Settings;
