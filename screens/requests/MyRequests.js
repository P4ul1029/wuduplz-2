import { StyleSheet, KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import { Modal, Portal, Button, Provider, Avatar,  Card, Title, Paragraph, TextInput } from 'react-native-paper';
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import uuid from 'react-native-uuid';
import { useAuth } from '../../contexts/AuthenticatedUserContext';
import React, { useState, useEffect } from 'react';

const MyRequests = () => {
  const { user, setUser } = useAuth();
  const email = user.email;
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [userRequests, setUserRequests] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    populateRequests()
  }, [userRequests])

  useEffect(() => {
    fetchUserRequestIds()
  }, [])

  const fetchUserRequestIds = () => {
    const dbRef = doc(db, 'users', email);
    getDoc(dbRef)
      .then((snapshot) => {
        if (snapshot.exists && snapshot.data().requests) {
          setUserRequests(snapshot.data().requests)
        }
      })
      .catch((error) => console.log(error.message))
  }

  const updateUserDoc = (requestId) => {
    const dbRef = doc(db, 'users', email);
    const myDoc = {
      'requests': [...userRequests, requestId]
    }
    setDoc(dbRef, myDoc, { merge: true })
      .then(() => fetchUserRequestIds())
      .catch((error) => console.log(error.message))
  }

  const createRequest = (caption) => {
    const requestId = uuid.v4();
    const dbRef = doc(db, 'requests', requestId);
    const myDoc = {
      'userEmail': email,
      'caption': caption
    }
    setDoc(dbRef, myDoc)
      .then(() => updateUserDoc(requestId))
      .catch((error) => console.log(error))
  }
  
  const Request = ({caption}) => {
    return(
    <Card style={{width: "95%", marginTop: 10}}>
      <Card.Content>
        <Paragraph style={{fontSize: 20}}>{caption}</Paragraph>
      </Card.Content>
      <Card.Actions >
        <Button icon="video" style={{justifyContent: 'center'}} mode="contained" >View Responses</Button>
      </Card.Actions>
    </Card>
  )};

  const populateRequests = () => {
    const reqs = []
    userRequests && userRequests.forEach((requestId, index) => {
      const dbRef = doc(db, 'requests', requestId);
      getDoc(dbRef)
        .then((snapshot) => {
          if (snapshot.exists) {
            if (snapshot.data().userEmail === email) {
              reqs.push(<Request caption={snapshot.data().caption}/>)
            }
            if (index + 1 == userRequests.length) {
              setRequests(reqs)
            }
          }
        })
        .catch((error) => console.log(error.message))
    })
  }

  const AddRequestModal = () => {
    const containerStyle = {backgroundColor: 'white', padding: 20};
    const [text, setText] = useState("");
    return (
      <Provider >
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <TextInput
              label="Request Caption"
              value={text}
              onChangeText={text => setText(text)}
              multiline
              style={{height: 100}}
            />
            <Button
              icon="plus-circle-outline"
              style={{justifyContent: 'center', marginTop: 10}} mode="contained"
              onPress={() =>{
                if (text != ""){
                  createRequest(text);
                  hideModal();
                }
              }}>Create</Button>
          </Modal>
        </Portal>
      </Provider>
    );
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
      <ScrollView contentContainerStyle={{alignItems: "center"}}>
        {!requests || requests.length === 0 ?
          <Text style={{ marginTop: 10, fontSize: 20 }}>Create a request!</Text> : 
          requests}
        <Button icon="plus-circle-outline" mode="contained" onPress={showModal} style={styles.addRequestBtn}>
          Add Request
        </Button>
      </ScrollView>
      <AddRequestModal/>
    </KeyboardAvoidingView>
  )
}

export default MyRequests

const styles = StyleSheet.create({
  addRequestBtn: {
    marginTop: 10,
    marginBottom: 10,
    width: '95%', 
    alignSelf: 'center'
  }
})