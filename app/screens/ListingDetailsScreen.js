import React, { useState, useEffect, useContext } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import AppText from '../components/AppText';
import ListItem from '../components/ListItem';
import Screen from '../components/Screen';
import colors from '../config/colors';
import Interaction from '../components/Interaction';
import { Video, ResizeMode } from 'expo-av';
import useApi from '../hooks/useApi';
import videosApi from '../api/videos';
import AuthContext from '../auth/context';
import AppButton from '../components/AppButton';
import routes from '../components/navigation/routes';
import useDateFormat from '../hooks/useDateFormat';
import useFormatViews from '../hooks/useFormatViews';
import ActivityIndicator from '../components/ActivityIndicator';
import VideoPlayer from '../components/VideoPlayer';

function ListingDetailsScreen({ route, navigation, key }) {
  const video = route.params;
  const formattedDate = useDateFormat(video.createdAt);
  const formattedViews = useFormatViews(video.views);

  // Use loading state from useApi hook for both video and comments
  const [reloadKey, setReloadKey] = useState(key); // State to trigger component reload
  const { data: selectedvideo, error, loading: videoLoading, request: loadVideo } = useApi(() => videosApi.getVideo(video.id), [reloadKey]);
  const { data: comments, loading: commentsLoading, request: loadComments } = useApi(() => videosApi.getComments(video.id), [reloadKey]);

  useEffect(() => {
    loadVideo();
    loadComments();
  }, [reloadKey]); // Reload when reloadKey changes

  const totalComments = comments?.comments?.length || 0;
  const randomIndex = Math.floor(Math.random() * totalComments);
  const randomComment = comments?.comments?.[randomIndex];

  const fileUrls = selectedvideo?.files?.map(file => file.fileUrl) || [];
  const creatorTitle = video.channelId.displayName ? video.channelId.displayName : video.creator.username;

  // Add navigation listener to update the reloadKey when navigating back to this screen
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setReloadKey(Date.now()); // Update reloadKey with current timestamp
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Screen style={styles.page}>
      <ActivityIndicator visible={videoLoading || commentsLoading} />
      <Video
        source={{ uri: fileUrls[0] }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={ResizeMode.COVER}
        style={styles.video}
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
          <Interaction image={require('../assets/share-icon.png')} text={'Compartir'} style={styles.dislike} />
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
          <View style={styles.viewchannel}>
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
            <AppText style={styles.commentAmount}>{totalComments}</AppText>
          </View>
          <View style={styles.randomComment}>
            {randomComment?.author?.avatar ? (
              <Image source={{ uri: randomComment.author.avatar }} style={{ width: 20, height: 20, borderRadius: 10 }} />
            ) : (
              <Image source={require('../assets/default-avatar-icon.jpeg')} style={{ width: 20, height: 20, borderRadius: 10 }} />
            )}
            <AppText numberOfLines={1} style={styles.randomCommentContent}>{randomComment?.content}</AppText>
          </View>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.primary,
  },
  video: {
    width: '100%',
    flex: 0.8,
    borderRadius: 10,
  },
  detailsContainer: {
    padding: 8,
  },
  image: {
    width: '100%',
    height: 200,
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
  vercanal: {
    width: 125,
    height: 50,
    borderRadius: 25,
  },

  viewchannel: {
    marginLeft: 'auto'
  },
  commentcontainer: {
    backgroundColor: colors.graybox,
    width: '100%',
    height: 120,
    borderRadius: 10,
    padding: 8,
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
