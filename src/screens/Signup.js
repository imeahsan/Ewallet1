import React from 'react';
import {TextInput, Button} from 'react-native-paper';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';

const Signup = () => {
  return (
    <View>
      <View style={{marginTop: 25}}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            alignSelf: 'center',
          }}>
          Create an account
        </Text>
      </View>
      <View style={{marginTop: 50, padding: 10}}>
        <TextInput
          mode="outlined"
          label="First Name"
          placeholder="Enter first name"
          right={<TextInput.Affix text="required" />}
          style={{margin: 10}}
        />
        <TextInput
          mode="outlined"
          label="Last Name"
          placeholder="Enter last name"
          right={<TextInput.Affix text="required" />}
          style={{margin: 10}}
        />
        <TextInput
          mode="outlined"
          label="Email"
          placeholder="Enter email"
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
        <TextInput
          mode="outlined"
          label="Confirm Password"
          placeholder="Re-enter password"
          right={<TextInput.Affix text="required" />}
          style={{margin: 10}}
        />
        <Button
          icon="account-plus"
          mode="contained"
          onPress={() => console.log('Password toh daal bay')}
          style={{marginHorizontal: 100, marginTop: 50, padding: 5}}>
          Signup
        </Button>
      </View>
    </View>
  );
};

export default Signup;
