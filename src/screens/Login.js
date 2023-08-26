/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Avatar, Button, Snackbar, Text, TextInput} from 'react-native-paper';
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
        Keyboard.dismiss();
        try {
            if (email && password) {
                auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(abc => {
                        console.log(abc);
                        console.log('User signed in!');
                        getDataFromFirebase(abc.user.uid).then(() => {
                            navigation.navigate('nav');
                        });
                    })
                    .catch(error => {
                        showSnackBar(error.code);
                    });
            } else {

                showSnackBar('Enter email/password!!');
            }
        } catch (e) {
            showSnackBar('Something went Wrong!!!');
        }
    };
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
    const showSnackBar = (msg) => {
        Keyboard.dismiss();
        setMessage(msg);
        console.log(message);
        onToggleSnackBar();
        // setTimeout(onToggleSnackBar, 3000)
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <View style={styles.inner2}>
                        <View>
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
                            <Avatar.Icon size={100} icon="wallet"/>
                        </View>

                        <View style={{marginTop: 5, padding: 10}}>
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
                            />
                            <TextInput
                                mode="outlined"
                                label="Password"
                                placeholder="Enter password"
                                right={<TextInput.Affix text="required"/>}
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
                    <Snackbar
                        style={{
                            margin: 25, alignContent: 'center', position: 'absolute',
                            bottom: 0,
                        }}
                        duration={3000}
                        visible={visible}
                        icon="information-outline"
                        onDismiss={onDismissSnackBar}
                    >
                        <View style={{backgroundColor: 'transparent', ...styles.centeredContent}}>
                            <Text style={{backgroundColor: 'transparent', ...styles.centeredContent}}>{message}</Text>
                        </View>

                    </Snackbar>
                </View>

            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
    },
    inner: {
        // padding: 24,
        flex: 1,
        justifyContent: 'space-around',
    }, inner2: {
        padding: 24,
        flex: 1,
        justifyContent: 'flex-start',
    }, centeredContent: {

        alignItems: 'center',
        justifyContent: 'center',
        color: "black"
    },
});
export default Login;
