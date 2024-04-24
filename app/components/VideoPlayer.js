import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const VideoPlayer = ({ videoUri }) => {
  const videoRef = useRef(null);
  const navigation = useNavigation();
  const [status, setStatus] = useState({});
  const [isFullscreen, setIsFullscreen] = useState(false);

  const togglePlayPause = () => {
    if (status.isPlaying) {
      videoRef.current.pauseAsync();
    } else {
      videoRef.current.playAsync();
    }
  };

  const skipBackward = () => {
    videoRef.current.setPositionAsync(Math.max(status.positionMillis - 10000, 0));
  };

  const skipForward = () => {
    videoRef.current.setPositionAsync(Math.min(status.positionMillis + 10000, status.durationMillis));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: videoUri }}
        style={isFullscreen ? styles.fullscreenVideo : styles.video}
        resizeMode="contain"
        onPlaybackStatusUpdate={setStatus}
        useNativeControls
      />
      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={skipBackward}>
          <AntDesign name="banckward" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayPause}>
          <AntDesign name={status.isPlaying ? 'pausecircle' : 'playcircle'} size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipForward}>
          <AntDesign name="forward" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFullscreen}>
          <AntDesign name={isFullscreen ? 'fullscreenexit' : 'fullscreen'} size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    flex: 1,
  },
  fullscreenVideo: {
    width: '100%',
    height: '100%',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
  },
});

export default VideoPlayer;
