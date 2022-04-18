import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Appbar, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../config/firebase';

function logout() {
  return auth.signOut()
}

const EditProfileBar = () => {
  const navigation = useNavigation();
  return (
  <Appbar.Header>
    <Appbar.BackAction onPress={() => navigation.goBack()} />
  </Appbar.Header>
)};

const EditProfile = () => {
  return (
    <View>
      <EditProfileBar/>
      <Text>EditProfile</Text>
      <Button icon="logout-variant" mode="contained" onPress={logout}>
        Sign Out
      </Button>
    </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({})