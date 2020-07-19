import React, {Component} from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Image,
  odd,
  StyleSheet,
} from 'react-native';
import {List, ListItem, Container} from 'native-base';
import IconEnt from 'react-native-vector-icons/Entypo';
import {ScrollView} from 'react-native-gesture-handler';

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
          dataSource: responseJson['free'],
        });
      })
      .finally(() => this.setState({isLoading: false}))
      .catch(error => {
        console.error(error);
      });
  };
  renderItem = item => (
    <List>
      <ListItem>
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
      <View style={{backgroundColor: '#ffffff', width: '100%', flex: 1}}>
        <View style={{backgroundColor: '#ffffff'}}>
          <View style={styles.header}>
            <View style={styles.iconWrapper}>
              <IconEnt
                name="menu"
                style={styles.IconEntStyle}
                size={25}
                onPress={() => this.props.navigation.openDrawer()}
              />
            </View>
            <View style={styles.headerTextWrapper}>
              <Text style={styles.headerText}>Free Employees</Text>
            </View>
          </View>
          <View style={{backgroundColor: '#fff'}}>
            {this.state.dataSource == 0 ? (
              <View
                style={{backgroundColor: '#fff'}}
                opacity={0.4}
                style={styles.message}>
                <Text style={{fontSize: 20}}>{this.state.message}</Text>
              </View>
            ) : (
              <FlatList
                style={{width: '95%'}}
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
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#02584d',
    //height: '2%',
    flexDirection: 'row',
    paddingBottom: '3%',
  },
  message: {
    marginTop: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    marginTop: '4%',
    marginLeft: '2%',
  },
  IconEntStyle: {
    color: '#fff',
    marginBottom: '-60%',
    marginLeft: '4%',
  },
  headerTextWrapper: {
    marginHorizontal: '24%',
    marginTop: '4%',
  },
  headerText: {
    color: '#fff',
    fontSize: 23,
  },
});
