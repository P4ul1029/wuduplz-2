import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const ProfileAppbar = ({}) => {
  const navigation = useNavigation();
  const _handleMore = () => navigation.navigate("EditProfile");
  
  return (
    <Appbar.Header>
      <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
    </Appbar.Header>
  );
};

const Profile = () => {
  return (
    <View>
      <ProfileAppbar/>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})