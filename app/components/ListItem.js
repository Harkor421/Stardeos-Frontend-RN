import React from 'react';
import {View, StyleSheet, Image} from 'react-native'
import AppText from './AppText';

import colors from '../config/colors'
import AppButton from './AppButton';

function ListItem({title, subTitle, avatar, showVerified}) {
    return (
       <View style = {styles.container}>
        <Image style = {styles.image} source = {{uri: avatar}} />
        <View style = {styles.userInfo}>
            <AppText style = {styles.user} numberOfLines={1}>{title}</AppText>
            <View style = {styles.usernamecontainer}>
                { showVerified && <Image style = {styles.verifiedicon} source = {require('../assets/verified-icon.png')} />}
                <AppText style = {styles.subTitle}>{subTitle}</AppText>
            </View>
        </View>
       </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        marginLeft: 10
    },
    userInfo:{
        marginTop: 2,
        marginLeft: 4,
    },
    image:{
        width: 40,
        height: 40,
        borderRadius: 35,
        marginRight: 10
    },
    user:{
        color: colors.white,
        fontWeight: 900,
        fontSize:15,
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

export default ListItem;