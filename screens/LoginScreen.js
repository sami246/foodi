import { StyleSheet, Text, TextInput, View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext} from 'react';
import AppButton from '../components/SmallComponents/AppButton';
import { colors, sizes } from '../constants/theme';
import { AuthContext } from '../contexts/AuthProvider';
import { auth } from '../firebase';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';


const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {user, setUser, SignIn, SignInWithPopup, GoogleSignIn} = useContext(AuthContext);
     
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
                <View style={{height: 60}}>
                    <AppButton
                        fontSize={18}
                        height={45}
                        width= {'100%'}
                        onPress={() => {SignIn(email, password)}}
                        title= "Login"
                        backgroundColor={colors.orange}
                        color={colors.white}
                    />
                </View>
                <View style={{height: 60}}>
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
                    <GoogleSigninButton
                        style={{ width: '103%', height: 57, borderRadius: 10, }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Light}
                        onPress={() => GoogleSignIn()}
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
        // marginTop: 40,
        marginBottom: 70
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