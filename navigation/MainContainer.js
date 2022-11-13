import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors, shadow, sizes, spacing} from '../constants/theme';
// Screens
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PostsScreen from '../screens/PostsScreen';
import AddDishScreen from '../screens/AddDishScreen';


const Tab = createMaterialBottomTabNavigator()

const homeName = 'Home';
const postsName = 'Posts'
const profileName = 'Profile';
const settingsName = 'Settings';

export default function MainContainer({navigation}) {
  return (
        
        <Tab.Navigator 
        initialRouteName={homeName}
        activeColor = {colors.white}
        inactiveColor = {colors.black}
        barStyle = {{
            backgroundColor: colors.lightOrange,
            fontSize: 20
        }}
        
        screenOptions ={({route}) => ({
            
            // activeColor: colors.primary,
            // tabBarInactiveTintColor: colors.gray,
            // tabBarLabelStyle: {
            //     fontSize: 10,
            // },
            // tabBarStyle: [
            //     {
            //     display: "flex",
            //     padding: 5,
                
            
            //     }, null ],
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
                else if (routeName === postsName){
                    iconName = focused ? 'layers' : 'layers-outline'
                }
                

                return <Ionicons name={iconName} size={22} color={color} />
            }
        })}
        
        >

            <Tab.Screen options={{headerShown: false}} name={homeName} component={HomeScreen} navigation={navigation}/>
            <Tab.Screen options={{headerShown: false}} name={postsName} component={PostsScreen} navigation={navigation}/>
            <Tab.Screen options={{headerShown: false}} name={profileName} component={ProfileScreen} navigation={navigation}/>
            <Tab.Screen options={{headerShown: false}} name={settingsName} component={SettingsScreen} navigation={navigation}/>
            

        </Tab.Navigator>
  )
}
