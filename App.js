import React, { useState, createContext, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { AuthenticatedUserProvider } from './contexts/AuthenticatedUserContext';
import { useAuth } from './contexts/AuthenticatedUserContext';

import Login from './screens/auth/Login';
import Signup from './screens/auth/SignUp';
import BottomNavbar from './components/BottomNavbar';
import EditProfile from './screens/profile/EditProfile';
import CameraScreen from './screens/camera/CameraScreen';
import SaveVideo from './screens/camera/SaveVideo';
import Responses from './screens/responses/Responses';

const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name='BottomNavbar' component={BottomNavbar} />
      <Stack.Screen name='EditProfile' component={EditProfile} />
      <Stack.Screen name='CameraScreen' component={CameraScreen} />
      <Stack.Screen name='SaveVideo' component={SaveVideo} />
      <Stack.Screen name='Responses' component={Responses} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Login'>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
    return unsubscribeAuth;
  }, [user]);
  
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}