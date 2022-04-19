import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';

const RequestModal = () => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      <Button style={{marginTop: 30}} onPress={showModal}>
        Show
      </Button>
    </Provider>
  );
};

const createRequest = () => {

}

const Requests = () => {
  return (
    <View style={{flex: 1}}>
      <Text>Requests</Text>
      <RequestModal/>
      <Button onPress={createRequest}>
        Add Request
      </Button>
    </View>
  )
}

export default Requests

const styles = StyleSheet.create({})