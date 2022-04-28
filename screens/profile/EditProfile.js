import { StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Appbar, TextInput, Button  } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthenticatedUserContext';

const EditProfile = () => {
  const { user, setUser } = useAuth();
  const email = user.email;
  // const [userEmail, setUserEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const updateProfile = () => {
    if (username !== '' && firstName !== '' && lastName !== '') {
      const dbRef = doc(db, 'users', email);
      const myDoc = {
        'username': username,
        'firstName': firstName,
        'lastName': lastName,
        // 'email': userEmail,
        // 'password': password
      }

      updateDoc(dbRef, myDoc)
        .then(() => console.log("Success!"))
        .catch((err) => console.log(err.message))
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    const dbRef = doc(db, 'users', email);
    getDoc(dbRef)
      .then((snapshot) => {
        if (snapshot.exists) {
          setUsername(snapshot.data().username);
          setFirstName(snapshot.data().firstName);
          setLastName(snapshot.data().lastName);
          // setUserEmail(snapshot.data().email);
          // setPassword(snapshot.data().password);
        }
      })
      .catch((error) => console.log(error.message))
  };

  function logout() {
    return auth.signOut()
  }
  
  const EditProfileBar = () => {
    const navigation = useNavigation();
    return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content title="Edit Profile" />
    </Appbar.Header>
  )};

  return (
    <View style={{ flex: 1 }}>
      <EditProfileBar/>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TextInput
          label='Username'
          value={username}
          onChangeText={username => setUsername(username)}
          style={{width: '95%'}}
        />
        <TextInput
          label='First Name'
          value={firstName}
          onChangeText={firstName => setFirstName(firstName)}
          style={styles.input}
        />
        <TextInput
          label='Last Name'
          value={lastName}
          onChangeText={lastName => setLastName(lastName)}
          style={styles.input}
        />
        {/* <TextInput
          label='Email'
          value={userEmail}
          onChangeText={userEmail => setUserEmail(userEmail)}
          style={styles.input}
        /> */}
        {/* <TextInput
          label='Password'
          value={password}
          onChangeText={password => setPassword(password)}
          style={styles.input}
        /> */}
        <Button mode="contained" style={styles.input} onPress={updateProfile}>
          Update
        </Button>
        <Button icon="logout-variant" style={styles.input} mode='outlined' onPress={logout}>
          Sign Out
        </Button>
      </KeyboardAvoidingView>
    </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10
  },
  input: {
    width: '95%',
    marginTop: 10
  }
})