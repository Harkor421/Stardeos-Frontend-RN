import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';

const SettingComponent = ({ title, text, logo }) => {
    return (
    <View style = {{width: "100%"}}>
       <Text style={{color: colors.white, marginLeft: "2%", marginBottom: "3%"}}>{title}</Text>
        <TouchableOpacity style={styles.touchable} onPress={() => console.log('Setting pressed')}>
            <View style={styles.settingBox}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{text}</Text>
                </View>
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logoImg} />
                </View>
            </View>
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    touchable: {
        width: '100%', // Ensure TouchableOpacity takes full width
    },
    settingBox: {
        flexDirection: 'row', // Horizontal layout
        alignItems: 'center', // Center items vertically
        justifyContent: 'space-between', // Space between text and logo
        backgroundColor: colors.graybox, // Light gray background
        borderRadius: 8, // Rounded corners
        padding: 15, // Padding inside the box
        marginBottom: 15, // Example margin for spacing between components
    },
    textContainer: {
        flex: 1, 
    },
    text: {
        color: colors.white,
        fontWeight: 'bold', // Updated to 'bold' for fontWeight
    },
    logoContainer: {
        marginLeft: 10, // Example margin for spacing
    },
    logoImg: {
        width: 25, // Example width for logo
        height: 25, // Example height for logo
        resizeMode: 'contain', // Scale the image while maintaining aspect ratio
    },
});

export default SettingComponent;
