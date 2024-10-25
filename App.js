/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from './components/Onboarding/Onboarding';
import Login from './components/Login/Login';

const Stack = createNativeStackNavigator();

function App() {
  // Set the initial route name
  const [initialRouteName] = useState('Onboarding');

  // Array of screens for easier modification and expansion
  const screens = [
    {name: 'Onboarding', component: Onboarding, gestureEnabled: false},
    {name: 'Login', component: Login, gestureEnabled: true},
  ];

  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}

export default App;
