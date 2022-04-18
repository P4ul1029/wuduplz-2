import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { Alert } from 'react-native-web';
import { Button, TextInput } from 'react-native-paper';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Succesful login"))
        .catch((err) => Alert.alert("Unsuccessful login", err.message))
    }
  }

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
      <Button mode="contained" onPress={onHandleLogin}>
        Login
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate("Signup")}>
        Register
      </Button>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})