import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SecondScreen from '../screens/SecondScreen';
import MainTabs from './MainTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import First from '../screens/onboarding/First';
import Second from '../screens/onboarding/Second';
import AdScreen from '../screens/AdSceen';

const MainStack = createNativeStackNavigator();
const Main = () => {
  const [isOnBoardingCompleted, setIsOnBoardingCompleted] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('isOnBoardingCompleted');
        setIsOnBoardingCompleted(value === 'true' ? true : false);
      } catch (error) {
        console.log('Error retrieving data');
      }
    };

    getData();
  }, []);

  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isOnBoardingCompleted && (
        <MainStack.Screen name='First' component={First} />
      )}
      {isOnBoardingCompleted && (
        <MainStack.Screen name='Second' component={Second} />
      )}
      <MainStack.Screen name='MainTabs' component={MainTabs} />
      <MainStack.Screen name='SecondScreen' component={SecondScreen} />
      <MainStack.Screen name='AdScreen' component={AdScreen} />
    </MainStack.Navigator>
  );
};

export default Main;
