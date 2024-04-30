import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';
import SearchedVideoList from "../../screens/SearchedVideoList";

const Stack = createStackNavigator();

const SearchNavigator = ({ route }) => {
  const { search } = route.params;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SearchedVideoList">
        {(props) => <SearchedVideoList {...props} search={search} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default SearchNavigator;
