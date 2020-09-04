// import styles from "../StyleSheet";
import React from 'react';
import { View, Button, ScrollView, StyleSheet, Dimensions, Text } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { getCurrentLocation, getCustomLocation } from '../actions/locationAction';
import { SearchBar } from 'react-native-elements';

const LATITUDE_DELTA = 0.08;
const LONGITUDE_DELTA = 0.04;

class CustomLocation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            x: { latitude: 42.882004, longitude: 74.582748, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA },
            currentRegion: { latitude: 42.882004, longitude: 74.582748, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA },
            search: "",
            error: "",
        }
    }

    componentDidMount() {
        this.props.getCurrentLocation();
        this.setState({x: this.props.currentRegion});
        this.setState({currentRegion: this.props.currentRegion});
    }

    onPressMap = (e) => {
        let coordinate = e.nativeEvent.coordinate;
        coordinate.latitudeDelta = LATITUDE_DELTA;
        coordinate.longitudeDelta = LONGITUDE_DELTA ;
        this.setState({ x: coordinate });
    }

    updateSearch = search => {
        this.setState({ search });
    };

    locationSearch = () => {
        this.props.getCustomLocation(this.state.search)
        this.setState({ x: this.props.currentRegion, currentRegion: this.props.currentRegion})
    };

    currentLocation = () => {
        this.props.getCurrentLocation();
        this.setState({ x: this.props.currentRegion, currentRegion: this.props.currentRegion})
    }

    render() {
        return (
            <ScrollView>
                <SearchBar
                    accessible={true}
                    testID="searchLocation"
                    accessibilityLabel="searchLocation"
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                />
                <Button 
                    accessible={true}
                    testID="locationSearchBtn"
                    accessibilityLabel="locationSearchBtn"
                    title="Search for Location" onPress={() => this.locationSearch()}></Button>
                <View style={styles.mapContainer}>
                    <MapView style={styles.mapStyle}
                        showsUserLocation={true}
                        region={this.state.currentRegion}
                        onPress={(e) => this.onPressMap(e)}
                    >
                        <Marker
                            draggable={false}
                            coordinate={{ latitude: this.state.x.latitude, longitude: this.state.x.longitude }}
                        />
                    </MapView>
                </View>
                <View>
                    <Button 
                        accessible={true}
                        testID="useCurrLocationBtn"
                        accessibilityLabel="useCurrLocationBtn"
                        title="Use Current Location" onPress={() => this.currentLocation()}></Button>
                    <Button 
                        accessible={true}
                        testID="updateLocationBtn"
                        accessibilityLabel="updateLocationBtn"
                        title="Update Location" onPress={() => { this.props.navigation.navigate('Home') }}></Button>
                </View>
            </ScrollView>
        );
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.x !== this.state.x) {
            var upperY = prevState.x.latitude + this.state.x.latitudeDelta;
            var lowerY = prevState.x.latitude - this.state.x.latitudeDelta;
            var upperX = prevState.x.longitude + this.state.x.longitudeDelta;
            var lowerX = prevState.x.longitude - this.state.x.longitudeDelta;
            if(this.state.x.latitude > upperY || this.state.x.latitude < lowerY || this.state.x.longitude > upperX || this.state.x.longitude < lowerX ){
                this.setState({currentRegion: this.state.x});
            }
        }
        if(prevProps.currentRegion !== this.props.currentRegion){
            this.setState({ x: this.props.currentRegion, currentRegion: this.props.currentRegion});
        }
    }

}

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.55,
    },
})

const mapStateToProps = (state) => {
    return {
        currentRegion: state.location.currentRegion,
        error: state.location.error,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCurrentLocation: () => dispatch(getCurrentLocation()),
        getCustomLocation: (search) => dispatch(getCustomLocation(search))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomLocation);
