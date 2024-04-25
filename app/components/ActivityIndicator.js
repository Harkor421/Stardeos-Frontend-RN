import React from 'react';
import LottieView from 'lottie-react-native';

function ActivityIndicator({visible = false}) {
    if(!visible) return null;

    return <LottieView style = {{flex:1, alignItems: 'center', alignContent: 'center', marginTop: 150} }
    autoPlay
    loop
    source={require('../assets/animations/loading.json')}
    />   
}

export default ActivityIndicator;