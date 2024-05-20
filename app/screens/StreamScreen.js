import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import AppText from '../components/AppText';
import Interaction from '../components/Interaction';
import ListItem from '../components/ListItem';
import AppButton from '../components/AppButton';
import RandomList from './RandomList';
import colors from '../config/colors';
import routes from '../components/navigation/routes';
import useShareVideo from '../hooks/useShareVideo';
import useApi from '../hooks/useApi';
import videosApi from '../api/videos';

function StreamScreen({ route, navigation }) {
  const video = route.params;
  const [videoLoad, setVideoLoad] = useState(true);
  const [streamEnded, setStreamEnded] = useState(false); // State to track if the stream has ended
  const videoRef = useRef(null);
  const { data: comments, loading: commentsLoading, request: loadComments } = useApi(() => videosApi.getComments(video.id));

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

  const handleShare = useShareVideo(video);

  const windowWidth = Dimensions.get('window').width;
  const aspectRatio = 16 / 9; // Default aspect ratio, change as needed
  const videoHeight = windowWidth / aspectRatio;

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.videoContainer, { height: videoHeight }]}>
        <Video
          ref={videoRef}
          source={{ uri: video.url }} // Use your live stream URL here
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
      </View>
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>{video.title}</AppText>
        <View style={styles.interactions}>
          <Interaction image={require('../assets/like-icon.png')} text={video.likeCount} style={styles.like} />
          <Interaction image={require('../assets/dislike-icon.png')} text={video.dislikeCount} style={styles.dislike} />
          <Interaction image={require('../assets/share-icon.png')} text={'Compartir'} style={styles.dislike} onPress={handleShare} />
          <Interaction image={require('../assets/stardust-icon.png')} text={'Dona'} style={styles.dislike} />
        </View>
        <View style={styles.userContainer}>
          <ListItem
            avatar=""
            title={video.title}
            subTitle="Seguidores"
            showVerified={false}
            navigate={() => navigation.navigate(routes.CREATOR_DETAILS, video)}
          />
          <View style={styles.vercanalContainer}>
            <AppButton title="Seguir" style={styles.vercanal} />
          </View>
        </View>
      </View>
      {streamEnded && (
        <AppText style={{ color: colors.white, textAlign: 'center', fontSize: 18 }}>
          Este directo ha terminado.
        </AppText>
      )}
      <RandomList navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  videoContainer: {
    width: '100%',
  },
  detailsContainer: {
    padding: 10,
  },
  title: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  interactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  like: {},
  dislike: {},
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vercanalContainer: {
    marginLeft: 'auto',
  },
  vercanal: {
    width: 110,
    height: 50,
    borderRadius: 18,
  },
});

export default StreamScreen;
