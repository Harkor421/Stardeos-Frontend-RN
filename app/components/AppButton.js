// AppButton.js
import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import colors from '../config/colors';

function AppButton({ title, onPress, style }) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = {
    button: {
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: '90%',
        borderColor: "#3A4065",
        borderWidth: 1,
        flexDirection: 'row',
    },
    text: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10
    },

};

export default AppButton;
