import React, { useContext, useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Image, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect } from 'react';
import colors from '../../config/colors';
import AppText from '../AppText';
import AuthContext from '../../auth/context';
import AppTextInput from '../AppTextInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import routes from './routes';
import FeedNavigator from './FeedNavigator';
import notificationsApi from '../../api/notifications';
import useApi from '../../hooks/useApi';

const Header = ({ navigation }) => {
  const { user, updateUser } = useContext(AuthContext);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [hasNotifications, setHasNotifications] = useState(false);

  const handleSearchIconPress = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchSubmit = () => {
  setIsSearchOpen(false);
  navigation.navigate('SearchedVideos', { search: searchText });
};

  const { data: notifications, error, loading, request: loadNotifications } = useApi(() => notificationsApi.getNotifications());

  useEffect(() => {
      loadNotifications();
      updateUser();
      console.log(notifications);
  }, []);
  
  useEffect(() => {
    if (notifications && notifications.notifications) {
      setHasNotifications(notifications.notifications.length > 0);
    }
  }, [notifications]);

  return (
    <SafeAreaView style={styles.headerContainer}>
      {/* Stardeos */}
      <TouchableOpacity style={styles.stardeos} onPress= {() => navigation.navigate(routes.VIDEO_LIST)}>
        <Image source={require('../../assets/stardeos-logo.png')} style={styles.stardeoslogo} />
        <Image source={require('../../assets/stardeos-letters.png')} style={styles.stardeosletters} />
      </TouchableOpacity>
      {/* Spacing */}
      <View style={styles.spacing} />

      {/* Stardusts */}
      <TouchableOpacity style={styles.stardusts} onPress={() => navigation.navigate('Stardust', user.data.user.stardusts)}>
        <AppText style={styles.stardustcount}>{user.data.user.stardusts ? user.data.user.stardusts : 0}</AppText>
        <Image source={require('../../assets/stardust-icon.png')} style={styles.stardusticon} />
      </TouchableOpacity>

      {/* Bell */}
      <TouchableOpacity onPress={() => navigation.navigate('Notifications', notifications)}>
        <MaterialCommunityIcons name="bell" size={22} color="white" />
        {hasNotifications && <View style={styles.notificationBubble} />}
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
            placeholderTextColor={colors.grayline}
            autoFocus
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearchSubmit}
          />
        </View>
      )}

      {/* Spacing */}
      <View style={styles.spacing} />

      {/* Avatar */}
      <TouchableOpacity onPress={() => navigation.navigate('Account')}>
        <Image style={styles.avatar} source={user.data.user.avatar ? { uri: user.data.user.avatar } : require('../../assets/default-avatar-icon.jpeg')}/>
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
    paddingVertical: 15,
    alignSelf: 'stretch',
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
    paddingHorizontal: 8,
    backgroundColor: colors.headerblue,
  },
  searchInput: {
    height: 15, // Increased height
    borderWidth: 1,
    borderColor: colors.gray,
    color: colors.white,
    paddingHorizontal: 10, // Added padding
    borderRadius: 10, // Added border radius
  },
  notificationBubble: {
    position: 'absolute',
    right: -1,
    backgroundColor: 'red',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  
});

export default Header;
