import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

function ViewImageScreen(props) {
    return (
        <Image source = {require('../assets/stardeos-logo.png')}/>
    );
}

export default ViewImageScreen;