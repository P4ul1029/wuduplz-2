import { StyleSheet, Text, View, useWindowDimensions} from 'react-native'
import React from 'react'
import { TabView, SceneMap } from 'react-native-tab-view';
import Requests from './Requests'
import Responses from './Responses'

const FirstRoute = () => (
  <Requests />
);

const SecondRoute = () => (
  <Responses />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'My Requests' },
    { key: 'second', title: 'Responses' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

const MyRequests = () => {
  return (
    <TabViewExample />
  )
}

export default MyRequests

const styles = StyleSheet.create({})