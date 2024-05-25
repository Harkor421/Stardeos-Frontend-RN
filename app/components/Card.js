import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import AppText from './AppText';
import colors from '../config/colors';
import ListItem from './ListItem';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useFormatDuration from '../hooks/useFormatDuration';

function Card({ title, subTitle, views, thumbnail, avatar, onPress, duration, subsOnly, creator }) {
    const formattedDuration = isNaN(duration) ? "En Directo" : useFormatDuration(duration);

    if (subsOnly) {
        return (
            <View style={styles.card}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: thumbnail }} />
                    <View style={styles.bannerContainer}>
                        <AppText style={styles.bannerText}>Subscríbete para ver</AppText>
                    </View>
                    {/* Container for duration text */}
                    <View style={styles.durationContainer}>
                        <AppText style={styles.durationText}>{formattedDuration}</AppText>
                    </View>
                </View>
                <View style={styles.detailsContainer}>
                    <ListItem
                        title={title}
                        subTitle={subTitle}
                        avatar={avatar}
                        showVerified={true}
                    />
                </View>
                <AppText style={styles.views}>{views}</AppText>
            </View>
        );
    } else {
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.card}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{ uri: thumbnail }} />
                        {/* Container for duration text */}
                        <View style={styles.durationContainer}>
                            <AppText style={styles.durationText}>{formattedDuration}</AppText>
                        </View>
                    </View>
                    <View style={styles.detailsContainer}>
                        <ListItem
                            title={title}
                            subTitle={subTitle}
                            avatar={avatar}
                            showVerified={true}
                            creator = {creator}
                        />
                    </View>
                    <AppText style={styles.views}>{views}</AppText>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
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
        borderRadius: 15,
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
        marginRight: 15,
        bottom: 15,
        fontWeight: 700,
        textAlign: 'right',
    },
});

export default Card;
