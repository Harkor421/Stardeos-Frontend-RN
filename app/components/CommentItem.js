import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import AppText from './AppText';
import { LinearGradient as Gradient } from 'react-native-linear-gradient'; // Renaming LinearGradient to Gradient

import colors from '../config/colors';
import useTimeAgo from '../hooks/useTimeAgo';
import { TouchableOpacity } from 'react-native-gesture-handler';

function CommentItem({ title, subTitle, avatar, date, stardustamount }) {
  const elapsedTime = useTimeAgo(date);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={avatar} />
      <View style={styles.userInfo}>
        <View style={styles.userbox}>
          {/* Conditional rendering for title with text gradient */}
          {stardustamount > 0 ? (
              <AppText style={styles.userpaid}>{title}</AppText>
          ) : (
            <AppText style={styles.user}>{title}</AppText>
          )}
          {/* Conditional rendering for stardustcontainer */}
          {stardustamount > 0 && (
            <View style={styles.stardustcontainer}>
              <Image style={{ width: 15, height: 15, marginRight: 5 }} source={require('../assets/verified-icon.png')} />
              <AppText style={styles.stardust_text}>{stardustamount}</AppText>
            </View>
          )}
        </View>
        <AppText style={styles.date}>{elapsedTime}</AppText>
        <View style={styles.usernamecontainer}>
          <AppText style={styles.subTitle}>{subTitle}</AppText>
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
    alignItems: 'center'
  },
  userbox:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  stardustcontainer:{
    flexDirection: 'row',
    backgroundColor: colors.lightgray,
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal:12,
    paddingVertical: 2,

  },
  stardust_text:{
    color: colors.white,
    fontWeight: 700,
    fontSize: 12,
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
  },
  user: {
    color: colors.white,
    fontWeight: '400',
    fontSize: 18,
    marginRight: 15,
  },
  userpaid: {
    color: colors.white,
    fontWeight: '900',
    fontSize: 18,
    marginRight: 15,
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
