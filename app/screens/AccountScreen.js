import React, { useContext } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, ScrollView, Linking, Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import Screen from '../components/Screen';
import AuthContext from '../auth/context';
import AppText from '../components/AppText';
import GradientBorderButton from '../components/GradientBorderButton';
import BannerAdComponent from '../components/BannerAd';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppButton from '../components/AppButton';
import authStorage from '../auth/storage'
import colors from '../config/colors';
import auth from '../api/auth';
import useApi from '../hooks/useApi';
import { useEffect, useState } from 'react';
import { Modal } from 'react-native';
function AccountScreen({ navigation }) {
    const { user, setUser } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);

    const handleDeleteAccount = () => {
        // Logic to delete the account
        console.log('Account deleted');
        setUser(null);
        authStorage.removeToken();
        setModalVisible(false);
        // Redirect to settings or another appropriate action
    };
    const handleLogOut = () => {
        setUser(null);
        authStorage.removeToken();
    };

    const openLink = async (url) => {
        await WebBrowser.openBrowserAsync(url);
    };

    return (
        <Screen style={styles.container}>
            <View style={styles.header}>
                <AppText style={styles.headerText}>Perfil de Usuario</AppText>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="close" size={30} color="white" />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.centeredView}>
                    <Image source={user.data.user.avatar ? { uri: user.data.user.avatar } : require('../assets/default-avatar-icon.jpeg')} style={styles.avatar} />
                    <AppText style={styles.username}>{user.data.user.username}</AppText>
                    <View style={styles.stardusts}>
                        <Image source={require('../assets/stardust-icon.png')} style={styles.stardusticon} />
                        <AppText style={styles.stardustcount}>{user.data.user.stardusts ? user.data.user.stardusts : 0}</AppText>
                    </View>
                    <BannerAdComponent style={styles.adCard} />
                    {/*
                    <TouchableOpacity style={styles.section} onPress={() => openLink('https://stardeos.com/settings')}>
                        <MaterialCommunityIcons name="account" size={24} color="white" style={styles.icon}  />
                        <AppText style={styles.sectionText}>Ajustes de usuario</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.section} onPress={() => openLink('https://stardeos.com/settings')}>
                        <MaterialCommunityIcons name="card-account-details-star" size={24} color="white" style={styles.icon} />
                        <AppText style={styles.sectionText}>Suscripciones</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.section} onPress={() => openLink('https://stardeos.com/settings')}>
                        <MaterialCommunityIcons name="credit-card" size={24} color="white" style={styles.icon} />
                        <AppText style={styles.sectionText}>Método de pago</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.section} onPress={() => openLink('https://stardeos.com/settings')}>
                        <MaterialCommunityIcons name="translate" size={24} color="white" style={styles.icon} />
                        <AppText style={styles.sectionText}>Idioma</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.section} onPress={() => openLink('https://stardeos.com/settings')}>
                        <MaterialCommunityIcons name="download" size={24} color="white" style={styles.icon} />
                        <AppText style={styles.sectionText} onPress={() => openLink('https://stardeos.com/settings')}>Descarga tus datos</AppText>
                    </TouchableOpacity>
                    */}
                    <TouchableOpacity style={styles.section} onPress={() => setModalVisible(true)}>
                <MaterialCommunityIcons name="delete" size={24} color="white" style={styles.icon} />
                <AppText style={styles.sectionText}>Elimina tu cuenta</AppText>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>¿Estás seguro de que quieres eliminar tu cuenta? Todos tus datos serán borrados permanentemente.</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.textStyle}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonDelete]}
                                onPress={handleDeleteAccount}
                            >
                                <Text style={styles.textStyle}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
                    <AppButton title="¿Necesitas ayuda?" style={styles.helpButton} onPress={() => openLink('https://discord.com/invite/JXYpqU5qgw')} />
                    <GradientBorderButton title="Cerrar Sesión" onPress={handleLogOut} style={styles.logoutButton} />
                </View>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f233e',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#1f233e',
    },
    headerText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.white,
    },
    scrollView: {
    },
    centeredView: {
        alignItems: 'center',
        padding: 20,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginTop: 20,
    },
    username: {
        fontSize: 18,
        color: colors.white,
        marginTop: 10,
        fontWeight: 'bold',
    },
    stardusts: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    stardusticon: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
    stardustcount: {
        color: colors.white,
        fontWeight: 'bold',
    },
    button: {
        width: 300,
        marginBottom: 20,
    },
    section: {
        width: '100%',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightgray,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
    },
    sectionText: {
        color: colors.white,
        fontSize: 16,
    },
    helpButton: {
        width: '100%',
        padding: 15,
        alignItems: 'center',
        backgroundColor: colors.darkgray,
        borderRadius: 10,
        marginTop: 40,
        marginBottom: 20,
    },
    helpText: {
        color: colors.white,
        fontSize: 16,
    },
    adCard: {
        marginBottom: 20,
    },
    logoutButton: {
        marginTop: 20,
        width: 350,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
        margin: 10,
    },
    icon: {
        marginRight: 10,
    },
    sectionText: {
        color: 'white',
        fontSize: 16,
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
    buttonDelete: {
        backgroundColor: '#f44336',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default AccountScreen;
