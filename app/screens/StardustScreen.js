import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Screen from '../components/Screen';
import TextGradient from '../components/TextGradient';
import colors from '../config/colors';
import { Image } from 'react-native';

function StardustScreen() {
    return (
        <Screen style={styles.container}>
            <View style={styles.header}>
                <TextGradient style={styles.headerText}>Actualmente tienes:</TextGradient>
                <Image source = {require("../assets/verified-icon.png")} style = {{marginVertical: 15, width: 25, height: 25, }}/>
                <TextGradient style={styles.stardustAmount}>3712</TextGradient>
            </View>

            <Text style={styles.separator} />

            <View style={styles.purchaseContainer}>
                <TextGradient style={styles.purchaseText}>¿Quieres comprar Stardust?</TextGradient>
                <View style={styles.option}>
                    <TextGradient style={styles.price}>1.99 €</TextGradient>
                    <TextGradient style={styles.description}>Recarga de 100 Stardust</TextGradient>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Comprar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.option}>
                    <TextGradient style={styles.price}>5.97 €</TextGradient>
                    <TextGradient style={styles.description}>Recarga de 300 Stardust</TextGradient>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Comprar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f233e',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginVertical: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    stardustAmount: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    purchaseContainer: {
        backgroundColor: '#2a2e52',
        borderRadius: 10,
        padding: 20,
    },
    purchaseText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    option: {
        backgroundColor: '#333870',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        alignItems: 'center',
    },
    price: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#ff69b4',
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold',
    },
    separator: {
        borderColor: colors.grayline,
        borderWidth: 0.3,
        height: 1,
        width: "50%",
        alignSelf: 'center',
        marginVertical: 20,
      },
});

export default StardustScreen;
