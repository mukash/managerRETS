import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
//import DrawerActions from 'react-navigation';
import IconEnt from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';
import StarRating from 'react-native-star-rating';
export default class Profile extends Component {
  constructor(props) {
    super(props);
    //this._loadData();
    this.state = {
      name: '',
      AVG: '',
      count: '',
      compCount: '',
      processing: '',
      completed: '',
      pending: '',
      total: '',
      free: '',
      working: '',
    };
  }
  async componentDidMount() {
    try {
      const name = await AsyncStorage.getItem('name');
      this.setState({name: name});
      this.jobInfo();
      this.empInfo();
    } catch (e) {
      console.error(error);
    }
  }
  jobInfo = () => {
    fetch('http://rets.codlers.com/api/manager/jobstatusinfo.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        let rating = parseFloat(responseJson['avg']).toFixed(1);
        this.setState({
          AVG: rating,
        });
        this.setState({
          count: responseJson['count'],
        });
        this.setState({
          pending: responseJson['pendingCount'],
        });
        this.setState({
          processing: responseJson['processingCount'],
        });
        this.setState({
          completed: responseJson['completedCount'],
        });

        // this.setState({
        //   completed: responseJson['completed'],
        // });
        // this.setState({
        //   pending: responseJson['pending'],
        // });
        // this.setState({
        //   processing: responseJson['processing'],
        // });
      })
      .finally(() => this.setState({isLoading: false}))
      .catch(error => {
        console.error(error);
      });
  };
  empInfo = () => {
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
          total: responseJson['totalEmp'],
        });
        this.setState({
          free: responseJson['totalFree'],
        });
        this.setState({
          working: responseJson['totalWorking'],
        });
      })
      .finally(() => this.setState({isLoading: false}))
      .catch(error => {
        console.error(error);
      });
  };
  employeePage = () => {
    this.props.navigation.navigate('EmployeePage', {
      total: this.state.total,
      free: this.state.free,
      working: this.state.working,
    });
  };
  jobsPage = () => {
    this.props.navigation.navigate('Jobs', {
      total: this.state.count,
      pending: this.state.pending,
      processing: this.state.processing,
      completed: this.state.completed,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <IconEnt
              name="menu"
              style={styles.IconEntStyle}
              size={35}
              onPress={() => this.props.navigation.openDrawer()}
            />
          </View>
          <Image
            style={styles.avatar}
            source={require('../assets/manager.png')}
          />
          <View style={styles.body}>
            <View style={styles.nameWrapper}>
              <Text style={styles.name}>{this.state.name}</Text>
            </View>
            <View style={{width: '100%', flexDirection: 'row'}}>
              <View
                style={{
                  flexDirection: 'column',
                  marginLeft: 10,
                  width: '40%',
                  borderRightColor: '#439889',
                  alignContent: 'flex-end',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 10,
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}>
                  Overall rating:
                </Text>
                <View
                  style={{
                    flexDirection: 'column',
                    marginLeft: 10,
                    width: '100%',
                    borderRightColor: '#439889',
                    borderRightWidth: 1,
                  }}>
                  <Text style={{fontSize: 75}}>{this.state.AVG}</Text>
                  <View style={{width: '80%'}}>
                    <StarRating
                      disabled={false}
                      maxStars={5}
                      rating={this.state.AVG}
                      //selectedStar={rating => this.onStarRatingPress(rating)}
                      fullStarColor="#439889"
                      emptyStarColor="#439889"
                      starSize={25}
                    />
                    <Text>By {this.state.completed} Customers.</Text>
                  </View>
                </View>
              </View>

              {/* <View style={{width: '100%', marginTop: 35}}>
                <Text style={{fontSize: 30}}>
                  {this.state.jobDone} JOBS DONE
                </Text>
                <Text>You have completed {this.state.jobDone} Jobs.</Text>
              </View> */}
              <View
                style={{
                  width: '70%',
                  // alignContent:'flex-start',
                  // justifyContent:'flex-start'
                  marginLeft: 20,
                }}>
                <TouchableOpacity onPress={this.jobsPage}>
                  <Text style={{fontWeight: 'bold', fontSize: 20}}>
                    Complains Detail:
                  </Text>
                  <Text style={{fontSize: 20, marginTop: 10}}>
                    Total Complains: {'\t'}
                    {this.state.count}
                  </Text>
                  <Text style={{fontSize: 20}}>
                    Pending: {'\t'}
                    {this.state.pending}
                  </Text>
                  <Text style={{fontSize: 20}}>
                    Under Process: {'\t'}
                    {this.state.processing}
                  </Text>
                  <Text style={{fontSize: 20}}>
                    Completed:{'\t'}
                    {this.state.completed}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'column',
                marginTop: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '100%',
                  // alignContent:'flex-start',
                  // justifyContent:'flex-start'
                  marginLeft: 20,
                }}>
                <TouchableOpacity onPress={this.employeePage}>
                  <Text style={{fontWeight: 'bold', fontSize: 20}}>
                    Employee Detail:
                  </Text>
                  <Text style={{fontSize: 20, marginTop: 10}}>
                    Total: {'\t'}
                    {this.state.total}
                  </Text>
                  <Text style={{fontSize: 20}}>
                    Free: {'\t'}
                    {this.state.free}
                  </Text>
                  <Text style={{fontSize: 20}}>
                    Working: {'\t'}
                    {this.state.working}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.logoutWrapper}>
                <TouchableOpacity
                  onPress={this._logOut}
                  style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: '#fff'}}>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View />
      </View>
    );
  }
  _logOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('stack');
  };
}

const styles = StyleSheet.create({
  ratingJobs: {
    flexDirection: 'row-reverse',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
  },
  nameWrapper: {
    alignContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#02584d',
    height: '18%',
    justifyContent: 'center',
  },
  IconEntStyle: {
    marginBottom: 75,
    marginLeft: 7,
    color: '#fff',
  },
  avatar: {
    width: '30%',
    height: '15%',
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    // marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: '9%',
  },
  name: {
    fontSize: 22,
    color: '#000000',
    fontWeight: '600',
    marginTop: -20,
    marginBottom: 20,
  },
  body: {
    marginTop: 65,
    //flex: 1,
    //  alignItems: 'center',
    padding: 3,
    width: '100%',
  },
  bodyContent: {
    flex: 1,
    // alignItems: 'center',
    padding: 30,
  },
  info: {
    fontSize: 16,
    color: '#FFF',
    //marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    // marginTop: 10,
    // textAlign: 'center',
  },
  shiftWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    backgroundColor: '#439889',
    width: '50%',
    height: 45,
    borderRadius: 63,
    alignSelf: 'center',
  },
  logoutWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    backgroundColor: '#439889',
    width: '40%',
    height: 45,
    borderRadius: 63,
    marginTop: '18%',
    alignSelf: 'center',
  },
});
