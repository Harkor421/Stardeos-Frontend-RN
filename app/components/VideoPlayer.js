import React, { useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';

const VideoPlayer = ({ videoSource }) => {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (status.isPlaying) {
      videoRef.current.pauseAsync();
      setIsPlaying(false);
    } else {
      videoRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const onLoad = (newStatus) => {
    setStatus(newStatus);
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: videoSource }}
        style={styles.video}
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={onLoad}
      />
      <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
        {isPlaying ? (
          <MaterialIcons name="pause" size={24} color="white" />
        ) : (
          <MaterialIcons name="play-arrow" size={24} color="white" />
        )}
      </TouchableOpacity>
      {status.isLoading && (
        <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: 200,
  },
  playButton: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1,
  },
  loader: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
  },
});

export default VideoPlayer;
