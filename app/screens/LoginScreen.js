import React, { useContext, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import * as Yup from 'yup'

import Screen from '../components/Screen';
import colors from '../config/colors'
import AppText from '../components/AppText';
import {AppForm, ErrorMessage, AppFormField, SubmitButton} from '../components/forms'
import authApi from '../api/auth'
import AuthContext from '../auth/context';
import authStorage from '../auth/storage';

const validationSchema = Yup.object().shape({
    username: Yup.string().required().label('Username'),
    password: Yup.string().required().min(8).label('Contraseña'),

});

function LoginScreen(props) {
    
    const authContext = useContext(AuthContext);
    const [loginFailed, setLoginFailed] = useState(false);


    const handleSubmit = async ({username, password}) => {
        const result = await authApi.login({username, password});
        if (!result.ok) {
            setLoginFailed(true);
            console.log('Login failed:', result);
            return;
        }
        
        setLoginFailed(false);
        console.log('Login success:', result);
    
        authStorage.storeToken(result.data); // Pass the entire result.data to storeToken
    
        authContext.setUser(result.data);
    }
    
    

    return (
        <Screen style = {styles.container}>
            <Image
            style ={styles.logo}
            source ={require('../assets/stardeos-logo.png')} 
            />
            <Image
            style ={styles.letter}
            source ={require('../assets/stardeos-letters.png')} 
            />
            <AppForm           
            initialValues ={{username: '', password: ''}}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            >
                <ErrorMessage error = "Usuario o contraseña no es valido" visible={loginFailed}/>
                        <AppFormField
                        autoCapitalize="none"
                        name="username"
                        autoCorrect={false}
                        keyboardType="default"
                        icon="user"
                        placeholder="Usuario"
                        placeholderTextColor = {colors.lightgray}
                        />
                        <AppFormField
                        name="password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                        icon="lock"
                        textContentType="password"
                        secureTextEntry
                        placeholder="Contraseña"
                        placeholderTextColor = {colors.lightgray}
                        />
                        <AppText style = {styles.forgotpassword}>Olvidaste tu Contraseña?</AppText>
                        <AppText style = {styles.forgotusername}>Olvidaste tu Usuario?</AppText>
                        <SubmitButton title="Iniciar Sesión" />
            </AppForm>
        </Screen>
    );
}
const styles = StyleSheet.create({
    container:{
        padding:10,
        alignItems: 'center',
    },
    logo:{
        width:100,
        height: 100,
        alignSelf: 'center',
        marginTop: 50,
    },
    letter:{
        resizeMode: 'stretch',
        width: 170,
        height: 46,
        alignSelf: 'center',
        marginBottom: 15
    },
    forgotpassword:{
        color: colors.bluelink,
        textAlign: 'right',
        marginRight: 20,
        fontWeight: 500,
        textDecorationLine: 'underline',
        fontSize: 16,
        marginTop: 12,
    },
    forgotusername:{
        color: colors.bluelink,
        textAlign: 'right',
        marginRight: 20,
        fontWeight: 500,
        textDecorationLine: 'underline',
        fontSize: 16,
        marginTop: 12,
        marginBottom: 30,
    },


})

export default LoginScreen;