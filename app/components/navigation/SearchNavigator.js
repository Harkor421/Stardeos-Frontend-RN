import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import React from 'react'
import VideoList from "../../screens/VideoList";
import ListingDetailsScreen from "../../screens/ListingDetailsScreen";
import Comments from '../../screens/Comments'
const Stack = createStackNavigator();
import CreatorScreen from "../../screens/CreatorScreen";
import SearchedVideoList from "../../screens/SearchedVideoList";

const SearchNavigator = ({ route }) => {
    const { search } = route.params;
  
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Videos">
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
