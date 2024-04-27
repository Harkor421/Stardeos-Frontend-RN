import { useCallback } from 'react';
import { Share } from 'react-native';

const useShareVideo = (video) => {
  const handleShare = useCallback(async () => {
    try {
      const result = await Share.share({
        message: `Mira este video de: ${video.channelId.displayName} https://stardeos.com/video/${video.id}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared via activity type
        } else {
          // Shared
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
      }
    } catch (error) {
      alert('Error sharing video');
    }
  }, [video]);

  return handleShare;
};

export default useShareVideo;
