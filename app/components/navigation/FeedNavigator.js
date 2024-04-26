import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import React from 'react'
import VideoList from "../../screens/VideoList";
import ListingDetailsScreen from "../../screens/ListingDetailsScreen";
import Comments from '../../screens/Comments'
const Stack = createStackNavigator();
import CreatorScreen from "../../screens/CreatorScreen";

const FeedNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Videos" component={VideoList} />
    <Stack.Screen
      name="VideoDetails"
      component={ListingDetailsScreen}
      options={{
        ...TransitionPresets.ScaleFromCenterAndroid,
      }}
    />
    <Stack.Screen
      name="CreatorDetails"
      component={CreatorScreen}
      options={{
        animationEnabled: false, // Disable animation for CreatorScreen
      }}
    />
    <Stack.Screen
      name="Comments"
      component={Comments}
      options={{
        presentation: 'modal',
      }}
    />
  </Stack.Navigator>
);

export default FeedNavigator;
