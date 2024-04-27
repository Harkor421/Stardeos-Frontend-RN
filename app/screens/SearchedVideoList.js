import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import Screen from '../components/Screen';
import Card from '../components/Card';
import videosApi from '../api/videos';
import colors from '../config/colors';
import routes from '../components/navigation/routes';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import ActivityIndicator from '../components/ActivityIndicator';
import useApi from '../hooks/useApi';

function SearchedVideoList({ navigation, search}) {
  const [page, setPage] = useState(1);
  const [allVideos, setAllVideos] = useState([]);
  const { data: videos, error, loading, request: loadVideos } = useApi(() => videosApi.searchVideo({ search: search, page: 1 }));


  console.log(search);


  useEffect(() => {
    if (videos && videos.videos) {
      setAllVideos((prevVideos) => [...prevVideos, ...videos.videos]);
    }
  }, [videos]);

  useEffect(() => {
    loadVideos();
  }, [page]);

  const renderItem = ({ item }) => (
    <Card
      title={item.title}
      subTitle={item.creator.username}
      thumbnail={item.thumbnail}
      views={item.views}
      avatar={item.creator.avatar}
      onPress={() => navigation.navigate(routes.VIDEO_DETAILS, item)}
    />
  );

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
      />
      <View style={styles.lowcontainer} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 19,
  },
  lowcontainer: {
    height: 30,
  },
});

export default SearchedVideoList;
