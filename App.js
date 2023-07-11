import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './src/redux';
import {SafeAreaView, StyleSheet, StatusBar, View} from 'react-native';
import Navigator from '@Navigation';
import {NativeBaseProvider, Box} from 'native-base';
import Navigation from './src/Navigator';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <NativeBaseProvider>
          <SafeAreaView style={styles.container}>
            <StatusBar
              animated={true}
              backgroundColor={'#FFF'}
              barStyle="dark-content"
            />
            <Navigation />
          </SafeAreaView>
        </NativeBaseProvider>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
