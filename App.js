/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider as PaperProvider, useTheme } from "react-native-paper";
import { Provider } from 'react-redux';
import Main from './src/Main';
import store from './src/store';
import {MD2DarkTheme as DefaultTheme} from "react-native-paper";

const App = () => {
  let theme = useTheme()

  return (



    <PaperProvider theme={DefaultTheme}>
      <Main />
    </PaperProvider>

  );
};

export default App;
