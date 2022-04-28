import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Button } from 'react-native-paper';
import { StackActions, useNavigation } from '@react-navigation/native';
import { db } from '../../config/firebase';
import { updateDoc, getDoc, doc } from 'firebase/firestore';
import { storage } from '../../config/firebase';
import * as firebase from 'firebase/storage';
import uuid from 'react-native-uuid';

const SaveVideo = (props) => {
  const [sendingFile, setSendingFile] = useState(false);
  const navigation = useNavigation();
  const responseId = uuid.v4();
  
  const sendFile = (responses) => {
    const fileRef = firebase.ref(storage,`responses/${props.route.params.userEmail}/${props.route.params.id}/${responseId}/video.MOV`);
    fetch(props.route.params.source)
      .then(response => response.blob())
      .then(blob => firebase.uploadBytes(fileRef, blob))
      .then(task => firebase.getDownloadURL(task.ref))
      .then((downloadURL) => {
        const dbRef = doc(db, 'requests', props.route.params.id);
        const myDoc = {
          'responses': [...responses, downloadURL]
        };
        updateDoc(dbRef, myDoc)
          .then(() => {
            alert('Video successfully sent!');
            navigation.dispatch(StackActions.popToTop());
          })
          .catch((error) => {
            setSendingFile(false)
            console.log(error)
          })
      })
      .catch(error => console.log(error))
  }

  const send = () => {
    setSendingFile(true)
    const dbRef = doc(db, 'requests', props.route.params.id);
    getDoc(dbRef)
      .then((snapshot) => {
        if (snapshot.exists) {
          snapshot.data().responses ? sendFile(snapshot.data().responses) : sendFile([])
        }
      })
      .catch((error) => console.log(error.message))
  }

  if (sendingFile) {
    return (
      <SafeAreaView style={styles.uploadingContainer}>
        <ActivityIndicator size={'large'}/>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={styles.container}>
        <Image
          style={styles.mediaPreview}
          source={{ uri: props.route.params.sourceThumb}}
        />
      </View>
      <View style={{ flexDirection: 'row', margin: 10 }}>
        <Button onPress={send} mode={'contained'} icon={'send'} style={{ flex: 1, marginRight: 10 }}>
          Send
        </Button>
        <Button onPress={() => navigation.goBack()} mode={'contained'} icon={'cancel'} style={{ flex: 1 }}>
          Cancel
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default SaveVideo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mediaPreview: {
    aspectRatio: 9/16,
    backgroundColor: 'black',
    width: 250
  },
  uploadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})