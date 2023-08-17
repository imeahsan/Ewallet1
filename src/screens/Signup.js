/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

import auth, {firebase} from '@react-native-firebase/auth';

const Signup = ({navigation}) => {
    const [firstName, setFirstName] = useState(undefined);
    const [lastName, setLastName] = useState(undefined);
    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [confirmPassword, setConfirmPassword] = useState(undefined);

    const handleSignUp = async () => {
        if (firstName && lastName && email && password && confirmPassword) {
            if (password === confirmPassword) {
                alert(password);
                auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(async abc => {
                        console.log(abc);
                        console.log('User account created & signed in!');
                        const update = {
                            displayName: firstName + ' ' + lastName,
                        };

                        firebase
                            .auth()
                            .currentUser.updateProfile(update)
                            .then(async e => {
                                console.log(await firebase.auth().currentUser);
                            });
                        navigation.navigate('nav');
                    })

                    .catch(error => {
                        if (error.code === 'auth/email-already-in-use') {
                            console.log('That email address is already in use!');
                        }

                        if (error.code === 'auth/invalid-email') {
                            console.log('That email address is invalid!');
                        }
                        //todo error handling
                        console.error(error);
                    });

                alert('password matched');
            } else {
                alert('passwords donot match');
            }
        } else {
            alert('enter credentials');
        }
        // alert(firstName)

        // navigation.navigate("Login")
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>

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
                        <View style={{marginTop: 10, padding: 10}}>
                            <TextInput
                                mode="outlined"
                                label="First Name"
                                placeholder="Enter first name"
                                right={<TextInput.Affix text="required"/>}
                                style={{margin: 10}}
                                value={firstName}
                                onChangeText={e => setFirstName(e)}
                            />
                            <TextInput
                                mode="outlined"
                                label="Last Name"
                                placeholder="Enter last name"
                                right={<TextInput.Affix text="required"/>}
                                style={{margin: 10}}
                                value={lastName}
                                onChangeText={e => {
                                    setLastName(e);
                                }}
                            />
                            <TextInput
                                mode="outlined"
                                label="Email"
                                keyboardType="email-address"
                                placeholder="Enter email"
                                right={<TextInput.Affix text="required"/>}
                                style={{margin: 10}}
                                value={email}
                                onChangeText={e => {
                                    setEmail(e.trim());
                                }}
                                autoComplete="email"
                            />
                            <TextInput
                                mode="outlined"
                                label="Password"
                                placeholder="Enter password"
                                right={<TextInput.Affix text="required"/>}
                                style={{margin: 10}}
                                value={password}
                                onChangeText={e => {
                                    setPassword(e);
                                }}
                                secureTextEntry={true}
                            />
                            <TextInput
                                mode="outlined"
                                label="Confirm Password"
                                placeholder="Re-enter password"
                                secureTextEntry={true}
                                right={<TextInput.Affix text="required"/>}
                                style={{margin: 10}}
                                value={confirmPassword}
                                onChangeText={e => {
                                    setConfirmPassword(e);
                                }}
                            />
                            <TouchableOpacity
                                style={{alignSelf: 'center', marginTop: 20}}
                                onPress={() => {
                                    navigation.navigate('Login');
                                }}>
                                <Text>Already have an account? Login now</Text>
                            </TouchableOpacity>
                            <Button
                                icon="account-plus"
                                mode="contained"
                                onPress={() => {
                                    handleSignUp();
                                }}
                                style={{marginHorizontal: 100, marginTop: 20, padding: 5}}>
                                Signup
                            </Button>
                        </View>

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};


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
export default Signup;
