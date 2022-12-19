import React, {createContext, useState} from 'react';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, signOut, signInWithPopup, getAuth } from "firebase/auth";
// import { getAuth, signOut, GoogleAuthProvider,signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '473160056235-6pgc5n15pt6q8b8ibcpf21t2lts0rl7d.apps.googleusercontent.com'
});

const provider = new GoogleAuthProvider();


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        SignIn: (email, password) => {
            console.log(email,password)
              signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                  // Signed in 
                  const user = userCredential.user;
                  setUser(user)
                  navigation.navigate('MainContainer')
              })
              .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log(error)
                  alert(errorMessage)
              });
      },
      Register: (email, password) => {
          createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              // Signed in 
              sendEmailVerification(userCredential.currentUser)
              .then(() => {
                  alert("Your User has been Created!\nLook out in your email inbox for a verification email")
                  signOut(userCredential)
              }).catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log("Error: ", errorCode)
              }).finally(() => {
                  navigation.navigate('Login')
              }
              )
            
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              if (errorCode === "auth/invalid-email"){
                  alert("Invalid Email")
              }
          });
      },
      SignOut: () => {
          signOut(auth).then(() => {
            navigation.replace('Login')
          }).catch((error) => {
            alert(error.message)
          });
      },
      SignInWithPopup : () => {
        const auth = getAuth();
        console.log({auth})
        signInWithPopup(auth, provider)
          .then((result) => {
            console.log({result})
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            console.log({credential})
            const token = credential.accessToken;
            console.log({token})
            // The signed-in user info.
            const user = result.user;
            console.log({user})
            // ...
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
      },
      GoogleSignIn: async () => {
          try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log({userInfo})
            // user = userInfo
          } catch (error) {
            
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
            } else {
              console.log(error)
              // some other error happened
            }
          }
      }
      // Need to do google login
      }}>
      {children}
    </AuthContext.Provider>
  );
};