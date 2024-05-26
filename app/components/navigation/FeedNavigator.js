import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import React from 'react';
import VideoList from "../../screens/VideoList";
import ListingDetailsScreen from "../../screens/ListingDetailsScreen";
import Comments from '../../screens/Comments';
import CreatorScreen from "../../screens/CreatorScreen";
import StreamScreen from "../../screens/StreamScreen";
import SearchedVideoList from "../../screens/SearchedVideoList";
import Description from "../../screens/Description";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Stack = createStackNavigator();

const FeedNavigator = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    const tabHiddenScreens = ['StreamScreen'];
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Videos';
    if (tabHiddenScreens.includes(routeName)) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: true, freezeOnBlur: true }}
    >
      <Stack.Screen name="Videos" component={VideoList} />
      <Stack.Screen name="SearchedVideos" component={SearchedVideoList} />
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
          ...TransitionPresets.ScaleFromCenterAndroid,
        }}
      />
      <Stack.Screen
        name="StreamScreen"
        component={StreamScreen}
        options={{
          ...TransitionPresets.ScaleFromCenterAndroid,
        }}
      />
      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="Description"
        component={Description}
        options={{
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

export default FeedNavigator;
