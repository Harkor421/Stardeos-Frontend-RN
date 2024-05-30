import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import GradientBorderButton from './GradientBorderButton'; // Assuming this is the correct path
import subscriptionApi from '../api/subscription'; // Importing API functions
import useApi from '../hooks/useApi';

function FollowButton({ styles, channelId }) {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const { data: follows, loading: followload, request: loadFollows } = useApi(() => subscriptionApi.findAllSubscriptions());

    useEffect(() => {
        loadFollows();
    }, []);

    useEffect(() => {
        if (!followload) {
            const isSubscribedToChannel = follows.some(sub => sub.subscribedTo === channelId);
            setIsSubscribed(isSubscribedToChannel);
        }
    }, [follows, followload]);

    const handleFollow = async () => {
        try {
            const response = await subscriptionApi.follow({channel: channelId});
            console.log(response);
            setIsSubscribed(true);
        } catch (error) {
            console.error("Error while following:", error);
        }
    };

    const handleUnfollow = async () => {
        try {
            const response = await subscriptionApi.unfollow({channelId});
            console.log(response);
            setIsSubscribed(false);
        } catch (error) {
            console.error("Error while unfollowing:", error);
        }
    };

    if (followload) {
        return <ActivityIndicator size="small" color="#0000ff" />;
    }

    return (
            <GradientBorderButton 
                title={isSubscribed ? "Siguiendo" : "Seguir"} 
                style={styles} 
                onPress={isSubscribed ? handleUnfollow : handleFollow} 
            />
    );
}


export default FollowButton;
