import { StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { useState, useEffect} from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import AppButton from '../components/AppButton';
import { colors, sizes } from '../constants/theme';


const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({});

    useEffect(() => {
        // Use unsubscribe to leave from listener to save power
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user){
                navigation.replace('MainContainer')
            }
            })
            return unsubscribe;
    }, [])
    
   
    function handleSignIn () {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                
                const user = userCredential.user;
                setUser(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error)
                alert(errorMessage)
            });
    }

  
  return (
        <SafeAreaView style={styles.container} behavior='padding'>
            <View style = {styles.titleContainer}>
                <Image  style={styles.titleImage} source={require('../assets/icon.png')} />
            </View>
            <View style = {styles.inputContainer}>
                <TextInput 
                    keyboardType='email-address'
                    placeholder='Email'
                    value={email}
                    style={styles.input} 
                    onChangeText = { text => setEmail(text)}
                />
                <TextInput 
                    placeholder='Password'
                    value={password}
                    style={styles.input} 
                    onChangeText = { text => setPassword(text)}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonContainer}>
                    <AppButton
                        fontSize={18}
                        height={45}
                        width= {'100%'}
                        onPress={handleSignIn}
                        title= "Login"
                        backgroundColor={colors.orange}
                        color={colors.white}
                    />
                    <AppButton
                        fontSize={18}
                        height={45}
                        width= {'100%'}
                        onPress={() => navigation.navigate('Register')}
                        title= "Register"
                        backgroundColor={colors.white}
                        color={colors.lightOrange}
                        buttonStyle={{borderColor: colors.orange, borderWidth: 2}}
                    />
                </View>
        </SafeAreaView>

  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: sizes.height,
        height: sizes.height,
        flex: 1
    },
    inputContainer: {
        flex: 1,
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },
    buttonContainer: {
        flex: 1,
        width: '60%',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 40
    },
    button: {
        backgroundColor: '#CC9767',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 7,
        borderColor: '#CC9767',
        borderWidth: 2
    },
    buttonOutlineText: {
        color: '#CC9767',
        fontWeight: '700',
        fontSize: 16
    },
    titleContainer : {
        flex: 1.5,
        width: '80%',
        justifyContent: 'center',
        alignContent: 'center',
        
    },

    titleImage: {
        width: 180,
        resizeMode: 'cover',
        height: 100,
        alignSelf: 'center',
        borderRadius: 12
    }
    
})