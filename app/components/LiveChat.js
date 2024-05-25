import React, { useEffect, useRef, useState, useContext } from 'react';
import { View, StyleSheet, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import socketIOClient from 'socket.io-client';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../config/colors';
import AuthContext from '../auth/context';

export const LiveChat = ({ streamId }) => {
  const { user } = useContext(AuthContext);

  const [viewers, setViewers] = useState(0);
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  const NEW_CHAT_MESSAGE_EVENT = "event_message"; // Name of the event
  const GET_CHAT_MESSAGE_EVENT = "new_message"; // Name of the event

  useEffect(() => {
    if (streamId) {
      console.log("Connecting to WebSocket...");
      ws.current = socketIOClient("https://stardeos.com:8881");

      ws.current.on("connect", () => {
        console.log("WebSocket connected");
        ws.current.emit('event_join', { room: streamId });
        ws.current.emit('event_join', { room: streamId + "_timer" });
        ws.current.emit('event_join', { room: streamId + "_viewers" });
      });

      ws.current.on("stream_end", () => {
        console.log("Stream has ended");
        endStream();
      });

      ws.current.on("viewers", (viewersCount) => {
        console.log("Viewers count received:", viewersCount);
        updateViewers(viewersCount);
      });

      ws.current.on(GET_CHAT_MESSAGE_EVENT, (message) => {
        console.log("New message received:", message);
        addMessage(message);
      });

      return () => {
        console.log("Closing WebSocket connection...");
        ws.current.close();
      };
    }
  }, [streamId]);

  const endStream = () => {
    console.log("Stream has ended");
  };

  const updateViewers = (viewersCount) => {
    setViewers(viewersCount);
  };

  const addMessage = (message) => {
    console.log("Received message:", message); // Log received messages
    setMessages(prev => {
      return prev.length > 150 ? [...prev.slice(-100), message] : [...prev, message];
    });
  };

  const sendMessage = (messageBody, stardusts = 0) => {
    if (!messageBody || !user) return;

    const token = user.access_token;

    const message = {
      message: messageBody,
      room: streamId,
      token: token,
      amount: stardusts
    };

    console.log("Sending message:", message); // Log sent messages

    ws.current.emit(NEW_CHAT_MESSAGE_EVENT, message);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="chat" size={24} color={colors.white} />
        <Text style={styles.chatTitle}>CHAT</Text>
        <View style={styles.chatCountContainer}>
          <MaterialIcons name="people" size={24} color={colors.white} />
          <Text style={styles.chatCount}>{viewers}</Text>
        </View>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            {item.amount ? (
              <View style={styles.donationContainer}>
                <Text style={styles.donationText}>¡{item.user} ha donado {item.amount} stardusts!</Text>
                <Text style={styles.commentText}><b>{item.user}:</b> {item.message}</Text>
              </View>
            ) : (
              <Text style={styles.commentText}><b>{item.user}:</b> {item.message}</Text>
            )}
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Escribe un comentario..."
          placeholderTextColor={colors.light}
          onSubmitEditing={(e) => sendMessage(e.nativeEvent.text)}
        />
        <TouchableOpacity onPress={() => sendMessage("Test message")}>
          <MaterialIcons name="send" size={24} color={colors.white} style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.headerblue,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  chatTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
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
  },
  commentContainer: {
    marginBottom: 10,
  },
  commentText: {
    color: colors.white,
    fontSize: 14,
  },
  donationContainer: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
    borderRadius: 2,
    marginVertical: 10,
  },
  donationText: {
    color: colors.white,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  commentInput: {
    flex: 1,
    color: colors.white,
  },
  sendIcon: {
    marginLeft: 10,
  },
});

export default LiveChat;
