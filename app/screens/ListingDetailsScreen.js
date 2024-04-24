import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AppText from '../components/AppText';
import ListItem from '../components/ListItem';
import Screen from '../components/Screen';
import colors from '../config/colors';
import Interaction from '../components/Interaction';
import { Video, ResizeMode} from 'expo-av';
import useApi from '../hooks/useApi';
import videosApi from '../api/videos'
import { useEffect, useContext } from 'react';
import AuthContext from '../auth/context';
import AppButton from '../components/AppButton';
import { ScrollView } from 'react-native-gesture-handler';


function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate.replace(/(\w+) (\d+),/, '$1 $2,');
}

function ListingDetailsScreen({ route }) {
  const video = route.params;
  const formattedDate = formatDate(video.createdAt);
  const { user } = useContext(AuthContext);

  const { data: selectedvideo, error, loading, request: loadVideo } = useApi(() => videosApi.getVideo(video.id));


    
    useEffect(() =>{
        loadVideo();
    }, []);

    const fileUrls = selectedvideo?.files?.map(file => file.fileUrl) || [];
    
    console.log(fileUrls);
  return (
    <Screen style={styles.page}>
      <Video
        source={{ uri: fileUrls[0]}} // Use your video URL here
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
        <AppText style={styles.visitas}>{video.views + ' visitas • ' + formattedDate}</AppText>
        <View style={styles.interactions}>
          <Interaction image={require('../assets/like-icon.png')} text={video.likeCount} style={styles.like} />
          <Interaction image={require('../assets/dislike-icon.png')} text={video.dislikeCount} style={styles.dislike} />
          <Interaction image={require('../assets/share-icon.png')} text={'Compartir'} style={styles.dislike} />
          <Interaction image={require('../assets/stardust-icon.png')} text={'Dona'} style={styles.dislike} />
        </View>
        <Text style={{ borderColor: colors.grayline, borderWidth: 0.3, height: 1, marginTop: 10}} />
        <View style={styles.userContainer}>
        <View style = {styles.listitem}>
          <ListItem
            avatar={video.creator.avatar}
            title={video.channelId.displayName}
            subTitle={video.channelId.subscriberCount + ' seguidores'}
            showVerified={false}
          />
          </View>
          <View style = {styles.viewchannel}>
          <AppButton title = "Ver canal" style = {styles.vercanal}/>
          </View>
        </View>
        <Text style={{ borderColor: colors.grayline, borderWidth: 0.3, height: 1, marginBottom: 10 }} />
        <TouchableOpacity style = {styles.commentcontainer}>
            <View style = {styles.commentcontainer2}>
            <AppText style = {styles.comentariostitle}>{"Comentarios"}</AppText>
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
    height: '38%',
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
  vercanal:{
    width: 125,
    height: 50,
    borderRadius: 25,
  },
  
  viewchannel:{
    marginLeft: 'auto'
  },
  commentcontainer:{
    backgroundColor: colors.graybox,
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  commentcontainer2:{
    padding: 10,
  },
  comentariostitle:{
    color: colors.white,
    fontWeight: 600,
    fontSize: 14,
  }
 
});

export default ListingDetailsScreen;
