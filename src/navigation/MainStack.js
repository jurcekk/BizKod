import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SecondScreen from "../screens/SecondScreen";
import MainTabs from "./MainTabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import First from "../screens/onboarding/First";
import Second from "../screens/onboarding/Second";
import AdScreen from "../screens/AdSceen";
//Add new ad
const MainStack = createNativeStackNavigator();
const Main = () => {


 

  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="SecondScreen" component={SecondScreen} />
      <MainStack.Screen name="AdScreen" component={AdScreen} />
      <MainStack.Screen name="First" component={First} />
      <MainStack.Screen name="Second" component={Second} />
    </MainStack.Navigator>
  );
};

export default Main;
