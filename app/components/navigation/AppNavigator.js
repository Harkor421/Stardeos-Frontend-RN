import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, Text } from 'react-native';

import colors from '../../config/colors';
import FeedNavigator from "./FeedNavigator";
import AccountScreen from "../../screens/AccountScreen";
import Header from './Header'; // Import the Header component
import ComingSoon from '../../screens/ComingSoon';
import NotificationScreen from '../../screens/NotificationScreen';
import StardustScreen from '../../screens/StardustScreen';
import RecentNavigator from './RecentNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: colors.headerblue,
        tabBarInactiveBackgroundColor: colors.headerblue,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.white,
        tabBarStyle: {
          borderTopColor: colors.grayline,
          borderTopWidth: 0.8,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={FeedNavigator}
        initialParams={{ search: '' }}
        options={({ navigation }) => ({
          headerShown: true,
          header: () => <Header navigation={navigation} />, // Use the Header component
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="home"
              color={colors.white}
              size={focused ? size * 1.1 : size * 0.9} // Adjust the size based on focus
              style={{ fontWeight: focused ? 'bold' : 'normal' }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 14, fontWeight: focused ? 'bold' : 'normal', color: colors.white }}>
              Inicio
            </Text>
          ),
        })}
      />
      <Tab.Screen
        name="Crear"
        component={ComingSoon}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/plus-circle.png")}
              style={{
                width: focused ? 30 : 24, // Adjust the width based on focus
                height: focused ? 30 : 24, // Adjust the height based on focus
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 14, fontWeight: focused ? 'bold' : 'normal', color: colors.white }}>
              Crear
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Recientes"
        component={RecentNavigator}
        initialParams={{ search: '' }}
        options={({ navigation }) => ({
          headerShown: true,
          header: () => <Header navigation={navigation} />, // Use the Header component
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="clock"
              color={colors.white}
              size={focused ? size * 1.1 : size * 0.9} // Adjust the size based on focus
              style={{ fontWeight: focused ? 'bold' : 'normal' }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 14, fontWeight: focused ? 'bold' : 'normal', color: colors.white }}>
              Recientes
            </Text>
          ),
        })}
      />
      <Tab.Screen name="Account" component={AccountScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
          tabBarVisible: false // hide tab bar on this screen
        }}
      />
      <Tab.Screen name="Notifications" component={NotificationScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
          tabBarVisible: false // hide tab bar on this screen
        }}
      />
      <Tab.Screen name="Stardust" component={StardustScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
          tabBarVisible: false // hide tab bar on this screen
        }}
      />
      <Tab.Screen
        name="RecentVideoList"
        component={FeedNavigator}
        options={({ navigation }) => ({
          tabBarButton: () => null,
          headerShown: true,
          tabBarVisible: false,
          header: () => <Header navigation={navigation} /> // Use the Header component
        })}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;
