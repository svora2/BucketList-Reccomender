//import liraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TextInput, StyleSheet} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { updateItem, deleteFromList,markCompleted } from '../actions/bucketAction'
// create a component

const mapStateToProps = (state) => {
    return {
        // personData: state.bucket.personData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateItem: (stateObject) => dispatch(updateItem(stateObject)),
        deleteFromList: (delItem) => dispatch(deleteFromList(delItem)),
        markCompleted: (stateObject) => dispatch(markCompleted(stateObject)),
    }
}

class EachItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyValue: this.props.keyVal,
            itemValue: "",
        }
    }

    handleEdit = () => {
        //console.log("itemval:" + this.state.itemValue)
        //console.log("in handleEdit")
        if (this.state.itemValue == "") {
            deleteFromList(this.props.keyVal)
        }
        else {
            this.props.updateItem(this.state);
        }
    };

    checkOffHandler = (completedKey) => {
        this.props.markCompleted(completedKey);
    };

    render() {
        return (
            //console.log("currItem: " + JSON.stringify(this.props.keyVal)),

            <View style={styles.container}>
                 <Button 
                     buttonStyle= {{backgroundColor: "#a3cdd4", }}
                     accessible={true}
                  testID={"deletefromWishlistBtn"}
                  accessibilityLabel={"deletefromWishlistBtn"}
                     onPress={() => this.checkOffHandler(this.state.keyValue)}
                     icon={<Icon type="FontAwesome5" name="check" color="#ffffff" ></Icon>}
                   />

                <TextInput 
                style={{ alignContent: "center", alignItems: "center"}}
                    defaultValue={this.props.itemVal} 
                    onChangeText={(input) => this.setState({ itemValue: input })} 
                    onEndEditing={this.handleEdit} 
                />


               
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a3cdd4',
        flexDirection: 'row'
    },
});

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(EachItem);
