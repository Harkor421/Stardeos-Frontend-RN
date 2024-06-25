import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import AppText from './AppText';
import colors from '../config/colors';
import ListItem from './ListItem';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useFormatDuration from '../hooks/useFormatDuration';
import routes from './navigation/routes';

function Card({ title, subTitle, views, thumbnail, avatar, onPress, duration, subsOnly, creator, item, navigation }) {
    const formattedDuration = isNaN(duration) ? "En Directo" : useFormatDuration(duration);

    if (subsOnly) {
        return (
            <View style={styles.card}>
                <TouchableOpacity style={styles.imageContainer} onPress={onPress}>
                    {item.isLiveStream ? (
                        <Image style={styles.image} source={require('../assets/Directo.png')} resizeMode="contain" />
                    ) : (
                        <Image style={styles.image} source={{ uri: thumbnail }} resizeMode="cover" />
                    )}
                    <View style={styles.bannerContainer}>
                        <AppText style={styles.bannerText}>Suscríbete para ver</AppText>
                    </View>
                    <View style={styles.durationContainer}>
                        <AppText style={styles.durationText}>{formattedDuration}</AppText>
                    </View>
                </TouchableOpacity>
                <View style={styles.detailsContainer}>
                    <ListItem
                        title={title}
                        subTitle={subTitle}
                        avatar={avatar}
                        showVerified={true}
                        navigate={() => navigation.navigate(routes.CREATOR_DETAILS, item)}
                    />
                </View>
                <AppText style={styles.views}>{views + " Vistas"}</AppText>
            </View>
        );
    } else {
        return (
            <View>
                <View style={styles.card}>
                    <TouchableOpacity style={styles.imageContainer} onPress={onPress}>
                        {item.isLiveStream ? (
                            <Image style={styles.image} source={require('../assets/Directo.png')} resizeMode="contain" />
                        ) : (
                            <Image style={styles.image} source={{ uri: thumbnail }} resizeMode="cover" />
                        )}
                        <View style={styles.durationContainer}>
                            <AppText style={styles.durationText}>{formattedDuration}</AppText>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.detailsContainer}>
                        <ListItem
                            title={title}
                            subTitle={subTitle}
                            avatar={avatar}
                            showVerified={true}
                            creator={creator}
                            navigate={() => {
                                if (item.isLiveStream) {
                                    //do nothing
                                } else {
                                    navigation.navigate(routes.CREATOR_DETAILS, item);
                                }
                            }}
                        />
                    </View>
                    <AppText style={styles.views}>{views + " Vistas"}</AppText>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.primary,
        marginBottom: 20,
        overflow: 'hidden',
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 220,
        borderRadius: 10,
    },
    bannerContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: colors.primary,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    bannerText: {
        color: colors.white,
        fontSize: 14,
    },
    durationContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Black with 60% opacity
        borderRadius: 5,
        paddingHorizontal: 5,
    },
    durationText: {
        color: colors.white,
        fontSize: 14,
    },
    detailsContainer: {
        marginTop: 10,
        paddingLeft: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    views: {
        color: colors.secondary,
        fontSize: 15,
        bottom: 18,
        marginRight: 5,
        fontWeight: '700',
        textAlign: 'right',
    },
});

export default Card;
