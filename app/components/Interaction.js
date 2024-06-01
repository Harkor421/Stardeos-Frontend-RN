import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image, StyleSheet} from 'react-native';
import AppText from './AppText';

import colors from '../config/colors';

function Interaction({image, text, style, onPress}) {
    return (
        <TouchableOpacity style = {style} onPress={onPress}>
            <Image style= {styles.icon} source = {image}/> 
            <AppText style= {styles.interactiontext}>{text}</AppText>  
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    icon:{
        width: 32,
        height: 30,
    },
    interactiontext:{
        fontSize: 12,
        color: colors.white,
        marginTop: 2,
        fontWeight: '800',
    }
})
export default Interaction;