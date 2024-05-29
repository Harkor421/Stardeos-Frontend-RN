import React, { useContext } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';

import Screen from '../components/Screen';
import AuthContext from '../auth/context';
import AppText from '../components/AppText';
import GradientBorderButton from '../components/GradientBorderButton';
import BannerAdComponent from '../components/BannerAd';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppButton from '../components/AppButton';
import authStorage from '../auth/storage'
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
                    <GradientBorderButton title="Consigue Stardust" style={styles.button} onPress={() => {}} />
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
                    <AppButton title= "¿Necesitas ayuda?" style = {styles.closebutton}/>
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
  
    },
    centeredView: {
        alignItems: 'center',
        padding: 20,
    },
    closebutton:{
        marginTop: 30,
        backgroundColor: colors.headerblue,
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
        borderBottomColor: colors.lightgray,
        flexDirection: 'row',
    },
    sectionText: {
        color: colors.white,
        fontSize: 16,
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
