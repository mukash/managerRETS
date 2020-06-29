import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import IconEnt from 'react-native-vector-icons/Entypo';
class RegisterEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empname: '',
      empemail: '',
      empnumber: '',
      emppass: '',
      empcpass: '',
    };
  }

  registerEmployee = () => {
    fetch('http://rets.codlers.com/api/manager/register.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        empname: this.state.empname,
        email: this.state.empemail,
        emp_number: this.state.empnumber,
        pass: this.state.emppass,
        cpass: this.state.empcpass,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <IconEnt
            name="menu"
            style={styles.IconEntStyle}
            size={35}
            onPress={() => this.props.navigation.openDrawer()}
          />
          <Text style={{color: '#fff'}}>Register Employee</Text>
        </View>
        <View style={{backgroundColor: '#fff'}}>
          <IconEnt
            name="menu"
            style={styles.avatar}
            size={35}
            // onPress={() => this.props.navigation.openDrawer()}
          />
        </View>
        <View style={styles.backgroutMajor}>
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="black"
            placeholder="Employee Name"
            placeholderTextColor="black"
            selectionColor="#fff"
            keyboardType="email-address"
            onChangeText={empname => this.setState({empname})}
            onSubmitEditing={() => this.password.focus()}
          />
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="black"
            placeholder="Employee Email"
            placeholderTextColor="black"
            selectionColor="#fff"
            keyboardType="email-address"
            onChangeText={empemail => this.setState({empemail})}
            onSubmitEditing={() => this.password.focus()}
          />
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="black"
            placeholder="Employee Number"
            placeholderTextColor="black"
            selectionColor="#fff"
            keyboardType="phone-pad"
            onChangeText={empnumber => this.setState({empnumber})}
            onSubmitEditing={() => this.password.focus()}
          />
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="black"
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="black"
            onChangeText={emppass => this.setState({emppass})}
            ref={input => (this.password = input)}
          />
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="black"
            placeholder="Confirm Password"
            secureTextEntry={true}
            placeholderTextColor="black"
            onChangeText={empcpass => this.setState({empcpass})}
            ref={input => (this.password = input)}
          />

          <TouchableOpacity
            onPress={this.registerEmployee}
            style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#02584d',
    height: 90,
    justifyContent: 'center',
  },
  IconEntStyle: {
    marginBottom: 5,
    marginLeft: 7,
    color: '#fff',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 20,
  },
  backgroutMajor: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  inputBox: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: 'black',
    marginVertical: 10,
  },
  button: {
    width: 300,
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
export default RegisterEmployee;
