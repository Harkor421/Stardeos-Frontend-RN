import React from 'react';
import {View, StyleSheet, Image} from 'react-native'
import AppText from './AppText';

import colors from '../config/colors'
import AppButton from './AppButton';
import useTimeAgo from '../hooks/useTimeAgo';

function CommentItem({title, subTitle, avatar, date}) {
    const elapsedTime = useTimeAgo(date);

    return (
       <View style = {styles.container}>
        <Image style = {styles.image} source = {{uri: avatar}} />
        <View style = {styles.userInfo}>
            <AppText style = {styles.user} numberOfLines={1}>{title}</AppText>
            <AppText style = {styles.date} numberOfLines={1}>{elapsedTime}</AppText>
            <View style = {styles.usernamecontainer}>
                <AppText style = {styles.subTitle}>{subTitle}</AppText>
            </View>
        </View>
       </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        marginLeft: 10,
        marginTop: 40,
    },
    userInfo:{
        marginTop: 2,
        marginLeft: 4,
    },
    image:{
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10
    },
    user:{
        color: colors.white,
        fontWeight: 900,
        fontSize:18,
        maxWidth: '90%', // Limiting text width
    },
    subTitle:{
        color: colors.secondary,
        fontSize: 14,
        fontWeight: 900,
    },
    usernamecontainer:{
        flexDirection: 'row',
        marginTop: 3,
        alignItems:'center'
    },
    verifiedicon:{
        width: 12,
        height:12,
        marginRight: 8,
    }

})

export default CommentItem;