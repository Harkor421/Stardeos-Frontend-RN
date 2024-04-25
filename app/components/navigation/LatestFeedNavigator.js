import { createStackNavigator } from "@react-navigation/stack";
import React from 'react'
import VideoList from "../../screens/VideoList";
import ListingDetailsScreen from "../../screens/ListingDetailsScreen";
import Comments from '../../screens/Comments'
const Stack = createStackNavigator();
import LatestVideoList from "../../screens/LatestVideoList";

import colors from '../../config/colors'

const LatestFeedNavigator = () => (
<Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name = "Videos" component={LatestVideoList}/>
    <Stack.Screen name = "VideoDetails" component={ListingDetailsScreen}/>
    <Stack.Screen 
      name="Comments" 
      component={Comments} 
      options={{
        presentation: 'modal', // Show Comments screen as a modal
      }}
    />
</Stack.Navigator>
);

export default LatestFeedNavigator;