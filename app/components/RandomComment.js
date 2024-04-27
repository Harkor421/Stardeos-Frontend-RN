import React from 'react';
import { View, Image } from 'react-native';
import AppText from '../components/AppText';
import colors from '../config/colors';

const RandomComment = ({ randomComment }) => {
  return (
    <View style={styles.randomComment}>
      {randomComment?.author?.avatar ? (
        <Image source={{ uri: randomComment.author.avatar }} style={{ width: 20, height: 20, borderRadius: 10 }} />
      ) : (
        <Image source={require('../assets/default-avatar-icon.jpeg')} style={{ width: 20, height: 20, borderRadius: 10 }} />
      )}
      <AppText numberOfLines={1} style={styles.randomCommentContent}>{randomComment?.content}</AppText>
    </View>
  );
};

const styles = {
  randomComment: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  randomCommentContent: {
    color: colors.white,
    fontSize: 12,
    alignItems: 'center',
    flexShrink: 1,
    marginLeft: 10,
  }
};

export default RandomComment;
