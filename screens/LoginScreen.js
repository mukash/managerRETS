import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  ToastAndroid,
  PermissionsAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };
  }
  static navigationOptions = {
    title: 'Welcome Login',
    headerStyle: {backgroundColor: '#02584d'},
    headerTitleStyle: {color: '#fff'},
  };
  login = () => {
    fetch('http://rets.codlers.com/api/manager/loginmng.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        pass: this.state.pass,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson['error'] != undefined) {
          alert(responseJson.error);
          console.log(responseJson);
        } else if (responseJson['message'] != undefined) {
          let res = responseJson;
          this.storeData(res);
          this.props.navigation.navigate('Dashboard');
          ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
          ToastAndroid.showWithGravity(
            responseJson.message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  storeData = async res => {
    try {
      await AsyncStorage.setItem('token', res.manager.token);
      await AsyncStorage.setItem('name', res.manager.name);
    } catch (e) {
      console.error(error);
    }
  };
  render() {
    return (
      <View style={styles.backgroutMajor}>
        <View>
          <Image
            style={{
              width: 250,
              height: 300,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            source={require('../assets/img.png')}
          />
        </View>
        <View>
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="black"
            placeholder="Email"
            placeholderTextColor="black"
            selectionColor="#fff"
            keyboardType="email-address"
            onChangeText={email => this.setState({email})}
            onSubmitEditing={() => this.password.focus()}
          />
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="black"
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="black"
            onChangeText={pass => this.setState({pass})}
            ref={input => (this.password = input)}
          />

          <TouchableOpacity onPress={this.login} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  backgroutMajor: {
    flex: 1,
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
export default LoginScreen;
