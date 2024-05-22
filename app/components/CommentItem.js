import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import AppText from './AppText';
import colors from '../config/colors';
import useTimeAgo from '../hooks/useTimeAgo';

function CommentItem({ title, subTitle, avatar, date, stardustamount }) {
  const elapsedTime = useTimeAgo(date);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={avatar} />
      <View style={styles.contentContainer}>
        <View style={styles.userDetails}>
          <View style={styles.userbox}>
            {stardustamount > 0 ? (
              <AppText style={styles.userpaid}>{title}</AppText>
            ) : (
              <AppText style={styles.user}>{title}</AppText>
            )}
            {stardustamount > 0 && (
              <View style={styles.stardustcontainer}>
                <Image style={styles.verifiedicon} source={require('../assets/verified-icon.png')} />
                <AppText style={styles.stardust_text}>{stardustamount}</AppText>
              </View>
            )}
          </View>
          <AppText style={styles.date}>{elapsedTime}</AppText>
        </View>
        <AppText style={styles.subTitle}>{subTitle}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 10,
  },
  userDetails: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  userbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stardustcontainer: {
    flexDirection: 'row',
    backgroundColor: colors.lightgray,
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 2,
    marginLeft: 10,
  },
  stardust_text: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 12,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  user: {
    color: colors.white,
    fontWeight: '400',
    fontSize: 18,
  },
  userpaid: {
    color: colors.white,
    fontWeight: '900',
    fontSize: 18,
  },
  date: {
    color: colors.secondary,
    fontSize: 12,
    marginBottom: 3,
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
    width: 15,
    height: 15,
    marginRight: 5,
  },
});

export default CommentItem;
