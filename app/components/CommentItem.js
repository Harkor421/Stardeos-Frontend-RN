import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import AppText from './AppText';

import colors from '../config/colors';
import useTimeAgo from '../hooks/useTimeAgo';

function CommentItem({ title, subTitle, avatar, date }) {
  const elapsedTime = useTimeAgo(date);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={avatar} />
      <View style={styles.userInfo}>
        <AppText style={styles.user}>
          {title}
        </AppText>
        <AppText style={styles.date}>
          {elapsedTime}
        </AppText>
        <View style={styles.usernamecontainer}>
          <AppText style={styles.subTitle}>
            {subTitle}
          </AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 30,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
    marginTop: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    marginTop: 10,
  },
  user: {
    color: colors.white,
    fontWeight: '900',
    fontSize: 18,
  },
  date: {
    color: colors.secondary,
    fontSize: 12,
  },
  subTitle: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '900',
    marginTop: 5,
  },
  usernamecontainer: {
    flexDirection: 'row',
    marginTop: 3,
    alignItems: 'center',
  },
  verifiedicon: {
    width: 12,
    height: 12,
    marginRight: 8,
  },
});

export default CommentItem;
