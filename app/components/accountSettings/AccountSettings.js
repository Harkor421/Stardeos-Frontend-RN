import React, { useContext } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, ScrollView, Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AuthContext from '../../auth/context';
import AppText from '../AppText';
import AppButton from '../AppButton';
import colors from '../../config/colors';
import authStorage from '../../auth/storage';
import SettingComponent from './SettingComponent';
import { useState } from 'react';
import UploadAvatar from './UploadAvatar';

function AccountSettings({ navigation }) {
    const { user, setUser } = useContext(AuthContext);

    const [uploadModalVisible, setUploadModalVisible] = useState(false);

    const handleAvatarUpload = (imageUri) => {
        // Logic to handle avatar upload
        console.log('Avatar uploaded:', imageUri);
        // Implement your logic to save the avatar URI or perform other actions
        setUploadModalVisible(false); // Close the modal after upload
    };

    const openLink = async (url) => {
        await WebBrowser.openBrowserAsync(url);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AppText style={styles.headerText}>Ajustes de Usuario</AppText>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="close" size={30} color="white" />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.centeredView}>
                    <View style={styles.avatarContainer}>
                    <Image source={user.data.user.avatar ? { uri: user.data.user.avatar } : require('../../assets/default-avatar-icon.jpeg')} style={styles.avatar} />
                    <TouchableOpacity onPress={() => navigation.navigate('UploadAvatar')}>
                        <MaterialCommunityIcons name="pencil" size={24} color={colors.white} style={styles.editIcon} />
                    </TouchableOpacity>
                    </View>
                    <AppText style={styles.username}>{user.data.user.username}</AppText>
                    <SettingComponent
                        title="Nombre"
                        text={user.data.user.fullName}
                        logo={require("../../assets/user.png")}
                    />
                    <SettingComponent
                        title="Usuario"
                        text={user.data.user.username}
                        logo={require("../../assets/at-symbol.png")}
                    />
                    <SettingComponent
                        title="Fecha de Nacimiento"
                        text={user.data.user.dob}
                        logo={require("../../assets/calendar.png")}
                    />
                    <SettingComponent
                        title="Correo Electrónico"
                        text={user.data.user.email}
                        logo={require("../../assets/mail.png")}
                    />
                    <SettingComponent
                        title="Contraseña"
                        text="••••••••••••"
                        logo={require("../../assets/lock-closed.png")}
                    />
                    <AppButton title="¿Necesitas ayuda?" style={styles.helpButton} onPress={() => openLink('https://discord.com/invite/JXYpqU5qgw')} />
                </View>
            </ScrollView>
        </View>
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
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 18,
        marginTop: 20,
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: colors.darkgray,
        padding: 5,
        borderRadius: 12,
    },
    username: {
        fontSize: 18,
        color: colors.white,
        marginTop: 10,
        fontWeight: 'bold',
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
});

export default AccountSettings;
