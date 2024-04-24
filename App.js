import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import navigationTheme from './app/components/navigation/navigationTheme';
import AppNavigator from './app/components/navigation/AppNavigator';
import colors from './app/config/colors'; // Import your colors configuration
import AuthNavigator from './app/components/navigation/AuthNavigator';
import { useState } from 'react';
import AuthContext from './app/auth/context';
import authStorage from './app/auth/storage';
import AppLoading from 'expo-app-loading';


export default function App() {

  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);
  
  const restoreToken = async () => {
    try {
      const userData = await authStorage.getToken();
      console.log('Retrieved user data:', userData); // Log retrieved data
      
      if (userData) {
        setUser(userData);
        console.log('User state set:', userData); // Log after setting user state
      }
    } catch (error) {
      console.error("Error restoring token:", error);
    }
  }

if (!isReady) return <AppLoading 
                        startAsync={restoreToken} 
                        onFinish={() => setIsReady(true)} 
                        onError={() => setIsLoadingError(true)} />  
    return (
        <AuthContext.Provider value = {{user, setUser}}>
        <NavigationContainer theme={navigationTheme}>
            <SafeAreaView style={styles.container}>
                {user ? <AppNavigator/> : <AuthNavigator/>}
            </SafeAreaView>
        </NavigationContainer>
      </AuthContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.headerblue, // Set your desired background color
    },
});
