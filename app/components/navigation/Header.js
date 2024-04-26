import React, { useContext, useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Image, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../../config/colors';
import AppText from '../AppText';
import AuthContext from '../../auth/context';
import AppTextInput from '../AppTextInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import routes from './routes';
import FeedNavigator from './FeedNavigator';
import LatestFeedNavigator from './LatestFeedNavigator';

const Header = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchIconPress = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <SafeAreaView style={styles.headerContainer}>
      {/* Stardeos */}
      <View style={styles.stardeos}>
        <Image source={require('../../assets/stardeos-logo.png')} style={styles.stardeoslogo} />
        <Image source={require('../../assets/stardeos-letters.png')} style={styles.stardeosletters} />
      </View>
      {/* Spacing */}
      <View style={styles.spacing} />

      {/* Stardusts */}
      <TouchableOpacity style={styles.stardusts}>
        <AppText style={styles.stardustcount}>{user.data.user.stardusts}</AppText>
        <Image source={require('../../assets/stardust-icon.png')} style={styles.stardusticon} />
      </TouchableOpacity>

      {/* Bell */}
      <TouchableOpacity onPress={() => navigation.navigate('Screen1')}>
        <MaterialCommunityIcons name="bell" size={22} color="white" />
      </TouchableOpacity>

      {/* Spacing */}
      <View style={styles.spacing} />

      {/* Magnify */}
      <TouchableOpacity onPress={handleSearchIconPress}>
        <MaterialCommunityIcons name="magnify" size={22} color="white" />
      </TouchableOpacity>

      {/* Search Input */}
      {isSearchOpen && (
        <View style={styles.searchInputContainer}>
          <AppTextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor={colors.gray}
            autoFocus
            returnKeyType="search"
            onSubmitEditing={() => navigation.navigate('SearchedVideoList')}
          />
        </View>
      )}

      {/* Spacing */}
      <View style={styles.spacing} />

      {/* Avatar */}
      <TouchableOpacity onPress={() => navigation.navigate('Account')}>
        <Image style={styles.avatar} source={{ uri: user.data.user.avatar }} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 11,
    alignItems: 'center',
    backgroundColor: colors.headerblue,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayline,
  },
  stardeos: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stardeoslogo: {
    width: 27.5,
    height: 27.5,
  },
  stardeosletters: {
    width: 88,
    height: 22,
    marginLeft: 5.5,
  },
  stardusts: {
    backgroundColor: '#1f233e',
    flexDirection: 'row',
    borderRadius: 11,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 11,
  },
  stardusticon: {
    width: 22,
    height: 22,
    marginLeft: 5.5,
    marginRight: 5,
  },
  stardustcount: {
    color: colors.white,
    fontSize: 17.6,
    fontWeight: 'bold',
    marginLeft: 8.8,
    marginRight: 5.5,
  },
  avatar: {
    width: 33,
    height: 33,
    borderRadius: 22,
  },
  spacing: {
    width: 11,
  },
  searchInputContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    paddingHorizontal: 11,
    backgroundColor: colors.headerblue,
  },
  searchInput: {
    height: 10, // Increased height
    borderWidth: 1,
    borderColor: colors.gray,
    color: colors.white,
    paddingHorizontal: 10, // Added padding
    borderRadius: 10, // Added border radius
  },
  
});

export default Header;
