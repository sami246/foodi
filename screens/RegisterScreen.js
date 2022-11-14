import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import AppButton from '../components/AppButton';
import { colors } from '../constants/theme';



const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleRegister() {
        console.log("auth", auth)
        console.log("email", email)
        console.log("password", password)
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            console.log("Created a user")
            const user = userCredential.user;
            console.log(user.email)
            navigation.navigate('Login')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === "auth/invalid-email"){
                alert("Invalid Email")
            }
        });
    }

  return (
    <SafeAreaView style={styles.container} behavior='padding'>
        <View style = {styles.titleContainer}>
            <Image  style={styles.titleImage} source={require('../assets/icon.png')} />
        </View>
        <View style = {styles.inputContainer}>
            <TextInput 
                placeholder='Full Name'
                value={name}
                style={styles.input} 
                onChangeText = { text => setName(text)}
            />
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
                        onPress={handleRegister}
                        title= "Register"
                        backgroundColor={colors.orange}
                        color={colors.white}
                    />
        </View>
    </SafeAreaView>
  )
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
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
        marginTop: 40,
        height: 70
    },
    button: {
        backgroundColor: '#0782F9',
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
        borderColor: '#0782F9',
        borderWidth: 2
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16
    },
    titleContainer : {
        flex: 1,
        width: '80%',
        justifyContent: 'center',
        alignContent: 'center',
        
    },

    titleImage: {
        width: 200,
        resizeMode: 'cover',
        height: 100,
        alignSelf: 'center'
    }
    
})