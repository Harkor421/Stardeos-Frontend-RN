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
    const video = route.params;

    const [comments, setComments] = useState([]);
    const { data, error, loading, request: loadComments } = useApi(() => client.get(`/comments/${video.id}?page=1`));

    useEffect(() => {
        loadComments();
    }, []);

    useEffect(() => {
        if (data) {
            setComments(data.comments);
            console.log(data);
        }
    }, [data]);

    const handleCloseModal = () => {
        navigation.goBack(); // Close the modal
    };

    const renderComment = ({ item }) => (
        <CommentItem
            title={item.author.username}
            subTitle={item.content}
            avatar={item.author.avatar} // Assuming you have an avatar field in the author object
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
                {loading ? (
                    <AppText>Loading...</AppText>
                ) : error ? (
                    <AppText>Error loading comments</AppText>
                ) : (
                    <FlatList
                        data={comments}
                        keyExtractor={(item) => item._id.toString()}
                        renderItem={renderComment}
                        contentContainerStyle={styles.commentsContainer}
                    />
                )}
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
    },
    headerText: {
        fontSize: 18,
        fontWeight: 800,
        color: colors.white
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
