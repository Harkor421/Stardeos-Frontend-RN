import React from 'react';
import { StyleSheet } from 'react-native';
import Card from '../components/Card';
import routes from '../components/navigation/routes';
import useFormatViews from '../hooks/useFormatViews';

function VideoItem({ item, index, navigation, replace }) {
  const formattedViews = useFormatViews(item.views);

  // Use the creator's username if available, otherwise use the avatar
  const subTitle = item.creator.username ? item.creator.username : item.creator.avatar;

  // Generate a unique key by concatenating the item's id with its index
  const uniqueKey = item.id + '-' + index;

  const handlePress = () => {
    if (item.isLiveStream) {
      // Handle logic for live stream
      // For example, navigate to a different route
      navigation.navigate(routes.STREAM_DETAILS, { ...item });
    } else {
      // Handle logic for regular video
      // Use the 'replace' prop to determine whether to replace the current screen or not
      if (replace === 0) {
        navigation.push(routes.VIDEO_DETAILS, { ...item });
      } else {
        navigation.replace(routes.VIDEO_DETAILS, { ...item });
      }
    }
  };

  return (
    <Card
      key={uniqueKey} // Set a unique key for each item
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
