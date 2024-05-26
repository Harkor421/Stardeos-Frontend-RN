// DonateModal.js

import React from 'react';
import { View, Modal, StyleSheet, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import colors from '../config/colors';

const DonateModal = ({ modalVisible, onRequestClose }) => {
  const handleDonate = () => {
    // Handle donation logic here
  };

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
            <Text style={styles.modalText}>Donate</Text>
            <Button title="Close" onPress={onRequestClose} />
          </View>

          {/* Donation Input */}
          <TextInput
            style={styles.donationInput}
            placeholder="Enter donation amount"
            keyboardType="numeric"
          />

          {/* Donate Button */}
          <TouchableOpacity style={styles.donateButton} onPress={handleDonate}>
            <Text style={styles.donateButtonText}>Donate</Text>
          </TouchableOpacity>
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
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
  donationInput: {
    borderWidth: 1,
    borderColor: colors.light_gray,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    backgroundColor: colors.white,
  },
  donateButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  donateButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default DonateModal;
