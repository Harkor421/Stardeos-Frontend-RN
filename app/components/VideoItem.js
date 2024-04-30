import React from 'react';
import { StyleSheet } from 'react-native';
import Card from '../components/Card';
import routes from '../components/navigation/routes';
import useFormatViews from '../hooks/useFormatViews';

function VideoItem({ item, index, navigation }) {
  const formattedViews = useFormatViews(item.views);

  // Use the creator's username if available, otherwise use the avatar
  const subTitle = item.creator.username ? item.creator.username : item.creator.avatar;

  // Generate a unique key by concatenating the item's id with its index
  const uniqueKey = item.id + '-' + index;

  return (
    <Card
      key={uniqueKey} // Set a unique key for each item
      title={item.title}
      subTitle={subTitle}
      thumbnail={item.thumbnail}
      views={formattedViews}
      avatar={item.creator.avatar}
      onPress={() => navigation.navigate(routes.VIDEO_DETAILS, item)}
      duration={item.duration}
      subsOnly={item.subscribersOnly}
    />
  );
}

export default VideoItem;
