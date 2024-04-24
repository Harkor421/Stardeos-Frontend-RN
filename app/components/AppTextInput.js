import React from 'react';
import { TextInput, View, StyleSheet, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import colors from '../config/colors';
import defaultStyles from '../config/styles'
function AppTextInput({ icon, ...otherProps }) {
    return (
        <View style={styles.container}>
            <TextInput style={styles.textInput} {...otherProps} />
            {icon && <AntDesign name={icon} size={20} color={colors.white} style={styles.icon} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.darkblue,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: 'center',  // Align items in the center
        justifyContent: 'space-between',  // Space between items
        width: '92%',
        padding: 18,
        marginVertical: 10,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: colors.borderblue,
    },
    textInput: {
        flex: 1,  // Take up remaining space
        color: colors.white,
    },
    icon: {
        marginLeft: 10,
    }
});

export default AppTextInput;
