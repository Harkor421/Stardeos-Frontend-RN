import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import React from 'react';
import SearchedVideoList from "../../screens/SearchedVideoList";
import ListingDetailsScreen from "../../screens/ListingDetailsScreen";
import Comments from '../../screens/Comments';
import CreatorScreen from "../../screens/CreatorScreen";
import StreamScreen from "../../screens/StreamScreen";

const Stack = createStackNavigator();

const SearchNavigator = ({ route }) => {
  const { search } = route.params;

  return (
    <Stack.Navigator
      key={search}  // Add key based on search parameter
      screenOptions={{ headerShown: false, gestureEnabled: true, freezeOnBlur: true }}
    >
      <Stack.Screen name="SearchedVideoList">
        {(props) => <SearchedVideoList {...props} search={search} />}
      </Stack.Screen>
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
    </Stack.Navigator>
  );
};

export default SearchNavigator;
