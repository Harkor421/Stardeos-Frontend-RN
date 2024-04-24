import {React, useState, useEffect} from 'react';
import Screen from '../components/Screen'
import {FlatList, StyleSheet, View} from 'react-native';
import Card from '../components/Card';

import videosApi from '../api/videos'
import colors from '../config/colors'
import routes from '../components/navigation/routes'
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';

import ActivityIndicator from '../components/ActivityIndicator';
import useApi from '../hooks/useApi';


function VideoList({navigation}) {

  const {data: videos, error, loading, request: loadVideos} = useApi(videosApi.getRecommendedVideos);
  
    useEffect(() =>{
        loadVideos();
    }, []);


      return (
        <Screen style={styles.screen}>
          {error && 
          <>     
            <AppText>No se puede conectar a Stardeos.</AppText>
            <AppButton title = "Reintentar" onPress = {loadVideos}></AppButton>
          </>}
          <ActivityIndicator visible={true} />
          <FlatList

            data={videos.videos}
            keyExtractor={(video) => video.id}
            renderItem={({ item }) => (
              <Card
                title={item.title}
                subTitle={item.creator.username}
                thumbnail={item.thumbnail}
                views={item.views}
                avatar={item.creator.avatar}
                onPress={() => navigation.navigate(routes.VIDEO_DETAILS, item)}
              />
            )}
          />
          <View style = {styles.lowcontainer}>

          </View>
        </Screen>
      );
    }

const styles = StyleSheet.create({
    screen:{
        padding: 19,
    },
    lowcontainer:{
      height: 30,
    }
})

export default VideoList;