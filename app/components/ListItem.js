import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppText from './AppText';
import colors from '../config/colors';
import { useEffect } from 'react';

function ListItem({ title, subTitle, avatar, showVerified, navigate }) {

  return (
    <View style={styles.container} >
      <TouchableOpacity style={styles.avatarContainer} onPress={navigate}>
        <Image style={styles.image} source={{ uri: avatar }}  />
      </TouchableOpacity>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerStreaming: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  userInfo: {
    marginLeft: 10,
    flex: 1,
  },
  avatarContainer: {
    borderRadius: 20,
    borderWidth: 2, // Set border width
    borderColor: 'transparent', // Initially transparent
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
    width: 15,
    height: 15,
    marginRight: 8,
  },
});

export default ListItem;
