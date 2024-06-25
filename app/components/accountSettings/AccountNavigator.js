import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';
import AccountScreen from "./AccountScreen";
import AccountSettings from "./AccountSettings";
import UploadAvatarScreen from "./UploadAvatar";
import AccountConnections from "./AccountConnections";

const Stack = createStackNavigator();

const AccountNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: true, freezeOnBlur: true }}
    >
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
      <Stack.Screen name="AccountSettings" component={AccountSettings} />
      <Stack.Screen name="UploadAvatar" component={UploadAvatarScreen} />
      <Stack.Screen name="AccountConnections" component={AccountConnections} />

    </Stack.Navigator>
  );
};

export default AccountNavigator;
