import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
// const markerImg = require('../assets/img.jpg');
class MapScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lng: '',
      lat: '',
      markers: [],
      region: {
        latitude: 33.7463,
        longitude: 72.8397,
        latitudeDelta: 0.0822,
        longitudeDelta: 0.0321,
      },
    };
  }
  getInitialState() {
    return {
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
      }),
    };
  }
  componentDidMount = () => {
    fetch('https://jhnerd.com/rets/api/manager/trackemp.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          markers: responseJson,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <View accessible={true} style={styles.container}>
        <MapView style={styles.map} region={this.state.region}>
          {this.state.markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                longitude: parseFloat(marker.longitude),
                latitude: parseFloat(marker.latitude),
              }}
              title={marker.empname}
              description={marker.emp_number}
            />
          ))}
        </MapView>
        {/* <TouchableOpacityz
          onPress={this.getLocation}
          style={styles.buttonContainer}>
          <Text>Button</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fadeIn: {
    width: 250,
    height: 50,
    backgroundColor: '#bdc3c7',
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#439889',
  },
});
export default MapScreen;
