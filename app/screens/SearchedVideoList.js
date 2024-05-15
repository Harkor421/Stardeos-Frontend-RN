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

function SearchedVideoList({ navigation, search }) {
  const [page, setPage] = useState(1);
  const [allVideos, setAllVideos] = useState([]);
  const [refresh, setRefresh] = useState(false); // State variable to force refresh
  const { data: videos, error, loading, request: loadVideos } = useApi(() => videosApi.searchVideo({ search: search, page: page }));

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
  }, [page, search, refresh]); // Update when the page, search term, or refresh state changes

  useEffect(() => {
    setPage(1); // Reset page to 1 whenever the search term changes
    setAllVideos([]); // Clear the list when search term changes
  }, [search]);

  // Function to force refresh
  const handleRefresh = () => {
    setRefresh(!refresh);
    setAllVideos([]); // Clear the list when refreshing
  };

  return (
    <Screen style={styles.screen}>
      {error && (
        <>
          <AppText>No se puede conectar a Stardeos.</AppText>
          <AppButton title="Reintentar" onPress={loadVideos} />
        </>
      )}
      <ActivityIndicator visible={loading} />
      <FlatList
        data={allVideos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReachedThreshold={0.1}
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
    padding: 19,
  },
  adCard: {
    // Styles for the ad card container
    backgroundColor: colors.lightGray,
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  adCard: {
    marginVertical: 20,
    alignItems: 'center',
  },
});

export default SearchedVideoList;
