import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Card from '../components/Card';
import routes from '../components/navigation/routes';
import useFormatViews from '../hooks/useFormatViews';
import streamsApi from '../api/streams';
import useApi from '../hooks/useApi';

function VideoItem({ item, index, navigation, replace }) {
  const { data: stream, request: loadStream } = useApi(() => streamsApi.getStreams(item.creator.username));

  useEffect(() => {
    if (item.isLiveStream) {
      loadStream();
    }
  }, [item.isLiveStream]);


  const formattedViews = useFormatViews(item.views);

  const subTitle = item.creator.username ? item.creator.username : item.creator.avatar;

  const uniqueKey = item.id + '-' + index;

  const handlePress = () => {
    if (item.isLiveStream) {
      navigation.navigate(routes.STREAM_DETAILS, { ...stream});
    } else {
      if (replace === 0) {
        navigation.push(routes.VIDEO_DETAILS, { ...item });
      } else {
        navigation.replace(routes.VIDEO_DETAILS, { ...item });
      }
    }
  };

  return (
    <Card
      key={uniqueKey}
      title={item.title}
      subTitle={subTitle}
      thumbnail={item.thumbnail}
      views={formattedViews}
      avatar={item.creator.avatar}
      onPress={handlePress}
      duration={item.duration}
      subsOnly={item.subscribersOnly}
      creator={item.creator}
    />
  );
}

export default VideoItem;
