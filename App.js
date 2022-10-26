import { StyleSheet, Linking, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainContainer from './navigation/MainContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';


const Stack = createNativeStackNavigator();
const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

export default function App() {
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  // To be able to persist state
  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }


  return (
    <SafeAreaProvider>
      <NavigationContainer>
          <Stack.Navigator>

            {/* Authentification */}
              <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            {/* Main App */}
              <Stack.Screen options={{headerShown: false}} name="MainContainer" component={MainContainer} />

          </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
