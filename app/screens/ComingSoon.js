import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

function ComingSoon(props) {
    return (
        <View style={styles.container}>
            {/* Logo or Image */}
            <Image 
                source={require('../assets/stardeos-logo.png')} // Replace with your logo image path
                style={styles.logo}
                resizeMode="contain"
            />

            {/* Title */}
            <Text style={styles.title}>Próximamente</Text>

            {/* Description */}
            <Text style={styles.description}>Estamos trabajando en nuevas funcionalidades. ¡Muy pronto podrás disfrutar de ellas!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f233e',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    description: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },
});

export default ComingSoon;
