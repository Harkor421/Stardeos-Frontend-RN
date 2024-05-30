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
import useRandomComment from '../hooks/useRandomComment';
import useShareVideo from '../hooks/useShareVideo';
import RandomList from './RandomList';
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons from Expo Icons library
import { setIsEnabledAsync } from 'expo-av/build/Audio';
import GradientBorderButton from '../components/GradientBorderButton';
import FollowButton from '../components/FollowButton';

function ListingDetailsScreen({ route, navigation }) {
  const video = route.params;
  
  const [reloadKey, setReloadKey] = useState(Date.now());
  const [videoLoad, setVideoLoad] = useState(true);
  const [likeCount, setLikeCount] = useState(video.likeCount || 0);
  const [dislikeCount, setDisLikeCount] = useState(video.dislikeCount || 0);

  const [liked, setLiked] = useState(undefined);
  const [loader, setLoader] = useState(false);
  const [showDescription, setShowDescription] = useState(false); // Step 1
  const videoRef = React.useRef(null);

  const { data: selectedvideo, error, loading: videoLoading, request: loadVideo } = useApi(() => videosApi.getVideo(video.id), [reloadKey]);
  const { data: comments, loading: commentsLoading, request: loadComments } = useApi(() => videosApi.getComments(video.id), [reloadKey]);

  useEffect(() => {
    loadVideo();
    loadComments();
    const unsubscribe = navigation.addListener('blur', () => {
      if (videoRef.current) {
        videoRef.current.pauseAsync();
      }
    });
    return unsubscribe;
  }, [navigation, reloadKey]);

  const handleLikeDislike = async (type) => {
    setLoader(true);
    const data = { video: video.id };

    if (type === "likes" && (typeof liked === "undefined" || liked === -1 || liked === 0)) {
      await videosApi.markLikeOrDislike(data, "like");
      setLikeCount((prev) => (prev !== null ? prev + 1 : 1));
      setDisLikeCount((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
      setLiked(1);
    } else if (type === "dislikes" && (typeof liked === "undefined" || liked === 1 || liked === 0)) {
      await videosApi.markLikeOrDislike(data, "dislike");
      setDisLikeCount((prev) => (prev !== null ? prev + 1 : 1));
      setLikeCount((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
      setLiked(-1);
    }

    setLoader(false);
  };

  const toggleDescription = () => {
    navigation.navigate(routes.VIDEO_DESCRIPTION,  video.description);
  };


  const formattedDate = useDateFormat(video.createdAt);
  const formattedViews = useFormatViews(video.views);
  const formattedFollowers = useFormatViews(video.channelId.subscriberCount);
  const randomComment = useRandomComment(comments?.comments);
  const handleShare = useShareVideo(video);
  const fileUrls = selectedvideo?.files?.map(file => file.fileUrl) || [];
  const creatorTitle = video.channelId.displayName ? video.channelId.displayName : video.creator.username;
  const windowWidth = Dimensions.get('window').width;
  const aspectRatio = selectedvideo?.files?.[0]?.aspectRatio || 16 / 9;
  const videoHeight = windowWidth / aspectRatio;


  return (
    <Screen style={styles.page}>
      <ScrollView>
        <View>
          <Video
            ref={videoRef}
            source={{ uri: fileUrls[0] }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode={ResizeMode.COVER}
            style={{ width: windowWidth, height: videoHeight }}
            useNativeControls
            shouldPlay
            shouldRasterizeIOS
            onReadyForDisplay={() => setVideoLoad(false)}
          />
          <ActivityIndicator visible={videoLoading || commentsLoading || videoLoad} />
        </View>
        <View style={styles.detailsContainer}>
        <TouchableOpacity onPress={toggleDescription} style={styles.titleContainer}>
            <AppText style={styles.title}>{video.title}</AppText>
            {showDescription ? (
              <MaterialIcons name="keyboard-arrow-up" size={24} color={colors.white} />
            ) : (
              <MaterialIcons name="keyboard-arrow-down" size={24} color={colors.white} />
            )}
          </TouchableOpacity>
          <AppText style={styles.visitas}>{formattedViews} visitas • {formattedDate}</AppText>
          <View style={styles.interactions}>
            <Interaction
              image={require('../assets/like-icon.png')}
              text={likeCount}
              style={styles.like}
              onPress={() => handleLikeDislike("likes")}
            />
            <Interaction
              image={require('../assets/dislike-icon.png')}
              text={dislikeCount}
              style={styles.dislike}
              onPress={() => handleLikeDislike("dislikes")}
            />
            <Interaction
              image={require('../assets/share-icon.png')}
              text={'Compartir'}
              style={styles.dislike}
              onPress={handleShare}
            />
            <Interaction
            image={require('../assets/stardust-icon.png')}
            text={selectedvideo.stardusts !== null ? selectedvideo.stardusts : 0}
            style={styles.dislike}
            />
          </View>
          <Text style={styles.separator} />
          <View style={styles.userContainer}>
            <View style={styles.listItemContainer}>
              <ListItem
                avatar={video.creator.avatar}
                title={creatorTitle}
                subTitle={`${formattedFollowers} seguidores`}
                showVerified={false}
                navigate={() => navigation.navigate(routes.CREATOR_DETAILS, video)}
                creator ={video.creator}
              />
            </View>
            <View style={styles.followButtonContainer}>
              <FollowButton styles = {styles.followButton} channelId={video.channelId.id}/>
            </View>
          </View>
          <Text style={styles.separator} />
          <TouchableOpacity
  style={styles.commentContainer}
  onPress={() => navigation.navigate(routes.VIDEO_COMMENTS, { comments: comments.comments, videoId: video.id, setStardust: video.stardusts })}>
  <View style={styles.commentHeader}>
    <View style={styles.commentTitleContainer}>
      <Image source={require('../assets/comments-icon.png')} style={styles.commentsIcon} />
      <AppText style={styles.commentsTitle}>{"Comentarios"}</AppText>
    </View>
    <AppText style={styles.commentAmount}>{comments?.comments?.length || 0}</AppText>
  </View>
  <View style={styles.randomComment}>
    {randomComment?.author?.avatar ? (
      <Image source={{ uri: randomComment.author.avatar }} style={styles.commentAvatar} />
    ) : (
      <Image source={require('../assets/default-avatar-icon.jpeg')} style={styles.commentAvatar} />
    )}
    <AppText numberOfLines={1} style={styles.randomCommentContent}>{randomComment?.content}</AppText>
  </View>
  <View style={styles.leaveCommentButton}>
    <AppText style={styles.leaveCommentText}>{"Dejar un comentario"}</AppText>
  </View>
</TouchableOpacity>
          <AppText style={styles.moreVideosTitle}>{"Más videos"}</AppText>
        </View>
        <RandomList navigation={navigation} />
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '900',
  },
  transparentBackground: {
    backgroundColor: colors.primary, // Adjust the alpha channel for transparency
  },
  visitas: {
    color: colors.secondary,
    fontSize: 15,
    marginVertical: 3,
  },
  userContainer: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  interactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  like: {
    alignItems: 'center',
  },
  dislike: {
    alignItems: 'center',
  },
  followButtonContainer: {
    alignItems:'flex-end',
    flex: 1,
  },
  followButton: {
    width: "80%",
  },
  commentContainer: {
    marginTop: 20,
    backgroundColor: colors.graybox,
    width: '100%',
    height: 120,
    borderRadius: 10,
    padding: 8,
    marginBottom: 30,
  },
  commentHeader: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentsIcon: {
    width: 15,
    height: 15,
  },
  commentsTitle: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 10,
  },
  commentAmount: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: '800',
  },
  randomComment: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  commentAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  randomCommentContent: {
    color: colors.white,
    fontSize: 12,
    flexShrink: 1,
    marginLeft: 10,
  },
  leaveCommentButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingVertical: 5,
  },
  leaveCommentText: {
    color: colors.grayline,
    fontSize: 14,
  },
  moreVideosTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 30,
  },
  separator: {
    borderColor: colors.grayline,
    borderWidth: 0.3,
    height: 1,
  },
  listItemContainer: {
    flex: 1,
    alignItems: 'center',
  },

});

export default ListingDetailsScreen;
