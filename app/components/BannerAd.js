import React from 'react';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { Platform, View } from 'react-native';

function BannerAdComponent({style }) {
  let bannerId;

  // Check the platform and set the test ad unit ID accordingly
  if (__DEV__) {
    if (Platform.OS === 'android') {
      bannerId = '23'; // ID for Android
    } else {
      bannerId ='ca-app-pub-2801407808045625/1919863314'; //ID for iOS
    }
  }

  return (
    <View style={style}>
        <BannerAd
        unitId={bannerId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
            requestNonPersonalizedAdsOnly: true,
        }}
        />
    </View>
  );
}

export default BannerAdComponent;
