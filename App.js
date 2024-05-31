import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import navigationTheme from './app/components/navigation/navigationTheme';
import AppNavigator from './app/components/navigation/AppNavigator';
import AuthNavigator from './app/components/navigation/AuthNavigator';
import AuthContext from './app/auth/context';
import authStorage from './app/auth/storage';
import colors from './app/config/colors';
import ActivityIndicator from './app/components/ActivityIndicator'; // Update the import path
import * as Notifications from 'expo-notifications';
import authApi from './app/api/auth';
import useApi from './app/hooks/useApi';
import { Audio } from 'expo-av';

export default function App() {
  if (Platform.OS === "ios")
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);

  const { data: userdata, loading: userloading, request: loadUser } = useApi(() => authApi.getCurrentUser());


  useEffect(() => {
    const restoreToken = async () => {
      try {
        const userData = await authStorage.getToken();
        console.log('Retrieved user data:', userData);

        if (userData) {
          setUser(userData);
          console.log('User state set:', userData);
        }
      } catch (error) {
        console.error("Error restoring token:", error);
        setIsLoadingError(true);
      } finally {
        setIsReady(true);
      }
    };

    restoreToken();
  }, []);

  const updateUser = async () => {
    try {
      console.log("EXECUTED========")
      await loadUser();
  
      // Extract updated user data from userdata
  
      // Update user state with updated user information
      if (userdata) {
        setUser(prevUser => ({
          ...prevUser,
          data: {
            ...prevUser.data,
            user: {
              ...prevUser.data.user,
              ...userdata
            }
          }
        }));
        console.log("NEW USER: ", user);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  
  
  
  
  

  if (!isReady) {
    return <ActivityIndicator visible={true} />;
  }

  if (isLoadingError) {
    // Handle error state, e.g., display an error message
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text>Error loading data</Text>
      </SafeAreaView>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser, updateUser }}>
      <NavigationContainer theme={navigationTheme}>
        <SafeAreaView style={styles.container}>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </SafeAreaView>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.headerblue,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
