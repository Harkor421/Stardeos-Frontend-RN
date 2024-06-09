import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView, Modal, Text } from 'react-native';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import colors from '../config/colors';
import ChannelVideoList from './ChannelVideoList';
import useFormatViews from '../hooks/useFormatViews';
import useApi from '../hooks/useApi';
import streamsApi from '../api/streams';
import routes from '../components/navigation/routes';

function CreatorScreen({ navigation, route }) {
    const creator = route.params;

    // Function to handle null or invalid formatted views
    const handleFormattedViews = (views) => {
        return isNaN(views) || views === null || views === '' ? 0 : views;
    };

    const formattedFollowers = handleFormattedViews(useFormatViews(creator.channelId.subscriberCount));
    const formattedSubs = handleFormattedViews(useFormatViews(creator.channelId.user.subscriptionCount));
    const { data: stream, error, loading, request: loadStream } = useApi(() => streamsApi.getStreams(creator.channelId.user.username));
    const [modalVisible, setModalVisible] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);

    useEffect(() => {
        loadStream();
    }, []);

    const handleLivePress = () => {
        if (stream && !loading && stream.running) {
            navigation.push("StreamScreen", stream);
        } else {
            console.log("No live stream available");
        }
    };

    const handleBlockUser = () => {
        console.log('User blocked');
        setModalVisible(false);
        setMenuVisible(false);
        setIsBlocked(true);
    };

    const handleUnblockUser = () => {
        console.log('User unblocked');
        setIsBlocked(false);
    };

    const handleReportUser = () => {
        console.log('User reported');
        setMenuVisible(false);
    };

    return (
        <Screen style={{ backgroundColor: colors.primary }}>
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => setMenuVisible(true)}>
                        <Image source={require('../assets/dots-vertical.png')} style={styles.menuIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.creatorContainer}>
                    <Image style={styles.creatorAvatar} source={{ uri: creator.creator.avatar }} />
                    <View style={styles.creatorTitle}>
                        <Image style={styles.verifiedIcon} source={require('../assets/verified-icon.png')} />
                        <AppText style={styles.creatorName}>{creator.channelId.displayName}</AppText>
                    </View>
                    {stream && !loading && stream.running && (
                        <TouchableOpacity style={styles.livePanel} onPress={handleLivePress}>
                            <AppText style={styles.liveText}>{creator.channelId.user.username} está en vivo</AppText>
                        </TouchableOpacity>
                    )}
                    <View style={styles.statsContainer}>
                        <AppText style={styles.followers}>{formattedFollowers + " Seguidores "}</AppText>
                        <AppText style={styles.followers}>{"• "}</AppText>
                        <AppText style={styles.subscribers}>{formattedSubs + " Suscriptores"}</AppText>
                    </View>
                </View>
                {!isBlocked && (
                    <View style={{ flex: 1 }}>
                        <ChannelVideoList navigation={navigation} channelid={creator.channelId.id} />
                    </View>
                )}
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>¿Estás seguro de que quieres bloquear a este usuario? No podrás ver su contenido y sus comentarios</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.textStyle}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonBlock]}
                                onPress={handleBlockUser}
                            >
                                <Text style={styles.textStyle}>Bloquear</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={menuVisible && !modalVisible} // Ensure that the menu is visible only if the blocking modal is not active
                onRequestClose={() => setMenuVisible(false)}
            >
                <TouchableOpacity style={styles.menuOverlay} onPress={() => setMenuVisible(false)}>
                    <View style={styles.menuContainer}>
                        {isBlocked ? (
                            <TouchableOpacity style={styles.menuItem} onPress={handleUnblockUser}>
                                <Text style={styles.menuItemText}>Desbloquear Usuario</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.menuItem} onPress={() => setModalVisible(true)}>
                                <Text style={styles.menuItemText}>Bloquear Usuario</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </TouchableOpacity>
            </Modal>
        </Screen>
    );
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
    },
    menuIcon: {
        width: 24,
        height: 24,
        marginTop: 10,
    },
    creatorContainer: {
        alignItems: 'center',
        marginTop: 100,
    },
    creatorAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    creatorTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25,
        justifyContent: 'center',
    },
    creatorName: {
        color: colors.white,
        fontSize: 18,
        fontWeight: '900',
    },
    verifiedIcon: {
        width: 15,
        height: 15,
        marginRight: 15,
    },
    blockButton: {
        backgroundColor: '#ff0000',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
    },
    blockButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    livePanel: {
        backgroundColor: 'red',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    liveText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: colors.graybox,
        alignItems: 'center',
        borderRadius: 30,
        marginTop: 30,
        textAlign: 'center',
        paddingHorizontal: "10%",
        justifyContent: 'space-between',
        paddingVertical: 6,
        marginBottom: 60,
    },
    followers: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '700',
    },
    subscribers: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '700',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        margin: 5,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    buttonBlock: {
        backgroundColor: '#f44336',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    menuOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    menuContainer: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        marginTop: "40%",
        marginRight: "10%",
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    menuItem: {
        padding: 10,
    },
    menuItemText: {
        fontSize: 16,
        color: colors.white,
    },
});

export default CreatorScreen;
