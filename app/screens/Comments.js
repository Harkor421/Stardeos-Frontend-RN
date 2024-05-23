import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Button } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useApi from '../hooks/useApi';
import videosApi from '../api/videos';
import CommentItem from '../components/CommentItem';
import colors from '../config/colors';
import AppTextInput from '../components/AppTextInput';

const createCommentSchema = Yup.object().shape({
  body: Yup.string().required('Comment is required'),
  amount: Yup.number().min(0, 'Amount cannot be negative'),
});

function Comments({ route, navigation }) {
    const { comments, videoId, setStardust } = route.params;
    const [newComment, setNewComment] = useState('');
    const { data: videoComments, loading: commentsLoading, request: loadComments } = useApi(() => videosApi.getComments(videoId), [videoId]);

    useEffect(() => {
        loadComments();
    }, [videoId]);

    const handleCloseModal = () => {
        navigation.goBack();
    };

    const formik = useFormik({
        initialValues: {
            body: '',
            amount: 0,
        },
        validationSchema: createCommentSchema,
        onSubmit: async ({ body, amount }) => {
            try {
                if (amount > 0 && !body) {
                    body = "¡He enviado stardust! <3";
                }

                const parsedBody = {
                    type: 1,
                    content: body,
                    parent: videoId,
                    stardusts: parseInt(amount) ?? null,
                };

                const response = await videosApi.createComment(parsedBody);
                console.log("Comment submit response:", response);

                if (response.status === 201) {
                    commentsDispatch({
                        type: "ADD_COMMENT",
                        payload: { body: response.data },
                    });
                    if (amount > 0) {
                        setStardust((prevStardust) => prevStardust + amount);
                    }
                } else {
                    console.error("Comment not sent");
                }
            } catch (error) {
                console.error("Error creating comment:", error);
            } finally {
                formik.resetForm();
            }
        },
    });

    const renderComment = ({ item }) => (
        <CommentItem
            title={item.author.username}
            subTitle={item.content}
            avatar={item.author.avatar ? { uri: item.author.avatar } : require('../assets/default-avatar-icon.jpeg')}
            date={item.createdAt}
            stardustamount={item.stardusts}
        />
    );

    return (
        <Screen style={styles.container}>
            <View style={styles.header}>
                <AppText style={styles.headerText}>Comentarios</AppText>
                <TouchableOpacity onPress={handleCloseModal}>
                    <MaterialCommunityIcons name="close" size={30} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <View style={styles.inputContainer}>
                    <View style={styles.textInputContainer}>
                        <AppTextInput
                            icon="comment"
                            placeholder="Add a comment"
                            placeholderTextColor={colors.medium}
                            value={formik.values.body}
                            onChangeText={formik.handleChange('body')}
                            onBlur={formik.handleBlur('body')}
                            style={{ flex: 1, marginRight: 10 }} // Adjusted styles
                        />
                        <AppTextInput
                            icon="stardust"
                            placeholder="Stardust"
                            placeholderTextColor={colors.medium}
                            value={formik.values.amount.toString()}
                            onChangeText={formik.handleChange('amount')}
                            onBlur={formik.handleBlur('amount')}
                            keyboardType="numeric"
                            style={{ width: '30%', marginLeft: 5 }} // Adjusted styles with paddingLeft
                        />
                    </View>
                    {(formik.touched.body && formik.errors.body) || (formik.touched.amount && formik.errors.amount) ? (
                        <AppText style={styles.errorText}>{formik.errors.body || formik.errors.amount}</AppText>
                    ) : null}
                    <Button title="Submit" onPress={formik.handleSubmit} />
                </View>
                {commentsLoading ? (
                    <ActivityIndicator size="large" color={colors.white} />
                ) : (
                    <FlatList
                        data={videoComments.comments}
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
        flex: 1,
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
    inputContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
    },
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10, // Added margin bottom for spacing
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    stardustInput: {
        width: '30%',
        paddingLeft: 5,
        marginRight: 10, // Added margin to the right
    },
});


export default Comments;
