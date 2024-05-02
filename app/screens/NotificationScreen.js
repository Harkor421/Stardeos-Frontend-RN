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

function NotificationScreen({ navigation, route }) {
    const notifications = route.params;

    const renderNotification = ({ item }) => {
        switch (item.type) {
          case 'VIDEO':
            return (
              <TouchableOpacity>
                <CommentItem
                  title={item.title}
                  subTitle={item.channelName + " ha subido un video"}
                  date={item.createdAt}
                  avatar={{ uri: item.img }}
                />
              </TouchableOpacity>
            );
          case 'REPLY':
            return (
              <CommentItem
                title={item.title}
                subTitle={item.channelName + " ha respondido a tu comentario!"}
                date={item.createdAt}
                avatar={{ uri: item.img }}
              />
            );
          case 'STARDUST':
            return (
              <CommentItem
                title={item.title}
                subTitle={`Te ha donado ${item.amount} stardusts!`}
                date={item.createdAt}
                avatar={{ uri: item.img }}
              />
            );
          default:
            return null;
        }
      };

    return (
        <Screen style={styles.container}>
            {/* Custom Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color={colors.white} />
                </TouchableOpacity>
                <AppText style={styles.headerText}>Notificaciones</AppText>
            </View>
            {/* Body Content */}
            <View style={styles.body}>
                    <FlatList
                        data={notifications.notifications}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderNotification}
                        contentContainerStyle={styles.commentsContainer}
                    />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1f233e',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1f233e',
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
        backgroundColor: colors.headerblue,
    },
    commentsContainer: {
        padding: 10,
    },
});

export default NotificationScreen;
