import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import ActivityIndicator from '../components/ActivityIndicator';
import useApi from '../hooks/useApi';
import videosApi from '../api/videos';
import colors from '../config/colors';
import routes from '../components/navigation/routes';
import VideoItem from '../components/VideoItem'; // Import the VideoItem component
import BannerAdComponent from '../components/BannerAd';

function RandomList({ navigation }) {
  const [allVideos, setAllVideos] = useState([]);
  const { data: videos, error, loading, request: loadVideos } = useApi(() => videosApi.getRecommendedVideos(randomPage()));

  // Memoized renderItem function to prevent unnecessary re-renders
  const renderItem = useCallback(({ item, index }) => {
    if ((index + 1) % 5 === 0) {
      // Render ad card every 5th item
      return <BannerAdComponent style={styles.adCard} />;
    } else {
      // Render video item
      return <VideoItem item={item} navigation={navigation} replace={0} />;
    }
  }, [navigation]);

  useEffect(() => {
    if (videos && videos.videos) {
      setAllVideos((prevVideos) => [...prevVideos, ...videos.videos]);
    }
  }, [videos]);

  useEffect(() => {
    loadVideos();
  }, []); // Load videos only once when the component mounts

  // Function to generate a random page number
  const randomPage = () => {
    return Math.floor(Math.random() * 100) + 1; // Assuming there are 100 pages of videos
  };

  return (
    <Screen style={styles.screen}>
      {error && (
        <>
          <AppText style={styles.errortext}>No se puede conectar a Stardeos.</AppText>
          <AppButton title="Reintentar" onPress={loadVideos} />
        </>
      )}
      <ActivityIndicator visible={loading} />
      <FlatList
        style ={{marginHorizontal: 10}}
        data={allVideos}
        keyExtractor={(item, index) => item.id.toString() + index} // Ensure unique keys
        renderItem={renderItem}
        scrollEnabled={false}
      />
      <View style={styles.lowcontainer} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
  },
  errortext: {
    color: colors.white,
    textAlign: 'center',
  },
  adCard: {
    marginVertical: 20,
    alignItems: 'center',
  },
});

export default RandomList;
