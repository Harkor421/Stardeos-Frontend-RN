import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';

function Comments({ navigation }) {
   
    

    const handleCloseModal = () => {
        navigation.goBack(); // Close the modal
    };

    return (
        <Screen style = {styles.container}>
            {/* Custom Header */}
            <View style={styles.header}>
                <AppText style={styles.headerText}>Comentarios</AppText>
                {/* Close Modal Button */}
                <TouchableOpacity onPress={handleCloseModal}>
                    <MaterialCommunityIcons name="close" size={25} color="white" />
                </TouchableOpacity>
            </View>

            {/* Body Content */}
            <View style={styles.body}>
                <AppText style={styles.bodyText}>Body content goes here...</AppText>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#1f233e',

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1f233e',
    },
    headerText: {
        fontSize: 15,
        fontWeight: 600,
        color: 'white', // Header text color
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.headerblue, // Body background color
    },
    bodyText: {
        color: 'white', // Body text color
    },
});

export default Comments;
