import React, { useState } from 'react';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { Platform, View, StyleSheet } from 'react-native';

function BannerAdComponent({ style }) {
  const [adLoaded, setAdLoaded] = useState(false);
  let bannerId;

  if (Platform.OS === 'android') {
    bannerId = 'ca-app-pub-2801407808045625/5458692614'; // ID for Android
  } else {
    bannerId = 'ca-app-pub-2801407808045625/1919863314'; // ID for iOS
  }

  return (
    <View style={[styles.adContainer, style, !adLoaded && styles.hidden]}>
      <BannerAd
        unitId={bannerId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => setAdLoaded(true)}
        onAdFailedToLoad={() => setAdLoaded(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  hidden: {
    height: 0,
    overflow: 'hidden',
  },
  adContainer: {
    marginVertical: 20,
    alignItems: 'center',
    width: '100%', // Ensure it takes the full width
  },
});

export default BannerAdComponent;
