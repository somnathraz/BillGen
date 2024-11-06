/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from './components/Onboarding/Onboarding';
import Login from './components/Login/Login';
import auth from '@react-native-firebase/auth';
import Home from './components/Home/Home';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SnackbarProvider} from './context/SnackBarContext';
const Stack = createNativeStackNavigator();

function App() {
  // Set the initial route name
  const [initialRouteName, setInitialRouteName] = useState('Onboarding');

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        setInitialRouteName('Home'); // Navigate to Home if logged in
      } else {
        setInitialRouteName('Onboarding'); // Navigate to Onboarding if not logged in
      }
    });
    return unsubscribe; // Unsubscribe on component unmount
  }, []);

  // Array of screens for easier modification and expansion
  const screens = [
    {name: 'Onboarding', component: Onboarding, gestureEnabled: false},
    {name: 'Login', component: Login, gestureEnabled: true},
    {name: 'Home', component: Home, gestureEnabled: true},
  ];

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SnackbarProvider>
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{headerShown: false}}>
            {screens.map((screen, index) => (
              <Stack.Screen
                key={index}
                name={screen.name}
                component={screen.component}
                options={{
                  gestureEnabled: screen.gestureEnabled,
                }}
              />
            ))}
          </Stack.Navigator>
        </SnackbarProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
