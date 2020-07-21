import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import DashboardScreen from './screens/DashboardScreen';
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import EmployeeDetail from './screens/EmployeeDetail';
import ComplainDetail from './screens/ComplainDetail';

import Employee from './screens/Employee';
import FreeEmp from './screens/FreeEmp';
import WorkingEmp from './screens/WorkingEmp';
import Jobs from './screens/Jobs';
import Pending from './screens/Pending';
import Process from './screens/Process';
import Completed from './screens/completed';

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
  EmployeePage: {screen: Employee, navigationOptions: {headerShown: false}},
  Free: {screen: FreeEmp, navigationOptions: {headerShown: false}},
  Working: {screen: WorkingEmp, navigationOptions: {headerShown: false}},
  Jobs: {screen: Jobs, navigationOptions: {headerShown: false}},
  pending: {screen: Pending, navigationOptions: {headerShown: false}},
  Process: {screen: Process, navigationOptions: {headerShown: false}},
  completed: {screen: Completed, navigationOptions: {headerShown: false}},
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
