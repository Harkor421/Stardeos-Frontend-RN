import React, { useContext, useState } from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import colors from '../config/colors';
import AppText from '../components/AppText';
import { AppForm, ErrorMessage, AppFormField, SubmitButton } from '../components/forms';
import authApi from '../api/auth';
import AuthContext from '../auth/context';
import authStorage from '../auth/storage';
import CheckBox from '@react-native-community/checkbox';

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label('Username'),
  password: Yup.string().required().label('Contraseña'),
});

function LoginScreen(props) {
  const authContext = useContext(AuthContext);
  const [loginFailed, setLoginFailed] = useState(false);
  const [acceptEULA, setAcceptEULA] = useState(false);

  const handleSubmit = async ({ username, password }) => {
    if (!acceptEULA) {
        alert('Debe aceptar los términos y condiciones para continuar.');
        return;
      }
    
    const result = await authApi.login({ username, password });
    if (!result.ok) {
      setLoginFailed(true);
      console.log('Login failed:', result);
      return;
    }

    setLoginFailed(false);
    console.log('Login success:', result);

    authStorage.storeToken(result.data); // Pass the entire result.data to storeToken
    authContext.setUser(result.data);
  };

  const openWebBrowser = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
    console.log(result);
  };

  return (
    <Screen style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/stardeos-logo.png')}
      />
      <Image
        style={styles.letter}
        source={require('../assets/stardeos-letters.png')}
      />
      <AppForm
        initialValues={{ username: '', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize="none"
          name="username"
          autoCorrect={false}
          keyboardType="default"
          icon="user"
          placeholder="Usuario"
          placeholderTextColor={colors.lightgray}
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
          placeholderTextColor={colors.lightgray}
        />
        <ErrorMessage error="Usuario o contraseña no es valido" visible={loginFailed} />
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => openWebBrowser('https://stardeos.com/forget-password')}>
            <AppText style={styles.forgotpassword}>¿Olvidaste tu contraseña?</AppText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openWebBrowser('https://stardeos.com/forget-username')}>
            <AppText style={styles.forgotusername}>¿Olvidaste tu usuario?</AppText>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
          <CheckBox
            value={acceptEULA}
            onValueChange={(value) => setAcceptEULA(value)}
          />
          <TouchableOpacity onPress={() => openWebBrowser('https://stardeos.com/terms-and-conditions')}>
            <AppText style={{ marginLeft: 10, color: colors.white, fontSize: 12 }}>
              Acepto los términos y condiciones. 
              <AppText style={{ color: colors.bluelink, fontSize: 14, }}> Encuéntralos aquí.</AppText>
            </AppText>
          </TouchableOpacity>
        </View>
        <ErrorMessage error="Debe aceptar los términos y condiciones para continuar." visible={!acceptEULA} />
        <SubmitButton title="Iniciar Sesión" />
        <TouchableOpacity style={styles.cuentacontainer} onPress={() => openWebBrowser('https://stardeos.com/signup')}>
          <AppText style={styles.crearcuenta}>¿No tienes una cuenta?</AppText>
          <AppText style={styles.crearcuentaurl}>¡Créala aquí mismo!</AppText>
        </TouchableOpacity>
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.headerblue,
    paddingHorizontal: "1%",
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 50,
  },
  letter: {
    resizeMode: 'stretch',
    width: 170,
    height: 46,
    alignSelf: 'center',
    marginBottom: 15,
  },
  forgotpassword: {
    color: colors.bluelink,
    fontWeight: '500',
    textDecorationLine: 'underline',
    fontSize: 16,
    marginTop: 12,
  },
  forgotusername: {
    color: colors.bluelink,
    fontWeight: '500',
    textDecorationLine: 'underline',
    fontSize: 16,
    marginTop: 12,
    marginBottom: 30,
  },
  crearcuenta: {
    color: colors.white,
    marginRight: 10,
    fontWeight: '500',
    fontSize: 16,
  },
  crearcuentaurl: {
    color: colors.bluelink,
    fontWeight: '500',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  cuentacontainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
