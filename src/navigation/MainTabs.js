import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { themeColor, useTheme } from 'react-native-rapi-ui';
import TabBarIcon from '../components/utils/TabBarIcon';
import TabBarText from '../components/utils/TabBarText';

import About from '../screens/About';
import Profile from '../screens/Profile';
import Home from '../screens/Home';

const Tabs = createBottomTabNavigator();
const MainTabs = () => {
  const { isDarkmode } = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: isDarkmode ? themeColor.dark100 : '#c0c0c0',
          backgroundColor: isDarkmode ? themeColor.dark200 : '#ffffff',
        },
      }}
    >
      {/* these icons using Ionicons */}
      <Tabs.Screen
        name='Home'
        component={Home}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title='Home' />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={'home'} />
          ),
        }}
      />

      {/* <Tabs.Screen
        name='About'
        component={About}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title='About' />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={'information'} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title='Profile' />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={'person'} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default MainTabs;
