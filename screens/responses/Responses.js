import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthenticatedUserContext';
import SingleRes from '../../components/SingleRes';
import { Button } from 'react-native-paper';

const Responses = (props) => {
  const { user, setUser } = useAuth();
  const email = user.email;
  const requestId = props.route.params.id;
  const [responses, setResponses] = useState([]);

  const navigation = useNavigation();

  const mediaRefs = useRef([]);

  useEffect(() => {
    fetchUserResponses();
  }, []);

  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach(elem => {
      const cell = mediaRefs.current[elem.key]
      if (cell) {
        if (elem.isViewable) {
          cell.play();
        } else {
          cell.stop();
        }
      }
    });
  });

  const fetchUserResponses = () => {
    const dbRef = doc(db, 'requests', requestId);
    getDoc(dbRef)
      .then((snapshot) => {
        if (snapshot.exists && snapshot.data().responses) {
          setResponses(snapshot.data().responses)
        }
      })
      .catch((error) => console.log(error.message))
  }

  if (responses.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20 }}>
          This request has no responses!
        </Text>
        <Button onPress={() => navigation.goBack()}>Go Back</Button>
      </View>
    )
  }

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ height: Dimensions.get('window').height }}>
        <SingleRes item={item} page={'Responses'} ref={SingleResRef => (mediaRefs.current[item] = SingleResRef)} />
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={responses}
        windowSize={4}
        initialNumToRender={0}
        maxToRenderPerBatch={2}
        removeClippedSubviews
        viewabilityConfig={{
          itemVisiblePercentThreshold: 0
        }}
        renderItem={renderItem}
        pagingEnabled
        keyExtractor={item => item}
        decelerationRate={'normal'}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </View>
  )
}

export default Responses

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})