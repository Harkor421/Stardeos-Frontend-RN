import React, { useState } from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../config/colors';
import AppButton from './AppButton';
import CheckBox from '@react-native-community/checkbox';

const ReportModal = ({ modalVisible, onRequestClose, handleReport, video }) => {
    const [reportOptions, setReportOptions] = useState({
      inappropriateContent: false,
      spam: false,
      harassment: false,
      violence: false,
      hateSpeech: false,
      nudity: false,
      copyrightViolation: false,
      other: false,
    });
  
    const handleReportAction = () => {
        // Create an object with the report options to send in the request body
        const requestBody = {
          video: video.id,
          reportOptions: reportOptions
        };
      
        // Define the URL of the API endpoint
        const apiUrl = 'https://stardeos.com/api/v2/videos/create';
      
        // Make a POST request to the API endpoint
        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add any other headers if needed, such as authentication headers
          },
          body: JSON.stringify(requestBody) // Convert the object to JSON string
        })
        .then(response => {
    
          console.log('Report submitted successfully');
          onRequestClose();
        })
        .catch(error => {
          // Handle error cases
          console.error('There was a problem with the request:', error.message);
          // Optionally, you can display an error message to the user
        });
      };
  
    const toggleReportOption = (option) => {
      setReportOptions({ ...reportOptions, [option]: !reportOptions[option] });
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
              <Text style={styles.modalText}>Reportar Contenido</Text>
            </View>
  
            {/* Report Options */}
            <View style={styles.reportOptions}>
              <View style={styles.optionContainer}>
                <CheckBox
                  value={reportOptions.inappropriateContent}
                  onValueChange={() => toggleReportOption('inappropriateContent')}
                />
                <Text style={styles.optionText}>Contenido inapropiado</Text>
              </View>
              <View style={styles.optionContainer}>
                <CheckBox
                  value={reportOptions.harassment}
                  onValueChange={() => toggleReportOption('harassment')}
                />
                <Text style={styles.optionText}>Acoso</Text>
              </View>
              <View style={styles.optionContainer}>
                <CheckBox
                  value={reportOptions.violence}
                  onValueChange={() => toggleReportOption('violence')}
                />
                <Text style={styles.optionText}>Violencia</Text>
              </View>
              <View style={styles.optionContainer}>
                <CheckBox
                  value={reportOptions.hateSpeech}
                  onValueChange={() => toggleReportOption('hateSpeech')}
                />
                <Text style={styles.optionText}>Discurso de odio</Text>
              </View>
              <View style={styles.optionContainer}>
                <CheckBox
                  value={reportOptions.nudity}
                  onValueChange={() => toggleReportOption('nudity')}
                />
                <Text style={styles.optionText}>Desnudez</Text>
              </View>
              <View style={styles.optionContainer}>
                <CheckBox
                  value={reportOptions.copyrightViolation}
                  onValueChange={() => toggleReportOption('copyrightViolation')}
                />
                <Text style={styles.optionText}>Violación de derechos de autor</Text>
              </View>
            </View>
  
            {/* Report Button */}
            <AppButton title="Reportar" onPress={handleReportAction} style={styles.reportButton} />
  
            {/* Close Button */}
            <TouchableOpacity style = {{alignItems: 'center', justifyContent: 'center'}} onPress={onRequestClose}>
              <Text style={styles.closeButton}>Cerrar</Text>
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
  reportOptions: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Align both checkbox and text vertically
    marginVertical: 8,
  },
  optionText: {
    flex: 1, // Allow text to expand and align to flex-end
    marginLeft: 20,
    color: colors.white,
  },
  reportButton: {
    width: '100%',
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  closeButton: {
    color: colors.white,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default ReportModal;
