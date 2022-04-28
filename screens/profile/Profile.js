import { StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthenticatedUserContext';

const Profile = () => {
  const { user, setUser } = useAuth();
  const email = user.email;
  const [name, setName] = useState('Name');
  const [initials, setInitials] = useState('AB');
  const [username, setUsername] = useState('username');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    const dbRef = doc(db, 'users', email);
    getDoc(dbRef)
      .then((snapshot) => {
        if (snapshot.exists) {
          setUsername(snapshot.data().username);
          setName(`${snapshot.data().firstName} ${snapshot.data().lastName}`)
          setInitials(`${snapshot.data().firstName.charAt(0)}${snapshot.data().lastName.charAt(0)}`)
        }
      })
      .catch((error) => console.log(error.message))
  };

  const ProfileAppbar = ({}) => {
    const navigation = useNavigation();
    const _handleMore = () => navigation.navigate("EditProfile");
    return (
      <Appbar.Header>
        <Appbar.Content title={name} />
        <Appbar.Action icon="dots-vertical" onPress={_handleMore} style={{ right: 0 }}/>
      </Appbar.Header>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ProfileAppbar/>
      <Avatar.Text size={90} label={initials} style={{ alignSelf: 'center', marginTop: 30 }} />
      <Text style={{ alignSelf: 'center', marginTop: 10, fontSize: 20 }}>{username}</Text>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})