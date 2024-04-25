import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import navigationTheme from './app/components/navigation/navigationTheme';
import AppNavigator from './app/components/navigation/AppNavigator';
import AuthNavigator from './app/components/navigation/AuthNavigator';
import AuthContext from './app/auth/context';
import authStorage from './app/auth/storage';
import colors from './app/config/colors';
import ActivityIndicator from './app/components/ActivityIndicator'; // Update the import path

export default function App() {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);

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
    <AuthContext.Provider value={{ user, setUser }}>
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
