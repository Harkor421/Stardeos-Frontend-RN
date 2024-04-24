import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import colors from '../config/colors'

function WelcomeScreen(props) {
    return (
        <View style ={styles.background}>
            <Image 
            style= {styles.logo} 
            source = {require("../assets/stardeos-logo.png")}/>
            <Image 
            style= {styles.letters} 
            source = {require("../assets/stardeos-letters.png")}/>
        </View>
    );
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor:colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    logo: {
        height: "15%",
        width: 110,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: "50%"
    },

    letters: {
        height: "10%",
        width: "80%",
        resizeMode: 'contain',
        position: 'absolute',
        bottom: "41%"
    }
})

export default WelcomeScreen;