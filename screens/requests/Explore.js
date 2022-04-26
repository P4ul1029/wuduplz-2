import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Card, Paragraph, Button } from 'react-native-paper';
import { deleteDoc, doc, getDoc, setDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthenticatedUserContext';
import { db } from '../../config/firebase';

const Explore = () => {
  const { user, setUser } = useAuth();
  const email = user.email;
  const [requests, setRequests] = useState([]);
  const [reqComps, setReqComps] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    populateRequests();
  }, [requests]);

  const fetchRequests = () => {
    const dbRef = collection(db, 'requests');
    const reqs = [];
    getDocs(dbRef)
      .then((snapshot) => {
        if (!snapshot.empty) {
          let index = 0;
          snapshot.forEach((doc) => {
            index++;
            if (email != doc.data().userEmail) {
              reqs.push({
                id: doc.id,
                caption: doc.data().caption,
                userEmail: doc.data().userEmail
              })
            }
            if (index == snapshot.size){
              setRequests(reqs);
            }
          })
        }
      })
      .catch((error) => console.log(error))
  }

  const populateRequests = () => {
    const reqs = [];
    requests && requests.forEach((req, index) => {
      reqs.push(<Request id={req.id} caption={req.caption} userEmail={req.userEmail}/>)
      if (index + 1 === requests.length) {
        setReqComps(reqs);
      }
    })
  }

  const Request = (props) => {
    return(
    <Card style={{width: "95%", marginTop: 10}}>
      <Card.Content>
        <Paragraph style={{fontSize: 20}}>{props.caption}</Paragraph>
      </Card.Content>
      <Card.Actions >
        <Button icon="video" style={{justifyContent: 'center'}} mode="contained" >Respond</Button>
      </Card.Actions>
    </Card>
  )};

  return (
    <ScrollView style={{flex: 1}}>
      {reqComps}
    </ScrollView>
  )
}

export default Explore

const styles = StyleSheet.create({})