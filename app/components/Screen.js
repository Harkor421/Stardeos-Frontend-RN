import React from 'react';
import { SafeAreaView, StatusBar, Platform, StyleSheet, View } from 'react-native';

import colors from '../config/colors'

function Screen({children}) {
    return (
        <SafeAreaView style = {styles.screen}>
         <View style = {styles.container}>
            {children}
         </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    screen:{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: colors.primary
    },
    container:{
        paddingHorizontal: 10,
    }
})

export default Screen;