import { StyleSheet, Text, View, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import { Video } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";

const SingleRes = forwardRef(({ item, page }, parentRef) => {
  const ref = useRef(null);
  const navigation = useNavigation();

  useImperativeHandle(parentRef, () => ({
    play,
    unload,
    stop
  }));

  useEffect(() => {
    return () => unload();
  }, [])

  const play = async () => {
    try {
      if (ref.current == null) {
        return;
      }
  
      const status = await ref.current.getStatusAsync();

      if (status?.isPlaying) {
        return;
      }
  
      await ref.current.playAsync();
    } catch (error) {
      console.log(error);
    }
  }

  const stop = async () => {
    try {
      if (ref.current == null) {
        return;
      }
  
      const status = await ref.current.getStatusAsync();
      
      if (!status?.isPlaying) {
        return;
      }
  
      await ref.current.stopAsync();
    } catch (error) {
      console.log(error);
    }
  }

  const unload = async () => {
    try {
      if (ref.current == null) {
        return;
      }
  
      await ref.current.unloadAsync();
    } catch (error) {
      console.log(error);
    }
  }

  const VideoFeedOverlays = () => {
    return (
      <View style={styles.container}>
        {/* <View>
          <Text style={styles.displayName}>{}</Text>
          <Text style={styles.description}>{}</Text>
        </View> */}

        <View style={styles.leftContainer}>
          <TouchableOpacity
            // onPress={}
          >
            <Ionicons
                color="white"
                size={40}
                name={'person-circle'}
              />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            // onPress={}
          >
            <Ionicons
              color="white"
              size={40}
              name={"heart-outline"}
            />
            <Text style={styles.actionButtonText}>
              0
            </Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.actionButton}
            // onPress={}
          >
            <Ionicons
              color="white"
              size={40}
              name={"chatbubble"}
            />
            <Text style={styles.actionButtonText}>
              0
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  };

  const ResponsesOverlays = () => {
    return (
      <SafeAreaView style={styles.cancelBtnContainer}>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => navigation.goBack()}
        >
          <Feather name="corner-up-left" size={48} color={'white'} />
        </TouchableOpacity>
      </SafeAreaView>
    )
  };

  return (
    <>
      {page == 'VideoFeed' ? <VideoFeedOverlays/> : <ResponsesOverlays/>}
      <Video
        source={{ uri: item }}
        style={{ flex: 1 }}
        resizeMode={Video.RESIZE_MODE_COVER}
        ref={ref}
        isLooping
        shouldPlay={false}
        playsInSilentModeIOS={true}
      />
    </>
  )
})

export default SingleRes

const styles = StyleSheet.create({
  cancelBtnContainer: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    zIndex: 999,
    top: 50,
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  container: {
    position: 'absolute',
    zIndex: 999,
    bottom: 0,
    right: 0,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  displayName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  caption: {
    marginTop: 10,
    color: 'white',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 30
  },
  leftContainer: {
    alignItems: 'center'
  },
  actionButton: {
    paddingBottom: 16
  },
  actionButtonText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 4
  }
})