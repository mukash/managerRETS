import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import IconEnt from 'react-native-vector-icons/Entypo';

class ComplainDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  goBack = () => {
    this.props.navigation.navigate('Jobs');
  };
  Del = Emid => {
    //alert(Latitide + '  and  ' + Longitude);
    fetch('http://rets.codlers.com/api/manager/removeEmp.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emid: Emid,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson['message'] != undefined) {
          ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
          ToastAndroid.showWithGravity(
            responseJson.message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        }
      })
      .catch(error => {
        console.error(error);
      });
    this.props.navigation.navigate('Employee');
  };
  goBack = () => {
    this.props.navigation.navigate('Employee');
  };
  render() {
    const {navigation} = this.props;
    const Emid = navigation.getParam('Emid');
    const Name = navigation.getParam('Name');
    const Email = navigation.getParam('Email');
    const Number = navigation.getParam('Number');
    let status = navigation.getParam('Status');
    let JobAssign = navigation.getParam('JobAssign');
    let Rating = navigation.getParam('Rating');
    return (
      <View>
        <View style={styles.header}>
          <View style={styles.iconWrapper}>
            <TouchableOpacity onPress={() => this.goBack()}>
              <IconEnt
                name="chevron-small-left"
                style={styles.IconEntStyle}
                size={35}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.headerTextWrapper}>
            <Text style={styles.headerText}>Employee Detail</Text>
          </View>
        </View>
        <Text style={{fontWeight: 'bold', padding: 7}}>Emoloyee Name: </Text>
        <Text style={{paddingLeft: 7}}>{Name}</Text>
        <Text style={{fontWeight: 'bold', padding: 7}}>Employee Email:</Text>
        <Text style={{paddingLeft: 7}}> {Email}</Text>
        <Text style={{fontWeight: 'bold', padding: 7}}>Employee Number:</Text>
        <Text style={{paddingLeft: 7}}> {Number}</Text>
        <Text style={{fontWeight: 'bold', padding: 7}}>
          Number of Jobs Done:{' '}
        </Text>
        <Text style={{paddingLeft: 7}}>{JobAssign}</Text>
        <Text style={{fontWeight: 'bold', padding: 7}}>Rating:</Text>
        <Text style={{paddingLeft: 7}}>
          {' '}
          {Rating} <Text style={{fontSize: 15}}>/5</Text>
        </Text>

        {status == 'Free' ? (
          <View>
            <Text style={{fontWeight: 'bold', padding: 7}}>
              Complain status:{' '}
            </Text>
            <Text
              style={{
                paddingLeft: 7,
                padding: 7,
                backgroundColor: 'red',
                fontSize: 20,
              }}>
              {status}
            </Text>
          </View>
        ) : (
          <View>
            <Text style={{fontWeight: 'bold', padding: 7}}>
              Complain status:{' '}
            </Text>
            <Text
              style={{
                paddingLeft: 7,
                padding: 7,
                backgroundColor: 'mediumseagreen',
                fontSize: 20,
              }}>
              {status}
            </Text>
          </View>
        )}

        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.Del(Emid)}>
            <Text style={styles.buttonText}>Remove Employee</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#02584d',
    height: 95,
    flexDirection: 'row',
  },
  iconWrapper: {
    marginTop: 26,
    marginLeft: 7,
  },
  IconEntStyle: {
    color: '#fff',
  },
  headerTextWrapper: {
    marginHorizontal: 100,
    marginTop: 28,
  },
  headerText: {
    color: '#fff',
    fontSize: 30,
  },
  buttonWrapper: {
    marginTop: 10,
    marginHorizontal: 100,
  },
  button: {
    width: 200,
    backgroundColor: '#e74c3c',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
});

export default ComplainDetail;
