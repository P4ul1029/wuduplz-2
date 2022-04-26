import { StyleSheet, KeyboardAvoidingView } from 'react-native';
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
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TextInput
        label='Username'
        value={username}
        onChangeText={email => setUsername(email)}
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
      <TextInput
        label='Email'
        value={email}
        onChangeText={email => setEmail(email)}
        style={styles.input}
      />
      <TextInput
        label='Password'
        value={password}
        onChangeText={password => setPassword(password)}
        style={styles.input}
      />
      <Button mode="contained" onPress={onHandleSignup} style={styles.input}>
        Sign Up
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate("Login")} style={styles.input}>
        Login
      </Button>
    </KeyboardAvoidingView>
  )
}

export default Signup

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '95%',
    marginTop: 10
  }
})