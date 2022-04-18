import * as React from 'react';
import { View } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';

import VideoFeed from '../screens/VideoFeed';
import Explore from '../screens/Explore';
import MyRequests from '../screens/MyRequests';
import Profile from '../screens/Profile';

const VideoFeedRoute = () => <VideoFeed/>

const ExploreRoute = () => <Explore/>

const MyRequestsRoute = () => <MyRequests/>

const ProfileRoute = () => <Profile/>

const BottomNavbar = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'videoFeed', title: 'Video Feed', icon: 'video' },
    { key: 'explore', title: 'Explore', icon: 'feature-search-outline' },
    { key: 'myRequests', title: 'My Requests', icon: 'message-video' },
    { key: 'profile', title: 'Profile', icon: 'account' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    videoFeed: VideoFeedRoute,
    explore: ExploreRoute,
    myRequests: MyRequestsRoute,
    profile: ProfileRoute,
  });

  return (
    <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
    />
  );
};

export default BottomNavbar;