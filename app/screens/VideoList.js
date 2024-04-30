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

function VideoList({ navigation }) {
  const [page, setPage] = useState(1);
  const [allVideos, setAllVideos] = useState([]);
  const [refresh, setRefresh] = useState(false); // State variable to force refresh
  const { data: videos, error, loading, request: loadVideos } = useApi(() => videosApi.getRecommendedVideos(page));

  // Memoized renderItem function to prevent unnecessary re-renders
  const renderItem = useCallback(({ item }) => {
    return <VideoItem item={item} navigation={navigation} />;
  }, [navigation]);

  useEffect(() => {
    if (videos && videos.videos) {
      setAllVideos((prevVideos) => [...prevVideos, ...videos.videos]);
    }
  }, [videos]);

  useEffect(() => {
    loadVideos();
  }, [page, refresh]); // Update when the page or refresh state changes

  // Function to force refresh
  const handleRefresh = () => {
    setPage(1); // Reset page to 1
    setAllVideos([]); // Clear the list
    setRefresh(!refresh);
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
        data={allVideos}
        keyExtractor={(item, index) => item.id.toString() + index} // Ensure unique keys
        renderItem={renderItem}
        onEndReachedThreshold={0.2}
        onEndReached={() => setPage(page + 1)}
        refreshing={loading} // Set refreshing state based on loading status
        onRefresh={handleRefresh} // Call handleRefresh when pull-to-refresh is triggered
      />
      <View style={styles.lowcontainer} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
  errortext: {
    color: colors.white,
    textAlign: 'center',
  },
});

export default VideoList;
