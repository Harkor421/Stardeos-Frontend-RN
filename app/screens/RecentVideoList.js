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

function RecentVideoList({ navigation, route}) {
  const [page, setPage] = useState(1);
  const [allVideos, setAllVideos] = useState([]);
  const [refresh, setRefresh] = useState(false); // State variable to force refresh
  const { data: videos, error, loading, request: loadVideos } = useApi(() => videosApi.getLatestVideos(page));


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
        style = {{marginHorizontal: 10,}}
        data={allVideos}
        keyExtractor={(item, index) => item.id.toString() + index} // Ensure unique keys
        renderItem={renderItem}
        onEndReachedThreshold={0.2}
        onEndReached={() => setPage(page + 1)}
        refreshing={loading} // Set refreshing state based on loading status
        onRefresh={handleRefresh} // Call handleRefresh when pull-to-refresh is triggered
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.primary,   
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

export default RecentVideoList;
