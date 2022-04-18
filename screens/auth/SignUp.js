import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { Alert } from 'react-native-web';
import { Button, TextInput } from 'react-native-paper';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const onHandleSignup = () => {
    if (email !== '' && password !== '') {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => console.log('Signup success'))
        .catch((err) => Alert.alert("Login error", err.message));
    }
  };

  return (
    <View>
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