import { useState, useEffect } from 'react';
import subsApi from '../api/paidSubscription';
import useApi from './useApi';

const useSubscription = (channelId, videoloading) => {
  const { data: activesubs, loading: subsloading, request: getPaidSubs } = useApi(() => subsApi.getSubscriptions());
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        await getPaidSubs();
        if (!subsloading && Array.isArray(activesubs)) {
          console.log("active", activesubs)
          const isSubscribedToChannel = activesubs.some((sub) => sub.channel === channelId);
          setIsSubscribed(isSubscribedToChannel);
          console.log("IS SUBBED", isSubscribedToChannel);
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
      }
    };

    if (videoloading) {
      checkSubscription();
    }
  }, [videoloading]); 

  return isSubscribed;
};

export default useSubscription;
