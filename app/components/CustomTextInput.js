import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity, Modal, Text } from 'react-native';
import colors from '../config/colors'; // Adjust the import path as necessary
import { MaterialIcons } from '@expo/vector-icons';

const CustomTextInput = ({ icon, placeholder, value, onChangeText, onBlur, multiline, numberOfLines, style, onPress }) => {
  const [inputHeight, setInputHeight] = useState(40); // Starting height


  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputContainer}>
        <Image source={icon} style={styles.icon} />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.lightgray}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onContentSizeChange={(event) => {
            setInputHeight(event.nativeEvent.contentSize.height);
          }}
          style={[styles.textInput, { height: Math.max(40, inputHeight) }]} // Adjust height dynamically
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={onPress}>
        <Image source={require('../assets/verified-icon.png')} style={{ width: 15, height: 15, marginRight: 10 }} />
        <MaterialIcons name="add" size={15} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.lightgray,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    color: colors.white,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: colors.secondary,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  closeButton: {
    marginTop: 10,
    color: colors.primary,
    textAlign: 'center',
  },
});

export default CustomTextInput;
