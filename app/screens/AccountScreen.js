import React, { useContext } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, ScrollView, Linking } from 'react-native';

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
import { useEffect } from 'react';

function AccountScreen({ navigation }) {
    const { user, setUser } = useContext(AuthContext);

    const handleLogOut = () => {
        setUser(null);
        authStorage.removeToken();
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
                    <GradientBorderButton title="Consigue Stardust" style={styles.button} onPress={() => Linking.openURL('https://stardeos.com/buy/buy-stardust')} />
                    <TouchableOpacity style={styles.section} onPress={() => Linking.openURL('https://stardeos.com/settings')}>
                        <MaterialCommunityIcons name="account" size={24} color="white" style={styles.icon}  />
                        <AppText style={styles.sectionText}>Ajustes de usuario</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.section} onPress={() => Linking.openURL('https://stardeos.com/settings')}>
                        <MaterialCommunityIcons name="card-account-details-star" size={24} color="white" style={styles.icon} />
                        <AppText style={styles.sectionText}>Suscripciones</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.section} onPress={() => Linking.openURL('https://stardeos.com/settings')}>
                        <MaterialCommunityIcons name="credit-card" size={24} color="white" style={styles.icon} />
                        <AppText style={styles.sectionText}>Método de pago</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.section} onPress={() => Linking.openURL('https://stardeos.com/settings')}>
                        <MaterialCommunityIcons name="translate" size={24} color="white" style={styles.icon} />
                        <AppText style={styles.sectionText}>Idioma</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.section} onPress={() => Linking.openURL('https://stardeos.com/settings')}>
                        <MaterialCommunityIcons name="download" size={24} color="white" style={styles.icon} />
                        <AppText style={styles.sectionText} onPress={() => Linking.openURL('https://stardeos.com/settings')}>Descarga tus datos</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.section} onPress={() => Linking.openURL('https://stardeos.com/settings')}>
                        <MaterialCommunityIcons name="delete" size={24} color="white" style={styles.icon} />
                        <AppText style={styles.sectionText} >Elimina tu cuenta</AppText>
                    </TouchableOpacity>
                    <AppButton title="¿Necesitas ayuda?" style={styles.helpButton} onPress={() => Linking.openURL('https://discord.com/invite/JXYpqU5qgw')} />
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
});

export default AccountScreen;
