import React, { useEffect, useState, useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Button, ScrollView } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useApi from '../hooks/useApi';
import videosApi from '../api/videos';
import CommentItem from '../components/CommentItem';
import colors from '../config/colors';
import AuthContext from '../auth/context';
import CustomTextInput from '../components/CustomTextInput'; // Import the custom component
import { TextInput } from 'react-native-gesture-handler';
import AppButton from '../components/AppButton';
import GradientBorderButton from '../components/GradientBorderButton';
import DonateModal from '../components/DonateModal';

const createCommentSchema = Yup.object().shape({
  body: Yup.string().required('Comment is required'),
  amount: Yup.number().min(0, 'Amount cannot be negative'),
});

function Comments({ route, navigation }) {
    const { user } = useContext(AuthContext);
    console.log(user);
    const { videoId} = route.params;
    const [refresh, setRefresh] = useState(false);
    const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
    const [stardust, setStardust] = useState(0);

    const { data: videoComments, loading: commentsLoading, request: loadComments } = useApi(() => videosApi.getComments(videoId), [videoId]);

    useEffect(() => {
        loadComments();
    }, [videoId, refresh]);

    const handleCloseModal = () => {
        navigation.goBack();
    };

    const handleModalOpen = () => {
        setModalVisible(true);
      };
    
      const handleModalClose = () => {
        setModalVisible(false);
      };

      const updateStardust = (newStardust) => {
        setStardust(newStardust);
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
        
                if (!response.error) {
                    await loadComments();
                } else {
                    console.error(response.message);
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
                <ScrollView>
                    <View style={styles.inputContainer}>
                        <View style={styles.textInputContainer}>
                            <CustomTextInput
                                icon={{ uri: user.data.user.avatar }}
                                placeholder="Add a comment"
                                value={formik.values.body}
                                onChangeText={formik.handleChange('body')}
                                onBlur={formik.handleBlur('body')}
                                multiline
                                numberOfLines={4}
                                style={styles.customTextInput}
                                onPress={handleModalOpen}
                                stardustamount={stardust}
                            />
                        </View>
                        {(formik.touched.body && formik.errors.body) || (formik.touched.amount && formik.errors.amount) ? (
                            <AppText style={styles.errorText}>{formik.errors.body || formik.errors.amount}</AppText>
                        ) : null}
                        <GradientBorderButton  style= {{width: "100%"}}title="Enviar" onPress={formik.handleSubmit} />
                    </View>
                    {commentsLoading ? (
                        <ActivityIndicator size="large" color={colors.white} />
                    ) : (
                        <FlatList
                            scrollEnabled={false}
                            data={videoComments.comments}
                            keyExtractor={(item) => item._id.toString()}
                            renderItem={renderComment}
                            contentContainerStyle={styles.commentsContainer}
                        />
                    )}
                   <DonateModal modalVisible={modalVisible} onRequestClose={handleModalClose} stardustaccount={user.data.user.stardusts} handleStardustUpdate={updateStardust} />

                </ScrollView>
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
        marginBottom: 10,
    },
    customTextInput: {
        flex: 1,
        marginRight: 10,
    },
    stardustInput: {
        width: '20%',
        marginLeft: 5,
        height: 40,
        borderColor: colors.lightgray,
        borderWidth: 1,
        paddingLeft: 10,
        color: colors.white,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default Comments;
