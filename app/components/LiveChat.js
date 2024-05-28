import React, { useEffect, useRef, useState, useContext } from 'react';
import { View, StyleSheet, Text, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Modal, Button } from 'react-native';
import socketIOClient from 'socket.io-client';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../config/colors';
import AuthContext from '../auth/context';
import CustomTextInput from './CustomTextInput';
import Interaction from './Interaction';
import DonateModal from './DonateModal';
const SOCKET_SERVER_URL = "ws://13.36.152.191:8881";

export const LiveChat = ({ stream, expand }) => {
  const { user } = useContext(AuthContext);
  const streamId = stream.id;
  const [time, setTime] = useState(0);
  const [stardust, setStardust] = useState(0);
  const [inputText, setInputText] = useState(''); // State to store input text
  const [viewers, setViewers] = useState(0);
  const [messages, setMessages] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const flatListRef = useRef(null);
  const ws = useRef(null);
  const NEW_CHAT_MESSAGE_EVENT = "event_message";
  const GET_CHAT_MESSAGE_EVENT = "new_message";

  useEffect(() => {
    if (streamId) {
      ws.current = socketIOClient(SOCKET_SERVER_URL, {
        transports: ['websocket'], // Force WebSocket transport
        reconnectionAttempts: 5,   // Retry up to 5 times
        reconnectionDelay: 3000    // 3 seconds delay between retries
      });

      ws.current.on('connect', () => {
        ws.current.emit('event_join', { room: streamId });
        ws.current.emit('event_join', { room: `${streamId}_viewers` });
      });
      
      const intervalId = setInterval(() => {
        ws.current.emit('event_join', { room: `${streamId}_timer` });
      }, 1000);
  

      ws.current.on('connect_error', (err) => {
        console.error("WebSocket connection error:", err.message);
      });

      ws.current.on('disconnect', () => {
        console.log("WebSocket disconnected");
      });

      ws.current.on("stream_end", (mg) => {
        endStream(mg);
      });

      ws.current.on("update_time", (mg) => {
        const totalSeconds = Math.max(0, mg['time']);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        setTime(formattedTime);
      });

      ws.current.on("viewers", (viewers) => {
        updateViewers(viewers);
      });

      ws.current.on(GET_CHAT_MESSAGE_EVENT, (mg) => {
        addMessage(mg);
      });

      return () => {
        if (ws.current) {
          ws.current.disconnect();
        }
      };
    }
  }, [streamId]);

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const endStream = (message) => {
    console.log("Stream has ended:", message);
  };

  const updateViewers = (viewersCount) => {
    setViewers(viewersCount);
  };

  const addMessage = (message) => {
    // Add the message to the messages state
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const sendMessage = () => {
    if (!inputText || !user) return;
  
    const token = user.data.access_token;
  
    const message = {
      message: inputText,
      room: streamId,
      token: token,
      amount: stardust,
      user: user.data.username // Ensure the user field is included
    };
  
    ws.current.emit(NEW_CHAT_MESSAGE_EVENT, message);
    setInputText(''); // Clear the input text after sending the message
    setStardust(0);
  };
  

  const toggleChatHeight = () => {
    setIsExpanded(prevState => !prevState);
  };

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };
  const updateStardust = (newStardust) => {
    setStardust(newStardust);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, isExpanded && styles.expandedContainer]}
    >
      <View style={styles.header}>
        <Image source={require("../assets/chat-alt-2.png")} />
        <Text style={styles.chatTitle}>CHAT</Text>
        <View style={styles.chatCountContainer}>
          <MaterialIcons name="people" size={24} color={colors.white} />
          <Text style={styles.chatCount}>{viewers.viewers}</Text>
          <MaterialIcons name="timer" size={20} color={colors.white} style={{ marginLeft: 10 }} />
          <Text style={styles.timer}>{time}</Text>
          <TouchableOpacity style={{ alignItems: 'center' }} onPress={expand}>
            <MaterialIcons name="keyboard-control-key" size={24} color={colors.white} style={{ marginLeft: 10 }} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.separator} />
      <FlatList
        style={{ padding: 10 }}
        ref={flatListRef}
        data={messages}
        keyExtractor={(item, key) => key.toString()}
        renderItem={({ item }) => {
          if (!item.amount) {
            return (
              <View style={styles.commentContainerAlternate}>
                <View style={styles.userMessageContainer}>
                  <Text style={styles.user}>{item.user}</Text>
                  <Text style={styles.commentText}>{item.message}</Text>
                </View>
              </View>
            );
          } else {
            return (
              <View style={styles.commentContainer}>
                <View style={styles.userMessageContainer}>
                  <Text style={styles.user}>{item.user}</Text>
                  <Text style={styles.commentText}>{item.message}</Text>
                </View>
                <View style={styles.amountContainer}>
                  <Image source={require("../assets/verified-icon.png")} style={{ marginRight: 15 }} />
                  <Text style={styles.amount}>{item.amount}</Text>
                </View>
              </View>
            );
          }
        }}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
      />
      <Text style={styles.separator} />
      <View style={styles.inputContainer}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <CustomTextInput
            icon={{ uri: user.data.user.avatar }}
            style={styles.commentInput}
            placeholder="Escribe un comentario..."
            value={inputText} // Set the value of TextInput to inputText state
            onChangeText={setInputText} // Update inputText state when input changes
            placeholderTextColor={colors.light}
            onPress={handleModalOpen}
            stardustamount={stardust}
            onEndEditing={sendMessage}
          />
        </View>
       
      </View>
      <DonateModal modalVisible={modalVisible} onRequestClose={handleModalClose} handleStardustUpdate={updateStardust} stardust={stardust} />

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.headerblue,
    borderRadius: 10,
    marginTop: 10,
  },
  expandedContainer: {
    flex: 4, // Adjust this value based on the desired expanded height
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
  },
  chatTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  chatCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  chatCount: {
    color: colors.white,
    fontSize: 14,
    marginLeft: 5,
    minWidth: 30, // Ensure consistent width
    textAlign: 'center', // Center align the text
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.light_blue,
    borderRadius: 10,
    marginTop: 10,
  },
  commentContainerAlternate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 10,
  },
  userMessageContainer: {
    flex: 1, // Allow the message container to take available space
    flexDirection: 'column',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.headerblue,
    borderRadius: 10,
    padding: 10,
  },
  amount: {
    color: colors.white,
    fontWeight: '900',
  },
  user: {
    color: colors.light_green,
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 5,
  },
  commentText: {
    color: colors.white,
    fontSize: 14,
    flexShrink: 1, // Allow the text to shrink if necessary
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    marginHorizontal: 10,
  },
  commentInput: {
    flex: 1,
    height: 55,
    color: colors.white,
  },
  separator: {
    borderColor: colors.grayline,
    borderWidth: 0.3,
    height: 1,
    width: '100%', // Adjusted to take full width
  },
  timer: {
    color: colors.white,
    fontWeight: '700',
    marginLeft: 5,
    marginRight: 20,
    minWidth: 60, // Ensure consistent width
    textAlign: 'center', // Center align the text
  },
  addIcon: {
    marginHorizontal: 10,
  },
  sendIcon: {
    marginHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});


export default LiveChat;
