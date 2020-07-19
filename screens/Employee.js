import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import IconEnt from 'react-native-vector-icons/Entypo';
class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: '',
      free: '',
      working: '',
    };
  }
  goBack = () => {
    this.props.navigation.navigate('Profile');
  };
  toFree = () => {
    this.props.navigation.navigate('Free');
  };
  toWorking = () => {
    this.props.navigation.navigate('Working');
  };
  tolisting = () => {
    this.props.navigation.navigate('Employee');
  };
  render() {
    const {navigation} = this.props;
    const total = navigation.getParam('total');
    const free = navigation.getParam('free');
    const working = navigation.getParam('working');
    return (
      <View>
        <View style={styles.header}>
          <View style={styles.iconWrapper}>
            <TouchableOpacity onPress={() => this.goBack()}>
              <IconEnt
                name="chevron-small-left"
                style={styles.IconEntStyle}
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.headerTextWrapper}>
            <Text style={styles.headerText}>Employee</Text>
          </View>
        </View>
        <View>
          <View
            style={{
              //flex: 1,
              justifyContent: 'center',
              alignItems: 'stretch',
              //  backgroundColor: '#000',
              width: '100%',
            }}>
            <Text style={{alignSelf: 'center', fontSize: 30}}>
              Total Employee: {total}
            </Text>
            <TouchableOpacity
              onPress={this.tolisting}
              style={{
                backgroundColor: '#439889',
                height: '22%',
                justifyContent: 'center',
                marginTop: 2,
              }}>
              <Text
                style={{
                  color: '#fff',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  fontSize: 25,
                }}>
                See Detail
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              //flex: 1,
              justifyContent: 'center',
              alignItems: 'stretch',
              //  backgroundColor: '#000',
              width: '100%',
            }}>
            <Text style={{alignSelf: 'center', fontSize: 30}}>
              Free: {free}
            </Text>
            <TouchableOpacity
              onPress={this.toFree}
              style={{
                backgroundColor: '#439889',
                height: '22%',
                justifyContent: 'center',
                marginTop: 2,
              }}>
              <Text
                style={{
                  color: '#fff',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  fontSize: 25,
                }}>
                See Detail
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              //flex: 1,
              justifyContent: 'center',
              alignItems: 'stretch',
              //  backgroundColor: '#000',
              width: '100%',
            }}>
            <Text style={{alignSelf: 'center', fontSize: 30}}>
              Woking: {working}
            </Text>
            <TouchableOpacity
              onPress={this.toWorking}
              style={{
                backgroundColor: '#439889',
                height: '22%',
                justifyContent: 'center',
                marginTop: 2,
              }}>
              <Text
                style={{
                  color: '#fff',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  fontSize: 25,
                }}>
                See Detail
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#02584d',
    // height: 95,
    flexDirection: 'row',
    marginBottom: '3%',
    paddingBottom: '3%',
    width: '100%',
  },
  iconWrapper: {
    marginTop: '4%',
    marginLeft: '1%',
  },
  IconEntStyle: {
    color: '#fff',
  },
  headerTextWrapper: {
    marginHorizontal: '30%',
    marginTop: '4%',
  },
  headerText: {
    color: '#fff',
    fontSize: 28,
  },
  buttonWrapper: {
    marginTop: 10,
    marginHorizontal: 100,
  },
  button: {
    width: 200,
    backgroundColor: '#439889',
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
export default Employee;
