import styles from "../StyleSheet";
import React from 'react';
import { Container, View, Button, ScrollView, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import { getCurrentLocation } from '../actions/locationAction';

const { width, height } = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class SetupLocation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            x: { latitude: 42.882004, longitude: 74.582748 },
            currentRegion: { latitude: 42.882004, longitude: 74.582748, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
        }
    }

    componentDidMount() {
        this.props.getCurrentLocation();
    }

    onPressMap = (e) => {
        this.setState({ x: e.nativeEvent.coordinate });
    }

    onDragMarker = (e) => {
        console.log(e);
        this.setState({ x: e.nativeEvent.coordinate })
    }

    render() {
    //    let { currentRegion } = this.state;
        return (
            <ScrollView>

                <Text 
                    style = {{color: "#253446",  fontSize: 36, fontWeight: '500', textAlign: 'center', 
                                marginTop: 75, marginBottom: 25}}>
                    Enable Location
                </Text>

                <View style={styles.mapContainer}>
                    <MapView style={styles.mapStyle}
                        region={this.props.currentRegion}
                        showsUserLocation={true}
                        onPress={(e) => this.onPressMap(e)}
                    >
                        <Marker
                            draggable={true}
                            coordinate={{ latitude: this.props.currentRegion.latitude, longitude: this.props.currentRegion.longitude }}
                        />
                    </MapView>
                </View>
                <View>

                    <TouchableOpacity 
                        accessible={true}
                        testID="skipBtnSetUpLocation"
                        accessibilityLabel="skipBtnSetUpLocation"
                        style={styles.locationSkipButton} onPress= {() => {this.props.navigation.navigate('Home')}}>
                        <Text style={{color:"white", fontSize: 20, fontWeight:"bold"}}>
                            Skip for now
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        accessible={true}
                        testID="nextBtnSetUpLocation"
                        accessibilityLabel="nextBtnSetUpLocation"
                        style={styles.locationNextButton} onPress= {() => {this.props.navigation.navigate('Home')}}>
                        <Text style={{color:"white", fontSize: 20, fontWeight:"bold"}}>
                            Next
                        </Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        );
    }

    componentDidUpdate(){
        this.props.currentRegion === undefined ?
            this.props.getCurrentLocation() :
            this.state.currentRegion = this.props.currentRegion;
    }

}

// const styles = StyleSheet.create({
//     mapContainer: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     mapStyle: {
//         width: Dimensions.get('window').width,
//         height: Dimensions.get('window').height * 0.7,
//     },
// })

const mapStateToProps = (state) => {
    return {
        currentRegion: state.location.currentRegion,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCurrentLocation: () => dispatch(getCurrentLocation()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetupLocation);
