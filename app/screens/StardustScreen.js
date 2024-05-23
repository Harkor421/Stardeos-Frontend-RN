import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useApi from '../hooks/useApi';
import client from '../api/client';
import CommentItem from '../components/CommentItem';
import notificationsApi from '../api/notifications';
import colors from '../config/colors';
import Card from '../components/Card';
import routes from '../components/navigation/routes';

function StardustScreen({ navigation, route }) {
    const notifications = route.params;

    return (
        <Screen style={styles.container}>
           <AppText>{"Actualmente tienes:"}</AppText>
           <Image style={styles.verifiedicon} source={require('../assets/verified-icon.png')} />

        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1f233e',
    },
    headerText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.white,
        marginLeft: 20,
    },
    body: {
        flex: 1,
        backgroundColor: colors.headerblue,
    },
    commentsContainer: {
        padding: 10,
    },
});

export default StardustScreen;
