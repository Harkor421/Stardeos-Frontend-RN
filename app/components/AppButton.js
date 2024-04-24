// AppButton.js
import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import colors from '../config/colors';

function AppButton({ title, onPress, style }) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
            <Image source={require('../assets/arrow.png')} style={styles.arrow} />
        </TouchableOpacity>
    );
}

const styles = {
    button: {
        backgroundColor: colors.black,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: '100%',
        borderColor: colors.neonpink,
        borderWidth: 1,
        flexDirection: 'row'
    },
    text: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10
    },
    arrow: {
        height: 20,
        width: 20,
    }
};

export default AppButton;
