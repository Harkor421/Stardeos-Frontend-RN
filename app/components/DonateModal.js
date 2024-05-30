import React, { useState } from 'react';
import { View, Modal, StyleSheet, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import colors from '../config/colors';
import CustomTextInput from './CustomTextInput';
import GradientBorderButton from './GradientBorderButton';
import AppButton from './AppButton';

const DonateModal = ({ modalVisible, onRequestClose, handleStardustUpdate, stardustaccount }) => {
  const [stardustValue, setStardustValue] = useState('');

  const handleDonate = () => {
    // Convert the stardust value to an integer, default to 0 if not a valid number
    const newStardust = parseInt(stardustValue) || 0;
    
    // Handle donation logic here
    // For demonstration, let's assume the stardust is successfully added
    if (!isNaN(newStardust)) {
      handleStardustUpdate(newStardust); // Call the function to update stardust in LiveChat
    }
    // Close the modal
    onRequestClose();
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
            <Text style={styles.modalText}>Añadir Stardust a tu comentario.</Text>
          </View>

          {/* Donation Input */}
          <CustomTextInput
            style={styles.donationInput}
            placeholder="Agregar Stardust..."
            keyboardType="numeric"
            value={stardustValue}
            onChangeText={setStardustValue}
            stardustamount={stardustaccount - (parseInt(stardustValue) || 0)}
          />

          {/* Negative Stardust Message */}
          {stardustaccount - (parseInt(stardustValue) || 0) < 0 && (
            <Text style={styles.negativeStardustText}>No tienes suficientes stardust</Text>
          )}

          {/* Donation Button */}
          <GradientBorderButton title="Añadir Stardust" style={{ width: "90%", marginBottom: 20,marginTop: 30, }} onPress={handleDonate} />
         
          {/* Close Button */}

          <AppButton title= "Cerrar" onPress={onRequestClose} style = {styles.closebutton}/>
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
    marginBottom: 15,
    backgroundColor: colors.light_blue,
    width: "100%",
    height: "15%",
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'left',
  },
  modalText: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 20,
  },
  negativeStardustText: {
    color: 'red',
    marginBottom: 10,
  },
  donationInput: {
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '90%',
    backgroundColor: colors.darkblue,
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
