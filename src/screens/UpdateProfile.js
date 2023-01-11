import React, { useEffect, useState } from "react";
import { Text, TextInput } from "react-native-paper";
import { Button, StyleSheet, View } from "react-native";
import auth, { firebase } from "@react-native-firebase/auth";
import { handleSave } from "../firebase/firebse_CRUD";
import { useNavigation } from "@react-navigation/native";


const Settings = () => {
  const navigation = useNavigation();
  const [fName, setfname] = useState("");
  const [lName, setLname] = useState("");
  const [cnfrmPass, setCnfrmPass] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    let name = firebase.auth().currentUser.displayName;
    if (name) {
      let abc = name.split(" ");
      console.log("f", abc[0], abc[1]);

      setfname(abc[0]);
      setLname(abc[1]);
    }

  }, []);

  const handleUpdate = () => {
    const update = {
      displayName: fName + " " + lName,
    };

    firebase.auth().currentUser.updateProfile(update).then(async (e) => {
      console.log(await firebase.auth().currentUser);
    });
  };

  const handleLogout = () => {

    handleSave(true);
    auth()
      .signOut()
      .then(() => console.log("User signed out!"));

    navigation.navigate("Login");
  };
// update password
  const handlePasswordUpdate = () => {
    if (pass && cnfrmPass) {
      if (pass === cnfrmPass) {
        try {

          firebase.auth().currentUser.updatePassword(pass)
            .then(async (e) => {
              console.log(await firebase.auth().currentUser);
              alert("Password updated Successfully!!!");
              setPass("")
              setCnfrmPass('')
            });
        } catch (e) {
          alert(e.code);
        }
      } else {
        alert("Passwords don't match!!!");
      }
    } else {
      alert("Enter Password");

    }

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
          Profile
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
            setfname(e);
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
            setLname(e);
          }}
        />
        <Button
          title="Update name"

          icon="content-save"
          mode="contained"
          onPress={handleUpdate}
          style={{ marginTop: 5, marginBottom: 5 }}
        >
          Update name
        </Button>
        <TextInput
          mode="outlined"
          label="New Password"
          placeholder="Enter password"
          right={<TextInput.Affix text="required" />}
          style={{ margin: 10 }}
          secureTextEntry={true}
          value={pass}
          onChangeText={(e) => {
            setPass(e.trim());
          }}
        />
        <TextInput
          mode="outlined"
          label="Confirm Password"
          placeholder="Confirm password"
          right={<TextInput.Affix text="required" />}
          style={{ margin: 10 }}
          secureTextEntry={true}
          value={cnfrmPass}
          onChangeText={(e) => {
            setCnfrmPass(e.trim());
          }}
        />

        <Button
          title="Update Password"

          icon="content-save"
          mode="contained"
          onPress={handlePasswordUpdate}
          style={{ marginTop: 5, marginBottom: 5 }}
        >
          Update password
        </Button>

        <Text> </Text>
        <>
          <Button
            title="Logout"
            // icon="logout"
            mode="contained"
            onPress={handleLogout}
            style={{ marginTop: 50, marginBottom: 5 }}

          > Logout</Button>
        </>
      </View>


    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
export default Settings;
