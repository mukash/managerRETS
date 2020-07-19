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
      message: 'No Complains',
    };
  }
  componentDidMount = () => {
    this.getEmp();
  };
  getEmp = () => {
    fetch('http://rets.codlers.com/api/manager/jobstatusinfo.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataSource: responseJson['pending'],
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
          <Text style={{fontWeight: 'bold', padding: '5%'}}>Client Name: </Text>
          <Text style={{paddingLeft: '5%'}}>{item.name}</Text>
          <Text style={{fontWeight: 'bold', padding: '4%'}}>
            Employee on this complain:
          </Text>
          <Text style={{paddingLeft: '5%'}}> {item.empname}</Text>

          {item.status == 'Pending' ? (
            <View>
              <Text style={{fontWeight: 'bold', padding: '8%'}}>
                Complain status:
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 24,
                  textAlign: 'center',
                  padding: '5%',
                  color: 'white',
                  backgroundColor: 'red',
                }}>
                {' '}
                {item.status}
              </Text>
            </View>
          ) : (
            <View>
              <Text style={{fontWeight: 'bold', padding: '5%'}}>
                Complain status:
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 24,
                  textAlign: 'center',
                  padding: '5%',
                  color: 'white',
                  backgroundColor: 'mediumseagreen',
                }}>
                {' '}
                {item.status}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </ListItem>
    </List>
  );
  getComplainDetail = item => {
    this.props.navigation.navigate('ComplainDetail', {
      Emid: item.emid,
      Name: item.empname,
      cName: item.name,
      Email: item.email,
      Number: item.emp_number,
      Status: item.status,
      JobAssign: item.job_assigned,
      Rating: item.rating,
      Date: item.dated,
      Description: item.description,
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
              <Text style={styles.headerText}>Pending Complains</Text>
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
                keyExtractor={item => item.jid}
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
    marginHorizontal: '20%',
    marginTop: '4%',
  },
  headerText: {
    color: '#fff',
    fontSize: 23,
  },
});
