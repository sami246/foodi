import { View, Text } from 'react-native'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator()

const homeName = 'Home';
const profileName = 'Profile';
const settingsName = 'Settings';

export default function MainContainer() {
  return (

        <Tab.Navigator 
        initialRouteName={homeName}
        screenOptions ={({route}) => ({
            tabBarActiveTintColor: "green",
            tabBarInactiveTintColor: "gray",
            tabBarLabelStyle: {
                fontSize: 12,
            },
            tabBarStyle: [
                {
                display: "flex",
                padding: 3,
                }, null ],
            tabBarIcon: ({focused, color, size}) => {
                let iconName;
                let routeName = route.name;

                if (routeName === homeName){
                    iconName = focused ? 'home' : 'home-outline'
                }
                else if (routeName === profileName){
                    iconName = focused ? 'person-circle' : 'person-circle-outline'
                }
                else if (routeName === settingsName){
                    iconName = focused ? 'settings' : 'settings-outline'
                }

                

                return <Ionicons name={iconName} size={size} color={color} />
            }
        })}
        
        
        >

            <Tab.Screen options={{headerShown: false}} name={homeName} component={HomeScreen}/>
            <Tab.Screen options={{headerShown: false}} name={profileName} component={ProfileScreen}/>
            <Tab.Screen options={{headerShown: false}} name={settingsName} component={SettingsScreen}/>

        </Tab.Navigator>
  )
}
