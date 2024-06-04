import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import AppText from '../AppText'
import colors from '../../config/colors'


function ErrorMessage({error, visible}) {
    if(!visible || !error) return null;

    return (
        <View style = {styles.container}>
            <Image
            style ={styles.icon}
            source ={require('../../assets/warning.png')} 
            />
            <AppText style={styles.error}>{error}</AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    error:{
        color: colors.errorcolor,
        fontSize: 14,
    },
    container:{
        flexDirection: 'row',
        marginBottom: 20,
    },
    icon: {
        width: 17,
        height: 15,
        marginRight: 10,
        marginLeft: 5,
    }
    
});

export default ErrorMessage;