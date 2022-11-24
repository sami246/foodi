import React, {useContext, useState, useEffect} from 'react';
import { auth } from '../firebase';
import {AuthContext} from '../contexts/AuthProvider';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MainContainer from '../navigation/MainContainer';
import DishDetailsScreen from '../screens/DishDetailsScreen';
import AddDishScreen from '../screens/AddDishScreen';
import { DataProvider } from '../contexts/DataContext';


const Stack = createNativeStackNavigator();


const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <>
        {user ?
         <DataProvider>
            <Stack.Navigator>
                {/* Main App */}
                <Stack.Screen options={{headerShown: false}} name="MainContainer" component={MainContainer} />
                <Stack.Screen options={{headerShown: true, animation:'slide_from_bottom'}} name='Post Detail' component={DishDetailsScreen} />
                <Stack.Screen options={{headerShown: false, animation:'slide_from_bottom'}} name='Add Dish' component={AddDishScreen} />
            </Stack.Navigator>
          </DataProvider>
         : 
            
                <Stack.Navigator>
                    {/* Authentification */}
                    <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </Stack.Navigator>
           
        }
    </>
      
  );
};

export default Routes;