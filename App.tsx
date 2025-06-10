import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {HomeScreen} from './src/HomeScreen';

export const App = () => {
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}>
      <SafeAreaProvider>
        <HomeScreen />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
