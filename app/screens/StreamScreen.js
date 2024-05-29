import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import AppText from '../components/AppText';
import GradientBorderButton from '../components/GradientBorderButton';
import colors from '../config/colors';
import LiveChat from '../components/LiveChat'; 
import ActivityIndicator from '../components/ActivityIndicator';

function StreamScreen({ route, navigation }) {
  const video = route.params;
  const [videoLoad, setVideoLoad] = useState(true);
  const [streamEnded, setStreamEnded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      if (videoRef.current) {
        videoRef.current.pauseAsync();
      }
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const updateStreamStatus = (status) => {
      if (status.isPlaying && status.didJustFinish) {
        setStreamEnded(true);
      }
    };

    const interval = setInterval(() => {
      if (videoRef.current) {
        videoRef.current.getStatusAsync().then(updateStreamStatus);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const windowWidth = Dimensions.get('window').width;
  const aspectRatio = 16 / 9;
  const videoHeight = windowWidth / aspectRatio;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.container}>
        <View style={[styles.videoContainer, { height: videoHeight }]}>
          <Video
            ref={videoRef}
            source={{ uri: video.url }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode={ResizeMode.COVER}
            style={{ width: windowWidth, height: videoHeight }}
            useNativeControls
            shouldPlay
            shouldRasterizeIOS
            onReadyForDisplay={() => setVideoLoad(false)}
            onPlaybackStatusUpdate={(status) => {
              if (status.isPlaying && status.didJustFinish) {
                setStreamEnded(true);
              }
            }}
          />
        <ActivityIndicator visible={videoLoad} />
        </View>
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{video.title}</AppText>
          <AppText style={styles.streamAnnouncement}>{video.description}</AppText>
        </View>
        {streamEnded && (
          <AppText style={{ color: colors.white, textAlign: 'center', fontSize: 18}}>
            Este directo ha terminado.
          </AppText>
        )}
      </View>
        <LiveChat stream={video}/>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.headerblue,
  },
  videoContainer: {
    width: '100%',
  },
  detailsContainer: {
    padding: 10,
    marginTop: 15,
  },
  title: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  streamAnnouncement: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 700,
  },
});

export default StreamScreen;
