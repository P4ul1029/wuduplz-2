import { StyleSheet, useWindowDimensions, SafeAreaView, KeyboardAvoidingView} from 'react-native'
import React, { useState } from 'react'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import MyRequests from './MyRequests'
import Explore from './Explore';

const FirstRoute = () => (
  <SafeAreaView style={{flex: 1}}>
    <Explore />
  </SafeAreaView>
);

const SecondRoute = () => (
  <SafeAreaView style={{flex: 1}}>
    <MyRequests />
  </SafeAreaView>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const renderTabBar = props => (
  <SafeAreaView style={{ backgroundColor: '#6200ee' }}>
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: '#6200ee' }}
  />
  </SafeAreaView>
);

function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Explore Requests' },
    { key: 'second', title: 'My Requests' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

const Requests = () => {
  return (
    <TabViewExample />
  )
}

export default Requests

const styles = StyleSheet.create({})