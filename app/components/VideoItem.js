import React from 'react';
import { StyleSheet } from 'react-native';
import Card from '../components/Card';
import routes from '../components/navigation/routes';
import useFormatViews from '../hooks/useFormatViews';

function VideoItem({ item, navigation }) {
  const formattedViews = useFormatViews(item.views);

  // Use the creator's username if available, otherwise use the avatar
  const subTitle = item.creator.username ? item.creator.username : item.creator.avatar;

  return (
    <Card
      title={item.title}
      subTitle={subTitle}
      thumbnail={item.thumbnail}
      views={formattedViews}
      avatar={item.creator.avatar}
      onPress={() => navigation.navigate(routes.VIDEO_DETAILS, item)}
      duration={item.duration}
    />
  );
}

export default VideoItem;
