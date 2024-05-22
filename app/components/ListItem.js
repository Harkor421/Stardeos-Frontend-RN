import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppText from './AppText';
import colors from '../config/colors';

function ListItem({ title, subTitle, avatar, showVerified, navigate }) {
  return (
    <TouchableOpacity style={styles.container} onPress={navigate}>
      <Image style={styles.image} source={{ uri: avatar }} />
      <View style={styles.userInfo}>
        <AppText style={styles.user} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </AppText>
        <View style={styles.usernameContainer}>
          {showVerified && <Image style={styles.verifiedIcon} source={require('../assets/verified-icon.png')} />}
          <AppText style={styles.subTitle} numberOfLines={1} ellipsizeMode="tail">
            {subTitle}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: 10,
    flex: 1,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  user: {
    color: colors.white,
    fontWeight: '900',
    fontSize: 15,
    marginBottom: 2,
  },
  subTitle: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: '900',
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedIcon: {
    width: 12,
    height: 12,
    marginRight: 8,
  },
});

export default ListItem;
