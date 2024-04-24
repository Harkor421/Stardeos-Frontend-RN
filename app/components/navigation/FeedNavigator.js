import { createStackNavigator } from "@react-navigation/stack";
import React from 'react'
import VideoList from "../../screens/VideoList";
import ListingDetailsScreen from "../../screens/ListingDetailsScreen";
import Comments from '../../screens/Comments'
const Stack = createStackNavigator();

import colors from '../../config/colors'

const FeedNavigator = () => (
<Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name = "Videos" component={VideoList}/>
    <Stack.Screen name = "VideoDetails" component={ListingDetailsScreen}/>
    <Stack.Screen name = "Comments" component={Comments}/>
</Stack.Navigator>
);

export default FeedNavigator;