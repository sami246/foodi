import React, {createContext, useState} from 'react';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
// import { getAuth, signOut, GoogleAuthProvider,signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";


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
                  console.log({user})
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
      // Need to do google login
      }}>
      {children}
    </AuthContext.Provider>
  );
};