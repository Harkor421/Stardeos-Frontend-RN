import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Screen from '../components/Screen';
import TextGradient from '../components/TextGradient';
import colors from '../config/colors';
import { Image } from 'react-native';
import GradientBorderButton from '../components/GradientBorderButton';
import { Linking } from 'react-native';
import AppText from '../components/AppText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AuthContext from '../auth/context';
import { useContext } from 'react';

function StardustScreen({navigation}) {
    const { user } = useContext(AuthContext);

    return (
        <Screen style={styles.container}>
            <View style={styles.headertop}>
                <AppText style={styles.headerText}>Stardust</AppText>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="close" size={30} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.header}>
                <TextGradient style={styles.headerText}>Actualmente tienes:</TextGradient>
                <Image source = {require("../assets/verified-icon.png")} style = {{marginVertical: 15, width: 25, height: 25, }}/>
                <TextGradient style={styles.stardustAmount}>{user.data.user.stardusts}</TextGradient>
            </View>

            <Text style={styles.separator} />

            <GradientBorderButton title="Consigue Stardust" onPress={() =>Linking.openURL('https://stardeos.com/en/buy/buy-stardust')}/>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1f233e',
        padding: 10,
    },
    header: {
        alignItems: 'center',
        marginVertical: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    stardustAmount: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    purchaseContainer: {
        backgroundColor: '#2a2e52',
        borderRadius: 10,
        padding: 20,
    },
    purchaseText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    option: {
        backgroundColor: '#333870',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        alignItems: 'center',
    },
    price: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#ff69b4',
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold',
    },
    separator: {
        borderColor: colors.grayline,
        borderWidth: 0.3,
        height: 1,
        width: "50%",
        alignSelf: 'center',
        marginVertical: 40,
      },
      headertop: {
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
});

export default StardustScreen;
