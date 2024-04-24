import React from 'react';
import {View, StyleSheet, Image} from 'react-native'
import AppText from './AppText'

import colors from '../config/colors'
import ListItem from './ListItem';
import { TouchableOpacity } from 'react-native-gesture-handler';



function Card({title, subTitle, views, thumbnail, avatar, onPress}) {
    return (
        <TouchableOpacity onPress={onPress}>
        <View style = {styles.card}>
            <Image style = {styles.image} source= {{uri: thumbnail}}/>
            <View style = {styles.detailsContainer}>
                <ListItem
                title = {title}
                subTitle={subTitle}
                avatar = {avatar}
                showVerified={true}
                />
            </View>
            <AppText style = {styles.views}>{views}</AppText>
        </View>      
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card:{
        borderRadius: 15,
        backgroundColor: colors.primary,
        marginBottom: 20,
        overflow: 'hidden'

    },

    image:{
        width: "100%",
        height: 220,
        borderRadius:15
    },

    detailsContainer:{
        marginTop: 10,
        paddingLeft: 5,
        flexDirection: "row",
        alignItems:'center'
    },
    title:{
        color: colors.white,
        fontSize: 18,
        fontWeight: 900,
        marginBottom: 1
    },
    subTitle:{
        color: colors.secondary,
    },
    views:{
        color: colors.secondary,
        fontSize: 15,
        marginRight:15,
        bottom: 15,
        fontWeight: 700,
        textAlign: 'right',
    }
})

export default Card;