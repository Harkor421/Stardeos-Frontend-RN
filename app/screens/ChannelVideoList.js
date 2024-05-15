import React, { useEffect, useState } from 'react';
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

function ChannelVideoList({ navigation, channelid }) {
  const [page, setPage] = useState(1);
  const [allVideos, setAllVideos] = useState([]);
  
  const { data: videos, error, loading, request: loadVideos } = useApi(() => videosApi.getChannelVideos(channelid, page));

  useEffect(() => {
    if (videos && videos.videos) {
      setAllVideos((prevVideos) => [...prevVideos, ...videos.videos]);
    }
  }, [videos]);

  useEffect(() => {
    loadVideos();
  }, [page]);

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
        scrollEnabled={false} 
        data={allVideos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <VideoItem item={item} navigation={navigation} replace = {0}/>} // Use the VideoItem component here
        onEndReachedThreshold={0.1}
        onEndReached={() => setPage(page + 1)}
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

export default ChannelVideoList;
