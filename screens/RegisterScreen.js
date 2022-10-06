import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';



const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleRegister() {
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
    <View style={styles.container} behavior='padding'>
        <View style = {styles.inputContainer}>
            {/* <TextInput 
                placeholder='Name'
                value={name}
                style={styles.input} 
                onChangeText = { text => setName(text)}
            /> */}
            <TextInput 
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
                <TouchableOpacity 
                    onPress={handleRegister}
                    style = {styles.button}>
                    <Text style = {styles.buttonText}>Register</Text>   
                </TouchableOpacity>

        </View>
    </View>
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
        width: '60%',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 40
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
    
})