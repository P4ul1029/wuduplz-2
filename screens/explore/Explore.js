import { StyleSheet, Text, View, useWindowDimensions} from 'react-native'
import React from 'react'
import { TabView, SceneMap } from 'react-native-tab-view';

import Requests from './Requests';
import Responses from './Responses';

const FirstRoute = () => (
  <Requests/>
);

const SecondRoute = () => (
  <Responses/>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Search For Requests' },
    { key: 'second', title: 'My Responses' },
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

const Explore = () => {
  return (
    <TabViewExample />
  )
}

export default Explore

const styles = StyleSheet.create({})