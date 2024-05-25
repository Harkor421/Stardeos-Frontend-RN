import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet } from 'react-native';
import colors from '../config/colors'; // Adjust the import path as necessary

const CustomTextInput = ({ icon, placeholder, value, onChangeText, onBlur, multiline, numberOfLines, style }) => {
  const [inputHeight, setInputHeight] = useState(40); // Starting height

  return (
    <View style={[styles.container, style]}>
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
});

export default CustomTextInput;
