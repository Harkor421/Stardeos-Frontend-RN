import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import colors from '../../config/colors';
import api from '../../api/user';
import AuthContext from '../../auth/context';
import GradientBorderButton from '../GradientBorderButton';
import AppButton from '../AppButton';
import { ErrorMessage } from '../forms';

const MAX_IMAGE_SIZE = 1.9 * 1024 * 1024; // 1.9 MB in bytes

const UploadAvatar = ({ navigation }) => {
    const [imageUri, setImageUri] = useState(null);
    const { user, updateUser, tempUpdateUserAvatar } = useContext(AuthContext);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const { uri } = result.assets[0];
            const fileInfo = await FileSystem.getInfoAsync(uri);
            
            if (fileInfo.size > MAX_IMAGE_SIZE) {
                Alert.alert('Error', 'Image size exceeds the maximum limit of 1.9 MB.');
                return;
            }

            setImageUri(uri);
        }
    };

    const handleUpload = async () => {
        if (!imageUri) return;

        const formData = new FormData();
        formData.append('avatar', {
            uri: imageUri,
            name: 'avatar.jpg',
            type: 'image/jpeg',
        });

        try {
            const response = await api.updateAvatar(formData);
            console.log(response);
            Alert.alert('Success', 'Image uploaded successfully');
            console.log('Image uploaded:', imageUri);
            tempUpdateUserAvatar(imageUri); 
            navigation.goBack()
        } catch (error) {
            Alert.alert('Error', 'Failed to upload image');
            console.error('Failed to upload image:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                <MaterialCommunityIcons name="close" size={24} color={colors.white} />
            </TouchableOpacity>
            <Text style={styles.title}>Sube tu avatar</Text>
            {imageUri && (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: imageUri }} style={styles.image} />
                </View>
            )}

            <AppButton title="Selecciona tu foto" style={styles.helpButton} onPress={pickImage} />
            <GradientBorderButton title="Aplicar cambios"  onPress={handleUpload} style={{ width: "90%", marginBottom: 20,marginTop: 20, }} />
            <ErrorMessage error = "El nuevo avatar subido puede tardar hasta 10 minutos en actualizarse en todos nuestros servicios." visible = {true}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: colors.white
    },
    uploadButton: {
        backgroundColor: colors.secondary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    imageContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 50,
    },
});

export default UploadAvatar;
