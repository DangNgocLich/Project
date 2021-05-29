import React, { useState, useEffect } from 'react';
import {
  Image,
  StatusBar,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  NavigationContainer,
} from '@react-navigation/native';
import Login from '../login/Login'
const Stack = createStackNavigator();

const MainStackScreen = () => {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="#fff" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: false
        }}
        initialRouteName={'Login'}
      >
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainStackScreen;
