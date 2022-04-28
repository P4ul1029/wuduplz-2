import * as React from 'react';
import { View } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import VideoFeed from '../screens/responses/VideoFeed';
import Requests from '../screens/requests/Requests';
import Profile from '../screens/profile/Profile';

const BottomNavbar = () => {
  const VideoFeedRoute = () => index == 0 ? <VideoFeed/> : <View></View>
  const MyRequestsRoute = () => <Requests/>
  const ProfileRoute = () => <Profile/>

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'videoFeed', title: 'Video Feed', icon: 'video' },
    { key: 'requests', title: 'Requests', icon: 'message-video' },
    { key: 'profile', title: 'Profile', icon: 'account' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    videoFeed: VideoFeedRoute,
    requests: MyRequestsRoute,
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