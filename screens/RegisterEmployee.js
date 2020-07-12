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
            size={25}
            onPress={() => this.props.navigation.openDrawer()}
          />
          <View>
          <Text style={styles.headerText} >Register Employee</Text>
          </View>
        </View>
        
        <View style={styles.backgroutMajor1}>
        
        <View style={styles.IconEntStyle1}>
              < IconEnt
                name="user"
                style={styles.IconEntStyle2}
                size={21}
                
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
          </View>
           <View style={styles.IconEntStyle1}>
              < IconEnt
                name="mail"
                style={styles.IconEntStyle2}
                size={21}
                
              />
              </View>
              <View style={styles.backgroutMajor}>
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
          </View>
          <View style={styles.IconEntStyle1}>
              < IconEnt
                name="phone"
                style={styles.IconEntStyle2}
                size={21}
                
              />
              </View>
              <View style={styles.backgroutMajor}>
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
          </View>
          <View style={styles.IconEntStyle1}>
              < IconEnt
                name="lock"
                style={styles.IconEntStyle2}
                size={21}
                
              />
              </View>
              <View style={styles.backgroutMajor}>
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="black"
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="black"
            onChangeText={emppass => this.setState({emppass})}
            ref={input => (this.password = input)}
          />
          </View>
          <View style={styles.IconEntStyle1}>
              < IconEnt
                name="eye"
                style={styles.IconEntStyle2}
                size={21}
                
              />
              </View>
              <View style={styles.backgroutMajor}>
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
            <Text style={styles.buttonText}>Register Your Employee</Text>
          </TouchableOpacity>
          </View>
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
    //flex: .12,
    backgroundColor: '#02584d',
    //height: '15%',
    justifyContent: 'center',
    marginBottom:'30%',
    paddingVertical:'5%',
    paddingBottom: '2%',
    paddingTop:'4%'
    
  },
  headerText:{
    color: '#fff' , paddingHorizontal: '5%',
  
    //backgroundColor:'blue',
    marginLeft:'28%',
    fontSize:20,
    marginBottom:'4%'
  },
  IconEntStyle: {
    marginBottom: '-8%',
    marginLeft: '4%',
    color: '#fff',
  },

  backgroutMajor: {
   // flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#fff',
  },
  backgroutMajor1: {
    flex:1,
    //alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#fff',
  },
  inputBox: {
    width: 300,
    //backgroundColor: '#fff',
    //borderRadius: 25,
   paddingHorizontal: '11%',
    fontSize: 16,
    color: 'black',
    marginVertical: '8%',
  },
  button: {
    width: 300,
    backgroundColor: '#439889',
    borderRadius: 25,
    marginVertical: '4%',
    paddingVertical: '3%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  IconEntStyle2:{
    marginBottom: '-10%',
     color: '#439889',
     //marginHorizontal: '2%',
    marginHorizontal: '5%',
     marginVertical: '2%'
    
   },
   IconEntStyle1: {
     marginBottom: '-8%',
     marginHorizontal: '5%'
   }
});
export default RegisterEmployee;
