import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { auth } from '../../config/firebase';
import { db } from '../../config/firebase';
import { Alert } from 'react-native-web';
import { Button, TextInput } from 'react-native-paper';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigation = useNavigation();

  const onHandleSignup = () => {
    if (email !== '' && password !== '' && username !== '' && firstName !== '' && lastName !== '') {
      const dbRef = doc(db, 'users', email);
      const myDoc = {
        'username': username,
        'firstName': firstName,
        'lastName': lastName,
        'email': email
      }

      setDoc(dbRef, myDoc)
        .then(() => console.log("Success!"))
        .catch((err) => console.log(err.message))

      createUserWithEmailAndPassword(auth, email, password)
        .then(() => console.log('Signup success'))
        .catch((err) => Alert.alert("Login error", err.message));
    }
  };

  return (
    <View>
      <TextInput
        label='Username'
        value={username}
        onChangeText={email => setUsername(email)}
      />
      <TextInput
        label='First Name'
        value={firstName}
        onChangeText={firstName => setFirstName(firstName)}
      />
      <TextInput
        label='Last Name'
        value={lastName}
        onChangeText={lastName => setLastName(lastName)}
      />
      <TextInput
        label='Email'
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <TextInput
        label='Password'
        value={password}
        onChangeText={password => setPassword(password)}
      />
      <Button mode="contained" onPress={onHandleSignup}>
        Sign Up
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate("Login")}>
        Login
      </Button>
    </View>
  )
}

export default Signup

const styles = StyleSheet.create({})