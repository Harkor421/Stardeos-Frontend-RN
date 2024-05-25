import React, { useContext } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';

import Screen from '../components/Screen';
import AuthContext from '../auth/context';
import AppText from '../components/AppText';
import GradientBorderButton from '../components/GradientBorderButton';
import BannerAdComponent from '../components/BannerAd';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';

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
                    <Image source={{ uri: user.data.user.avatar }} style={styles.avatar} />
                    <AppText style={styles.username}>{user.data.user.username}</AppText>
                    <View style={styles.stardusts}>
                        <Image source={require('../assets/stardust-icon.png')} style={styles.stardusticon} />
                        <AppText style={styles.stardustcount}>{user.data.user.stardusts}</AppText>
                    </View>
                    <GradientBorderButton title="Comprar Stardust" style ={{width: 300}} onPress={() => {}} />
                    <TouchableOpacity style={styles.section}>
                        <AppText style={styles.sectionText}>Starstudio</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.section}>
                        <AppText style={styles.sectionText}>Ajustes de usuario</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.section}>
                        <AppText style={styles.sectionText}>Suscripciones</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.section}>
                        <AppText style={styles.sectionText}>Método de pago</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.section}>
                        <AppText style={styles.sectionText}>Idioma</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.section}>
                        <AppText style={styles.sectionText}>Descarga tus datos</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.section}>
                        <AppText style={styles.sectionText}>Elimina tu cuenta</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.helpButton}>
                        <AppText style={styles.helpText}>¿Necesitas ayuda?</AppText>
                    </TouchableOpacity>
                    <BannerAdComponent style={styles.adCard} />
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
        alignItems: 'center',
        padding: 20,
    },
    centeredView: {
        alignItems: 'center',
        padding: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 20,
    },
    username: {
        fontSize: 24,
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
    section: {
        width: '100%',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightgray,
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
        marginTop: 20,
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
    },
});

export default AccountScreen;
