import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import DashboardScreen from './screens/DashboardScreen';
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import EmployeeDetail from './screens/EmployeeDetail';
import ComplainDetail from './screens/ComplainDetail';
import LogoScreen from './screens/LogoScreen';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <switchNav />;
  }
}

const AppNavigator = createStackNavigator({
  Login: {screen: LoginScreen},
});

const switchNav = createSwitchNavigator({
  Logo: {screen: LogoScreen ,  navigationOptions: { headerShown: false, }},

  Loading: {screen: LoadingScreen},
  stack: AppNavigator,
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: {headerShown: false},
  },
  EmployeeDetail: {
    screen: EmployeeDetail,
    navigationOptions: {headerShown: false},
  },
  ComplainDetail: {
    screen: ComplainDetail,
    navigationOptions: {headerShown: false},
  },
});
export default createAppContainer(switchNav);
