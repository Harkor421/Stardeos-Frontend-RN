import React from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../config/colors';
import AppButton from './AppButton';

const ErrorModal = ({ modalVisible, errorMessage, onRequestClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.modalText}>Error</Text>
          </View>

          {/* Error Message */}
          <Text style={styles.errorMessage}>{errorMessage}</Text>
         
          {/* Close Button */}
          <AppButton title="Cerrar" onPress={onRequestClose} style={styles.closeButton} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: colors.headerblue,
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
  },
  header: {
    marginBottom: 15,
    backgroundColor: colors.light_blue,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  errorMessage: {
    marginBottom: 20,
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
  },
  closeButton: {
    width: '100%',
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default ErrorModal;
