import { StyleSheet, KeyboardAvoidingView } from 'react-native';
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
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TextInput
        label='Email'
        value={email}
        onChangeText={email => setEmail(email)}
        style={{width: '95%'}}
      />
      <TextInput
        label='Password'
        value={password}
        onChangeText={password => setPassword(password)}
        style={styles.input}

      />
      <Button mode="contained" onPress={onHandleLogin} style={styles.input}>
        Login
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate("Signup")} style={styles.input}>
        Register
      </Button>
    </KeyboardAvoidingView>
  )
}

export default Login

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