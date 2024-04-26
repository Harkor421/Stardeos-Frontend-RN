import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useApi from '../hooks/useApi';
import client from '../api/client';
import CommentItem from '../components/CommentItem';


import colors from '../config/colors';

function Comments({ navigation, route }) {
    const comments = route.params;


    const handleCloseModal = () => {
        navigation.goBack(); // Close the modal
    };

    const renderComment = ({ item }) => (
        <CommentItem
          title={item.author.username}
          subTitle={item.content}
          avatar={item.author.avatar ? {uri: item.author.avatar} : require('../assets/default-avatar-icon.jpeg')} // Use default avatar if empty
          date={item.createdAt}
        />
      );
    
    return (
        <Screen style={styles.container}>
            {/* Custom Header */}
            <View style={styles.header}>
                <AppText style={styles.headerText}>Comentarios</AppText>
                {/* Close Modal Button */}
                <TouchableOpacity onPress={handleCloseModal}>
                    <MaterialCommunityIcons name="close" size={30} color="white" />
                </TouchableOpacity>
            </View>

            {/* Body Content */}
            <View style={styles.body}>
                    <FlatList
                        data={comments}
                        keyExtractor={(item) => item._id.toString()}
                        renderItem={renderComment}
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
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1f233e',
        padding: 15,
    },
    headerText: {
        fontSize: 16,
        fontWeight: 600,
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
    comment: {
        backgroundColor: colors.graybox,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    commentText: {
        color: 'white',
    },
    commentAuthor: {
        color: colors.secondary,
        marginTop: 5,
    },
});

export default Comments;
