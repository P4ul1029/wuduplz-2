import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthenticatedUserContext';
import SingleRes from '../../components/SingleRes';
import { Button } from 'react-native-paper';

const VideoFeed = () => {
  // const { user, setUser } = useAuth();
  // const email = user.email;
  // const requestId = props.route.params.id;
  // const [responses, setResponses] = useState([]);
  const responses = ['https://firebasestorage.googleapis.com/v0/b/wuduplz-1e802.appspot.com/o/responses%2Fjohndoe%40gmail.com%2Fca4cb365-092e-4391-bd18-bd005ba86c3f%2Fd4ed6dbd-c4cf-4009-9094-c32473908f20%2Fvideo.MOV?alt=media&token=f04e1e84-a767-45d5-8f98-e70fb1e29a4a', 'https://firebasestorage.googleapis.com/v0/b/wuduplz-1e802.appspot.com/o/responses%2Fjohndoe%40gmail.com%2Fe0536298-a31a-42ea-95ad-daf278485616%2F90b9544c-d347-4ee5-b254-9273153e74d6%2Fvideo.MOV?alt=media&token=fccede78-d284-47b5-bd33-c83aa612516e'];
  const navigation = useNavigation();
  const mediaRefs = useRef([]);

  // useEffect(() => {n
  //   fetchUserResponses();
  // }, []);

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
      <View></View>
    )
  }

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ height: Dimensions.get('window').height - 88 }}>
        <SingleRes item={item} ref={SingleResRef => (mediaRefs.current[item] = SingleResRef)} page={'VideoFeed'} />
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
        viewabilityConfig={{ itemVisiblePercentThreshold: 0 }}
        renderItem={renderItem}
        pagingEnabled
        keyExtractor={item => item}
        decelerationRate={'normal'}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </View>
  )
}

export default VideoFeed

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})