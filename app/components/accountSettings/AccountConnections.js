import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image, Alert, Dimensions } from 'react-native';
import axios from 'axios';
import Screen from '../Screen';
import AuthContext from '../../auth/context';
import colors from '../../config/colors';
import AppText from '../AppText';
import GradientBorderButton from '../GradientBorderButton';
import * as WebBrowser from 'expo-web-browser';
import { ScrollView } from 'react-native-gesture-handler';
import GradientWrapper from '../GradientWrapper';
import TextGradient from '../TextGradient';

const windowWidth = Dimensions.get('window').width;

function AccountConnections({ navigation }) {
    const { user, updateUser } = useContext(AuthContext);
    const [isDiscordLinked, setIsDiscordLinked] = useState(false);
    const [browserOpen, setBrowserOpen] = useState(false);
    const [discordUser, setDiscordUser] = useState("");
    const checkDiscordLink = async () => {
        try {
            const response = await axios.get(`https://connections.stardeos.com/is-discord-linked/${user.data.user._id}`);
            setIsDiscordLinked(response.data.discordLinked);
            setDiscordUser(response.data);
        } catch (error) {
            console.error('Error checking Discord link status', error);
        }
    };

    useEffect(() => {
        checkDiscordLink();
    }, [user]);

    const openWebBrowser = async (url) => {
        try {
            setBrowserOpen(true);
            await WebBrowser.openBrowserAsync(url);
        } catch (error) {
            console.error('Error opening web browser', error);
            Alert.alert('Error', 'Hubo un error intentando desvincular la cuenta, intenta de nuevo más tarde.');
        } finally {
            setBrowserOpen(false);
        }
    };

    useEffect(() => {
        return () => {
            if (browserOpen) {
                checkDiscordLink();
                updateUser();
            }
        };
    }, [browserOpen]);

    const handleRemoveAccount = async () => {
        try {
            const response = await axios.post('https://connections.stardeos.com/unlink-discord', {
                stardeos_userid: user.data.user._id
            });

            if (response.data) {
                updateUser();
                Alert.alert('Success', 'Your Discord account has been unlinked.');
            } else {
                Alert.alert('Error', 'There was a problem unlinking your Discord account.');
            }
        } catch (error) {
            console.error('Error unlinking Discord account', error);
            Alert.alert('Error', 'There was a problem unlinking your Discord account.');
        }
    };

    if (isDiscordLinked) {
        return (
            <Screen>
                <ScrollView>
                    <AppText style={styles.title}>Discord está vinculado</AppText>
                    <View style={styles.discordContainer}>
                        <Image style={styles.discordImage} source={{ uri: discordUser.discord_avatar_uri }} />
                        <View style={styles.connectedTextContainer}>
                            <AppText style={styles.connectedText}>{`Tu cuenta de Discord `}</AppText>
                            <TextGradient style={styles.connectedText}>{`${discordUser.discord_username} `}</TextGradient>
                            <AppText style={styles.connectedText}>{`está conectada a Stardeos`}</AppText>
                        </View>
                        <GradientBorderButton title="Quitar cuenta" style={styles.button} onPress={handleRemoveAccount} />
                    </View>
                    <View style={styles.instructions}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <Image style={{ height: 20, width: 20, marginRight: 10 }} source={require("../../assets/stardust-icon.png")} />
                            <GradientWrapper>
                                <AppText style={{ color: colors.white, fontWeight: '600', paddingHorizontal: 10, fontSize: 15 }}>Tutorial</AppText>
                            </GradientWrapper>
                        </View>
                        <AppText style={{ color: colors.white, fontWeight: 'bold', fontSize: 25 }}>Cómo obtener beneficios de tus suscripciones con Discord</AppText>
                        <AppText style={{ marginTop: 10, color: colors.white, fontSize: 14 }}>Para activar los roles vinculados y obtener el rol especial de Stardeos Premium en el servidor de Discord, sigue estos pasos:</AppText>
                        <AppText style={{ marginTop: 10, color: colors.white, fontSize: 14 }}>1. Dirígete a la <AppText style={{ fontWeight: 'bold' }}>Configuración del servidor</AppText> en tu servidor de Discord.</AppText>
                        <Image style={{ height: 200, width: 200, resizeMode: 'contain', alignSelf: 'center' }} source={require("../../assets/instruction1.png")} />
                        <AppText style={{ marginTop: 10, color: colors.white, fontSize: 14 }}>2. Haz clic en <AppText style={{ fontWeight: 'bold' }}>Roles Vinculados</AppText> (o <AppText style={{ fontWeight: 'bold' }}>Linked Roles</AppText> si tu Discord está en inglés).</AppText>
                        <AppText style={{ marginTop: 10, color: colors.white, fontSize: 14 }}>3. Busca y haz clic en el logo de <AppText style={{ fontWeight: 'bold' }}>Stardeos</AppText>.</AppText>
                        <Image style={{ height: 200, width: 200, resizeMode: 'contain', alignSelf: 'center' }} source={require("../../assets/instruction2.png")} />
                        <AppText style={{ marginTop: 10, color: colors.white, fontSize: 14 }}>4. Si tienes una suscripción paga en Stardeos, recibirás automáticamente el rol de <AppText style={{ fontWeight: 'bold' }}>Stardeos Premium</AppText>.</AppText>
                    </View>
                </ScrollView>
            </Screen>
        );
    }

    return (
        <Screen>
            <AppText style={styles.title}>Víncula tu Discord</AppText>
            <View style={styles.discordContainer}>
                <View style={styles.accountsContainer}>
                    <View style={styles.account}>
                        <AppText style={styles.text}>Stardeos</AppText>
                        <Image style={styles.userImage} source={require("../../assets/stardeos-logo.png")} />
                    </View>
                    <View style={styles.separatorContainer}>
                        <AppText style={styles.separator}>{'··········'}</AppText>
                    </View>
                    <View style={styles.account}>
                        <AppText style={styles.text}>Discord</AppText>
                        <Image style={styles.userImage} source={require("../../assets/discord-white-icon.webp")} />
                    </View>
                </View>
                <AppText style={styles.text2}>Vincula tu cuenta de Discord con Stardeos para obtener beneficios exclusivos.</AppText>
                <GradientBorderButton onPress={() => openWebBrowser(`https://connections.stardeos.com/linked-role/${user.data.user._id}`)} title="Vincular Discord" style={styles.button} />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: colors.white,
    },
    discordContainer: {
        borderRadius: 15,
        backgroundColor: colors.light_blue,
        alignItems: 'center',
        padding: 20, // Reduced padding to ensure text stays within bounds
        marginHorizontal: 20,
    },
    accountsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    account: {
        alignItems: 'center',
        marginHorizontal: 30,
    },
    separatorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        color: colors.secondary,
        fontSize: 20,
    },
    instructions: {
        padding: 20,
    },
    text: {
        color: colors.white,
        fontWeight: '800',
        marginBottom: 10,
    },
    text2: {
        marginTop: 10,
        marginBottom: 15,
        color: colors.white,
        fontWeight: '800',
        textAlign: 'center',
        fontSize: 12,
    },
    userImage: {
        width: 75,
        height: 75,
    },
    discordImage: {
        width: 75,
        height: 75,
        borderRadius: 40,
    },
    connectedTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10, // Reduced marginTop to ensure text stays within bounds
    },
    connectedText: {
        color: colors.white,
        fontWeight: '800',
        textAlign: 'center',
        fontSize: 12,
    },
    button: {
        width: '100%',
        marginTop: 20,
    },
});

export default AccountConnections;
