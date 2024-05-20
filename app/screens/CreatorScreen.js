import React, { useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native';
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
    const formattedFollowers = useFormatViews(creator.channelId.subscriberCount);
    const formattedSubs = useFormatViews(creator.channelId.user.subscriptionCount);
    const { data: stream, error, loading, request: loadStream } = useApi(() => streamsApi.getStreams(creator.channelId.user.username));

    useEffect(() => {
        loadStream();
        console.log("stream === ", stream)
    }, []);

    const handleLivePress = () => {
        // Check if stream data is available and it's running
        if (stream && !loading && stream.running) {
            // Navigate to the video details screen and pass the stream details as a parameter
            navigation.push("StreamScreen", stream);
        } else {
            console.log("No live stream available");
        }
    };
    
    return (
        <Screen>
            <ScrollView>
                <View style={styles.creatorContainer}>
                    <Image style={styles.creatorAvatar} source={{ uri: creator.creator.avatar }} />
                    <View style={styles.creatorTitle}>
                        <Image style={styles.verifiedIcon} source={require('../assets/verified-icon.png')} />
                        <AppText style={styles.creatorName}>{creator.channelId.displayName}</AppText>
                    </View>
                    {/* Conditional rendering based on whether stream data is available and it's running */}
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
                <View style={{ flex: 1 }}>
                    <ChannelVideoList navigation={navigation} channelid={creator.channelId.id} />
                </View>
            </ScrollView>
        </Screen>
    );
    
}

const styles = StyleSheet.create({
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
        paddingHorizontal: 60,
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
});

export default CreatorScreen;
