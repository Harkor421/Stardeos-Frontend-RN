import React, { useContext } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import Screen from '../components/Screen';
import AuthContext from '../auth/context';
import AppText from '../components/AppText';

import colors from '../config/colors'
import AppButton from '../components/AppButton';
import authStorage from '../auth/storage';
import BannerAdComponent from '../components/BannerAd';

function AccountScreen({ navigation }) {

    const { user, setUser } = useContext(AuthContext);


    const handleLogOut = () =>{
        setUser(null);
        authStorage.removeToken();
    }


    return (
        <Screen style={styles.container}>
            <View style={styles.centeredView}>
                <Image source={{ uri: user.data.user.avatar }} style={styles.avatar} />
                <AppText style = {styles.username}>{user.data.user.username}</AppText>
                <View style = {styles.stardusts}>
                <Image source ={require('../assets/stardust-icon.png')} style = {styles.stardusticon}/>
                <AppText style= {styles.stardustcount}>{user.data.user.stardusts}</AppText>
                </View>
                <AppButton onPress={handleLogOut} title = "Cerrar Sesión"></AppButton>
                <BannerAdComponent style={styles.adCard} />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 20,
        marginTop: 70,
    },
    username:{
        fontSize: 24,
        color: colors.white,
        marginTop: 20,
        fontWeight: 900,
    },
    stardusts:{
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        marginBottom: 100,
    },
    stardusticon:{
        width: 25,
        height: 25,
        marginRight: 10,
    },
    stardustcount:{
        color: colors.white,
        fontWeight: 900,
    },
    adCard:{
        marginTop: 50,
    }
});

export default AccountScreen;
