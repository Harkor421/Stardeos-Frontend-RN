import React from 'react';
import { View, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import { ScrollView } from 'react-native-gesture-handler';

function Description({ navigation, route }) {
    const content  = route.params;

    const handleToggleDescription = () => {
        navigation.goBack(); // Close the modal
    };

    // Function to open a link
    const handleLinkPress = (url) => {
        Linking.openURL(url);
    };

    // Function to parse the description content and make links clickable
    const parseDescription = (description) => {
        // Regex pattern to identify URLs
        const urlPattern = /(https?:\/\/[^\s]+)/g;
        // Split the description text by URLs
        const parts = description.split(urlPattern);
        return parts.map((part, index) => {
            if (part.match(urlPattern)) {
                // If the part is a URL, render it as a clickable link
                return (
                    <TouchableOpacity key={index} onPress={() => handleLinkPress(part)}>
                        <AppText style={styles.link}>{part}</AppText>
                    </TouchableOpacity>
                );
            } else {
                // Otherwise, render the normal text
                return <AppText key={index} style={styles.description}>{part}</AppText>;
            }
        });
    };

    return (
        <Screen style={styles.container}>
            <ScrollView>
            {/* Custom Header */}
            <View style={styles.header}>
                <AppText style={styles.headerText}>Descripción</AppText>
                {/* Down Arrow */}
                <TouchableOpacity onPress={handleToggleDescription}>
                    <MaterialCommunityIcons name="chevron-down" size={30} color="white" />
                </TouchableOpacity>
            </View>
            {/* Body Content */}
            <View style={styles.body}>
                <View style={styles.descriptionContainer}>
                    {/* Render the parsed description content */}
                    {parseDescription(content)}
                </View>
            </View>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.headerblue,
        padding: 15,
    },
    headerText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.white,
        marginLeft: 20,
    },
    body: {
        flex: 1,
    },
    descriptionContainer: {
        borderRadius: 10,
        padding: 15,
        margin: 15,
        color: colors.secondary,
    },
    description: {
        color: colors.white,
        fontSize: 16,
    },
    link: {
        color: colors.bluelink, // Define the color for links
        textDecorationLine: 'underline', // Add underline for links
    },
});

export default Description;
