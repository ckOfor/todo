// react
import React, { useState, useEffect, useRef } from 'react';

// react-native
import { StyleSheet, Text, View } from 'react-native';

// third-party
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';

// navigation
import RootNavigator from './navigation/landing';

export default function App() {
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer
      ref={navigationRef}
    >
      <RootNavigator />
      <View>

      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
