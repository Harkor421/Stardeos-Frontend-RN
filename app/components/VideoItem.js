import React from 'react';
import { StyleSheet } from 'react-native';
import Card from '../components/Card';
import routes from '../components/navigation/routes';
import useFormatViews from '../hooks/useFormatViews';

function VideoItem({ item, navigation }) {
  const formattedViews = useFormatViews(item.views);

  return (
    <Card
      title={item.title}
      subTitle={item.creator.username}
      thumbnail={item.thumbnail}
      views={formattedViews}
      avatar={item.creator.avatar}
      onPress={() => navigation.navigate(routes.VIDEO_DETAILS, item)}
    />
  );
}

export default VideoItem;
