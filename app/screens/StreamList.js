import React, { useEffect, useState, useCallback, useRef } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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

function StreamList({ navigation, route }) {
  const [page, setPage] = useState(1);
  const [allVideos, setAllVideos] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // State variable to track refreshing state
  const flatListRef = useRef(null);

  const { data: videos, error, loading, request: loadVideos } = useApi(() => videosApi.getLatestStreams(page));

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
      const liveStreamVideos = videos.videos.filter(video => video.isLiveStream);
      setAllVideos((prevVideos) => [...prevVideos, ...liveStreamVideos]);
    }
  }, [videos]);

  useEffect(() => {
    loadVideos();
  }, [page, refreshing]); // Update when the page or refreshing state changes

  // Function to handle pull-to-refresh
  const handleRefresh = () => {
    setRefreshing(true); // Set refreshing state to true
    setPage(1); // Reset page to 1
    setAllVideos([]); // Clear the list

    // Fetch updated data
    loadVideos().finally(() => {
      setRefreshing(false); // Set refreshing state to false when done
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Screen style={styles.screen}>
        <ActivityIndicator visible={loading} />
        {error && (
          <>
            <AppText style={styles.errortext}>No se puede conectar a Stardeos.</AppText>
            <AppButton title="Reintentar" onPress={loadVideos} />
          </>
        )}
        {!loading && allVideos.length === 0 ? (
          <View style={styles.centeredMessage}>
            <Text style={styles.messageText}>No hay transmisiones en vivo disponibles</Text>
            <AppButton title="Actualizar" onPress={handleRefresh} />
          </View>
        ) : (
          <FlatList
            style={{ marginHorizontal: 10 }}
            ref={flatListRef}
            data={allVideos}
            keyExtractor={(item, index) => item.id.toString() + index} // Ensure unique keys
            renderItem={renderItem}
            onEndReachedThreshold={0.2}
            onEndReached={() => setPage(page + 1)}
            refreshing={refreshing} // Set refreshing state based on refreshing variable
            onRefresh={handleRefresh} // Call handleRefresh when pull-to-refresh is triggered
          />
        )}
      </Screen>
    </GestureHandlerRootView>
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
  centeredMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10, // Add some space between the message and the button
  },
});

export default StreamList;
