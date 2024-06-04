import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const CustomVideoPlayer = ({ sourceUri }) => {
  const video = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const controlsOpacity = useRef(new Animated.Value(1)).current;
  const controlsVisible = useRef(true);

  const handlePlayPause = async () => {
    if (isPlaying) {
      await video.current.pauseAsync();
    } else {
      await video.current.playAsync();
    }
    setIsPlaying(!isPlaying);
    showControls();
  };

  const handleStop = async () => {
    await video.current.stopAsync();
    setIsPlaying(false);
    setPosition(0);
  };

  const handleSliderChange = (value) => {
    setPosition(value);
    video.current.setPositionAsync(value);
  };

  const handleFullscreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleLoaded = (status) => {
    setDuration(status.durationMillis);
  };

  const toggleControls = () => {
    if (controlsVisible.current) {
      hideControls();
    } else {
      showControls();
    }
  };

  const showControls = () => {
    controlsVisible.current = true;
    Animated.timing(controlsOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const hideControls = () => {
    controlsVisible.current = false;
    Animated.timing(controlsOpacity, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start();
  };

  const handleVideoPress = () => {
    if (isPlaying) {
      handlePlayPause();
    } else {
      showControls();
    }
  };

  const handleScreenPress = () => {
    toggleControls();
    setIsFullScreen(!isFullScreen);
  };

  return (
    <TouchableWithoutFeedback onPress={toggleControls}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={handleVideoPress}>
          <View style={styles.videoContainer}>
            <Video
              ref={video}
              source={{ uri: sourceUri }}
              style={isFullScreen ? styles.fullScreenVideo : styles.video}
              useNativeControls={false}
              onPlaybackStatusUpdate={(status) => handleLoaded(status)}
              resizeMode={ResizeMode.CONTAIN}
            />
            {!isPlaying && (
              <TouchableWithoutFeedback onPress={handlePlayPause}>
                <View style={styles.playPrompt}>
                  <MaterialIcons name="play-arrow" size={64} color="white" />
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.controls, { opacity: controlsOpacity }]}>
          <MaterialIcons
            name={isPlaying ? 'pause' : 'play-arrow'}
            size={24}
            color="white"
            onPress={handlePlayPause}
          />
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            onValueChange={handleSliderChange}
            minimumTrackTintColor="white"
            maximumTrackTintColor="gray"
            thumbTintColor="white"
          />
          <MaterialIcons
            name={isFullScreen ? 'fullscreen-exit' : 'fullscreen'}
            size={24}
            color="white"
            onPress={handleFullscreen}
          />
        </Animated.View>
        {isFullScreen && (
          <TouchableWithoutFeedback onPress={handleScreenPress}>
            <View style={styles.exitFullScreenButton}>
              <MaterialIcons name="fullscreen-exit" size={24} color="white" />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  fullScreenVideo: {
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  playPrompt: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitFullScreenButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default CustomVideoPlayer;
