/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Image} from 'react-native';

import 'react-native-gesture-handler';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import MapScreen from './MapScreen';
import ProfileScreen from './ProfileScreen';
import ComplainScreen from './ComplainScreen';
import ListingScreen from './ListingScreen';
import RegisterEmployee from './RegisterEmployee';

const CustomDrawerComponent = props => (
  <SafeAreaView style={{flex: 1}}>
    <View
      style={{
        backgroundColor: '#02584d',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        style={{
          width: 130,
          height: 130,
          borderRadius: 63,
          marginBottom: 10,
          marginTop: 30,
          marginBottom: 30,
        }}
        source={require('../assets/img.png')}
      />
    </View>
    <View>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
    </View>
  </SafeAreaView>
);

const DrawerNavigator = createDrawerNavigator(
  {
    Profile: {screen: ProfileScreen},
    Tracking: {screen: MapScreen},
    Register: {screen: RegisterEmployee},
    Employee: {screen: ListingScreen},
    Complain: {screen: ComplainScreen},
  },
  {
    contentComponent: CustomDrawerComponent,
  },
  {
    navigationOptions: {
      header: null,
    },
  },
);

const DashboardScreen = createAppContainer(DrawerNavigator);

export default DashboardScreen;
