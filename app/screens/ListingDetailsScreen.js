import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Share, ScrollView, Dimensions } from 'react-native';
import AppText from '../components/AppText';
import ListItem from '../components/ListItem';
import Screen from '../components/Screen';
import colors from '../config/colors';
import Interaction from '../components/Interaction';
import { Video, ResizeMode } from 'expo-av';
import useApi from '../hooks/useApi';
import videosApi from '../api/videos';
import AppButton from '../components/AppButton';
import routes from '../components/navigation/routes';
import useDateFormat from '../hooks/useDateFormat';
import useFormatViews from '../hooks/useFormatViews';
import ActivityIndicator from '../components/ActivityIndicator';
import VideoList from './VideoList';
import useRandomComment from '../hooks/useRandomComment'; // Import the useRandomComment hook
import useShareVideo from '../hooks/useShareVideo';


function ListingDetailsScreen({ route, navigation, key }) {
  const video = route.params;
  const [reloadKey, setReloadKey] = useState(key);


  const formattedDate = useDateFormat(video.createdAt);
  const formattedViews = useFormatViews(video.views);
  const randomComment = useRandomComment(comments?.comments);
  const handleShare = useShareVideo(video);
  
  console.log(randomComment);
  
  const { data: selectedvideo, error, loading: videoLoading, request: loadVideo } = useApi(() => videosApi.getVideo(video.id), [reloadKey]);
  const { data: comments, loading: commentsLoading, request: loadComments } = useApi(() => videosApi.getComments(video.id), [reloadKey]);

  useEffect(() => { //Load videos and pre load comments
    loadVideo();
    loadComments();
  }, [reloadKey]);


  useEffect(() => { //Page refresh
    const unsubscribe = navigation.addListener('focus', () => {
      setReloadKey(Date.now());
    });

    return unsubscribe;
  }, [navigation]);

  const fileUrls = selectedvideo?.files?.map(file => file.fileUrl) || [];
  const creatorTitle = video.channelId.displayName ? video.channelId.displayName : video.creator.username;

  const windowWidth = Dimensions.get('window').width;
  const aspectRatio = selectedvideo?.files?.[0]?.aspectRatio || 16 / 9;
  const videoHeight = windowWidth / aspectRatio;

  return (
    <Screen style={styles.page}>
      <ScrollView>
        <ActivityIndicator visible={videoLoading || commentsLoading} />
        <Video
          source={{ uri: fileUrls[0] }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode={ResizeMode.COVER}
          style={{ width: windowWidth, height: videoHeight }}
          useNativeControls
          shouldPlay
          shouldRasterizeIOS
        />
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{video.title}</AppText>
          <AppText style={styles.visitas}>{formattedViews} visitas • {formattedDate}</AppText>
          <View style={styles.interactions}>
            <Interaction image={require('../assets/like-icon.png')} text={video.likeCount} style={styles.like} />
            <Interaction image={require('../assets/dislike-icon.png')} text={video.dislikeCount} style={styles.dislike} />
            <Interaction image={require('../assets/share-icon.png')} text={'Compartir'} style={styles.dislike} onPress={handleShare}/>
            <Interaction image={require('../assets/stardust-icon.png')} text={'Dona'} style={styles.dislike} />
          </View>
          <Text style={{ borderColor: colors.grayline, borderWidth: 0.3, height: 1, marginTop: 10 }} />
          <View style={styles.userContainer}>
            <View style={styles.listitem}>
              <ListItem
                avatar={video.creator.avatar}
                title={creatorTitle}
                subTitle={video.channelId.subscriberCount + ' seguidores'}
                showVerified={false}
              />
            </View>
            <View style={styles.vercanalContainer}>
              <AppButton title="Ver canal" style={styles.vercanal} onPress={() => navigation.navigate(routes.CREATOR_DETAILS, video)} />
            </View>
          </View>
          <Text style={{ borderColor: colors.grayline, borderWidth: 0.3, height: 1, marginBottom: 10 }} />
          <TouchableOpacity
              style={styles.commentcontainer}
              onPress={() => navigation.navigate(routes.VIDEO_COMMENTS, comments.comments)}>
              <View style={styles.commentcontainer2}>
                <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={require('../assets/comments-icon.png')} style={styles.commentsicon} />
                <AppText style={styles.comentariostitle}>{"Comentarios"}</AppText>
                </View>
                {/* Render totalComments only if it exists */}
                <AppText style={styles.commentAmount}>{comments?.comments?.length || 0}</AppText>
              </View>
              <View style={styles.randomComment}>
                {randomComment?.author?.avatar ? (
                  <Image source={{ uri: randomComment.author.avatar }} style={{ width: 20, height: 20, borderRadius: 10 }} />
                ) : (
                  <Image source={require('../assets/default-avatar-icon.jpeg')} style={{ width: 20, height: 20, borderRadius: 10 }} />
                )}
                <AppText numberOfLines={1} style={styles.randomCommentContent}>{randomComment?.content}</AppText>
              </View>
              <View>
                  <View style = {{backgroundColor: colors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 5, paddingVertical: 5,}}>
                    <AppText style = {{color: colors.grayline, fontSize: 14,}}>{"Dejar un comentario"}</AppText>
                  </View>
                </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.primary,
  },
  detailsContainer: {
    padding: 8,
  },
  title: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '900',
  },
  visitas: {
    color: colors.secondary,
    fontSize: 15,
    marginVertical: 3,
  },
  userContainer: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  interactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  like: {
    alignItems: 'center',
  },
  dislike: {
    alignItems: 'center',
  },
  vercanalContainer: {
    marginLeft: 'auto', // Aligns the button to the right
  },
  vercanal: {
    width: 125,
    height: 50,
    borderRadius: 25
  },
  commentcontainer: {
    backgroundColor: colors.graybox,
    width: '100%',
    height: 120,
    borderRadius: 10,
    padding: 8,
    marginBottom: 30,
  },
  commentcontainer2: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  comentariostitle: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 700,
    marginLeft: 10,
  },
  commentsicon: {
    width: 15,
    height: 15,
  },
  randomComment: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  commentAmount: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: 800,
  },
  randomCommentContent: {
    color: colors.white,
    fontSize: 12,
    alignItems: 'center',
    flexShrink: 1,
    marginLeft: 10,
  }
});

export default ListingDetailsScreen;
