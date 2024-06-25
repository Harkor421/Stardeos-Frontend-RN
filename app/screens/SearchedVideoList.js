import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import ActivityIndicator from '../components/ActivityIndicator';
import useApi from '../hooks/useApi';
import videosApi from '../api/videos';
import colors from '../config/colors';
import VideoItem from '../components/VideoItem'; // Import the VideoItem component
import BannerAdComponent from '../components/BannerAd';

function SearchedVideoList({ navigation, route }) {
  const { search } = route.params;
  const [page, setPage] = useState(1);
  const [allVideos, setAllVideos] = useState([]);
  const [refresh, setRefresh] = useState(false); // State variable to force refresh
  const { data: videos, error, loading, request: loadVideos } = useApi(() =>
    videosApi.searchVideo({ search: search, page: page })
  );

  // Memoized renderItem function to prevent unnecessary re-renders
  const renderItem = useCallback(
    ({ item, index }) => {
      if ((index + 1) % 5 === 0) {
        // Render ad card every 5th item
        return <BannerAdComponent style={styles.adCard} />;
      } else {
        // Render video item
        return <VideoItem item={item} navigation={navigation} replace={0} />;
      }
    },
    [navigation]
  );

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
    setPage(1); // Reset page to 1 when refreshing
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
      {allVideos.length === 0 && !loading && !error ? (
        <View style={styles.centeredMessage}>
          <Text style={styles.messageText}>No se encontraron videos</Text>
        </View>
      ) : (
        <FlatList
          style={{ marginHorizontal: 10 }}
          data={allVideos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          onEndReachedThreshold={0.1}
          onEndReached={() => setPage(page + 1)}
          refreshing={loading} // Set refreshing state based on loading status
          onRefresh={handleRefresh} // Call handleRefresh when pull-to-refresh is triggered
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  centeredMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
  },
  adCard: {
    backgroundColor: colors.lightgray,
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchedVideoList;
