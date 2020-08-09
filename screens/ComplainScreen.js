import React, {Component} from 'react';
import {FlatList, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {List, ListItem} from 'native-base';
import IconEnt from 'react-native-vector-icons/Entypo';
console.disableYellowBox = true;
export default class ListingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isLoading: false,
      message: 'No complains',
    };
  }
  componentDidMount = () => {
    this.getJobs();
  };
  getJobs = () => {
    fetch('https://jhnerd.com/rets/api/manager/jobsviewmngr.php', {
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
          ) : item.status == 'Processing' ? (
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
                  backgroundColor: '#deb80f',
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
      () => this.getJobs(),
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
                <IconEnt name="menu" style={styles.IconEntStyle} size={25} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerTextWrapper}>
              <Text style={styles.headerText}>Complain List</Text>
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
              keyExtractor={item => item.jid}
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
    //height: 95,
    flexDirection: 'row',
  },
  message: {
    marginTop: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    marginTop: '4%',
    marginLeft: '3%',
  },
  IconEntStyle: {
    color: '#fff',
  },
  headerTextWrapper: {
    marginHorizontal: '20%',
    marginTop: '3%',
    marginBottom: '4%',
  },
  headerText: {
    color: '#fff',
    fontSize: 25,
  },
});
