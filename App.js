/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import { Provider } from 'react-redux';
import Main from './src/Main';
import store from './src/store';

const App = () => {
  return (



    <PaperProvider>
      <Main />
    </PaperProvider>

  );
};

export default App;
