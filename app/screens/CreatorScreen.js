import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import colors from '../config/colors';
import VideoList from './VideoList'; // Import the VideoList component
import { ScrollView } from 'react-native-gesture-handler';

function CreatorScreen({ navigation, route }) {
    const creator = route.params;

    return (
        <Screen>
            <View style={styles.creatorcontainer}>
                <Image style={styles.creatoravatar} source={{ uri: creator.creator.avatar }} />
                <View style={styles.creatortitle}>
                    <Image style={styles.verifiedicon} source={require('../assets/verified-icon.png')} />
                    <AppText style={styles.creatorname}>{creator.channelId.displayName}</AppText>
                </View>
                <View style={styles.statscontainer}>
                    <AppText style={styles.followers}>{creator.channelId.subscriberCount + " Seguidores "}</AppText>
                    <AppText style={styles.followers}>{"• "}</AppText>
                    <AppText style={styles.subscribers}>{creator.channelId.user.subscriptionCount + " Suscriptores"}</AppText>
                </View>
            </View>
            <View style = {{flex: 1}}>
                <VideoList navigation={navigation} />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    creatorcontainer: {
        alignItems: 'center',
        marginTop: 100,
    },
    creatoravatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    creatortitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25,
        justifyContent: 'center'
    },
    creatorname: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 900,
    },
    verifiedicon: {
        width: 15,
        height: 15,
        marginRight: 15,
    },
    statscontainer: {
        flexDirection: 'row',
        backgroundColor: colors.graybox,
        alignItems: 'center',
        borderRadius: 30,
        marginTop: 30,
        textAlign: 'center',
        paddingHorizontal: 60,
        justifyContent: 'space-between',
        paddingVertical: 6,
        marginBottom: 60,
    },
    followers: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 700,
    },
    subscribers: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 700,
    },
});

export default CreatorScreen;
