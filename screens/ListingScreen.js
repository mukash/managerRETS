import React, {Component} from 'react';
import {FlatList, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {List, ListItem} from 'native-base';
import IconEnt from 'react-native-vector-icons/Entypo';
export default class ListingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isLoading: false,
      message: 'No employees',
    };
  }
  componentDidMount = () => {
    this.getEmp();
  };
  getEmp = () => {
    fetch('http://rets.codlers.com/api/manager/listing.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataSource: responseJson.list,
        });
      })
      .finally(() => this.setState({isLoading: false}))
      .catch(error => {
        console.error(error);
      });
  };
  renderItem = item => (
    <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
      <ListItem selected containerStyle={{borderBottomWidth: 0}}>
        <TouchableOpacity onPress={() => this.getComplainDetail(item)}>
          <Text style={{fontWeight: 'bold', padding: 7}}>Emmpolyee Name: </Text>
          <Text style={{paddingLeft: 7}}>{item.empname}</Text>
          <Text style={{fontWeight: 'bold', padding: 7}}>Employee Number:</Text>
          <Text style={{paddingLeft: 7}}> {item.emp_number}</Text>
        </TouchableOpacity>
      </ListItem>
    </List>
  );
  getComplainDetail = item => {
    this.props.navigation.navigate('EmployeeDetail', {
      Emid: item.emid,
      Name: item.empname,
      Email: item.email,
      Number: item.emp_number,
      Status: item.job_status,
      JobAssign: item.job_assigned,
      Rating: item.rating,
    });
  };
  handleRefresh = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => this.getEmp(),
    );
  };
  render() {
    return (
      <View>
        <View>
          <View style={styles.header}>
            <View style={styles.iconWrapper}>
              <TouchableOpacity
                onPress={() => this.props.navigation.openDrawer()}>
                <IconEnt name="menu" style={styles.IconEntStyle} size={35} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerTextWrapper}>
              <Text style={styles.headerText}>Employee List</Text>
            </View>
          </View>
          {this.state.dataSource == 0 ? (
            <View opacity={0.4} style={styles.message}>
              <Text style={{fontSize: 20}}>{this.state.message}</Text>
            </View>
          ) : (
            <FlatList
              data={this.state.dataSource}
              showsVerticalScrollIndicator={true}
              keyExtractor={item => item.emid}
              renderItem={({item}) => this.renderItem(item)}
              onRefresh={() => this.handleRefresh()}
              refreshing={this.state.isLoading}
            />
          )}
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
  message: {
    marginTop: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    marginTop: 24,
    marginLeft: 7,
  },
  IconEntStyle: {
    color: '#fff',
  },
  headerTextWrapper: {
    marginHorizontal: 100,
    marginTop: 25,
  },
  headerText: {
    color: '#fff',
    fontSize: 30,
  },
});
