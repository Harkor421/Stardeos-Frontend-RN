import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from '../../config/colors';
import FeedNavigator from "./FeedNavigator";
import AccountScreen from "../../screens/AccountScreen";
import Header from './Header'; // Import the Header component

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveBackgroundColor: colors.headerblue,
      tabBarInactiveBackgroundColor: colors.headerblue,
      tabBarActiveTintColor: colors.white,
      tabBarStyle: {
        borderTopColor: colors.grayline,
        borderTopWidth: 0.8,
      },
      tabBarLabelStyle: {
        fontSize: 14,
        fontWeight: 'bold',
      },
    }}>
    <Tab.Screen
      name="Inicio"
      component={FeedNavigator}
      options={({ navigation }) => ({
        headerShown: true,
        header: () => <Header navigation={navigation} />, // Use the Header component
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      })}
    />
    <Tab.Screen
      name="Crear"
      component={FeedNavigator}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="plus-circle" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={AccountScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="clock" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
