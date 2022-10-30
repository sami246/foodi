import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors, shadow, sizes, spacing} from '../constants/theme';
// Screens
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PostsScreen from '../screens/PostsScreen';
import AddPostScreen from '../screens/AddPostScreen';
import DishDetailsScreen from '../screens/DishDetailsScreen';

const Tab = createBottomTabNavigator()

const homeName = 'Home';
const postsName = 'Posts'
const profileName = 'Profile';
const settingsName = 'Settings';

export default function MainContainer({navigation}) {
  return (
        
        <Tab.Navigator 
        initialRouteName={homeName}
        screenOptions ={({route}) => ({
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.gray,
            tabBarLabelStyle: {
                fontSize: 10,
            },
            tabBarStyle: [
                {
                display: "flex",
                padding: 5,
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
                else if (routeName === postsName){
                    iconName = focused ? 'layers' : 'layers-outline'
                }
                

                return <Ionicons name={iconName} size={size} color={color} />
            }
        })}
        
        >

            <Tab.Screen options={{headerShown: false}} name={homeName} component={HomeScreen} navigation={navigation}/>
            <Tab.Screen options={{headerShown: false}} name={postsName} component={PostsScreen} navigation={navigation}/>
            <Tab.Screen options={{headerShown: false}} name={profileName} component={ProfileScreen} navigation={navigation}/>
            <Tab.Screen options={{headerShown: false}} name={settingsName} component={AddPostScreen} navigation={navigation}/>
            

        </Tab.Navigator>
  )
}
