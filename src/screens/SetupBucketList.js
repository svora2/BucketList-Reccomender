import styles from "../StyleSheet";
import React from 'react';
import { Container,Alert, View, TextInput, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { Button, Icon } from "react-native-elements";
import { Row, Col } from "react-native-easy-grid";
import { db } from '../config.js';
import { connect } from 'react-redux';
import firebase from "firebase";
import { addToBucketList,initializeBucketList } from '../actions/bucketAction';
import { initalizeWishList } from '../actions/wishlistAction';
import { initializeMemories } from '../actions/myMemoriesAction';

class SetupBucketList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            bucketList: [],
        }
    }

    componentDidMount(){
        this.props.initalizeWishList();
        this.props.initializeBucketList();
        this.props.initializeMemories();
    }
    
    txtHandler = (e) => {
        this.setState({ text: e.nativeEvent.text });
    }

    addBucketList = () => {
        //console.log('buttonClicked');

       let existing = false;
       let existingItems = this.state.bucketList;
       if(this.state.text.length != 0 ){
           for(var i = 0; i < existingItems.length; i++){
              if((existingItems[i]) == this.state.text){
                   existing = true;
              }
           }
           if(existing != true){
               this.props.addToBucketList(this.state);      
                existingItems.push(this.state.text);
        this.setState({ bucketList: existingItems });
           }
           else{
               Alert.alert("Item already existing in the list")
           }
         }
       //console.log("setup Bucketlist : " + this.state.text)
    }

    render() {
        let { text, bucketList } = this.state;
        return (
            <View style={styles.landingcontainer}>
                <ScrollView>

                <Text style = {{color: "#253446",  fontSize: 36, fontWeight: '500', textAlign: 'center', 
                                marginTop: 75}}>
                    BucketList Items
                </Text>

                <Text 
                    style = {{color: "#253446", marginBottom: 30, marginRight: 40, textAlign: 'center', 
                                marginLeft: 40, marginTop: 10, fontSize: 16, fontWeight: '300'}}>

                    Add at least one item to your BucketList
                </Text>

                 <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Row style={{ padding: 20 }}>
                        <TextInput 
                            accessible={true}
                            testID="addItemTxtSetUpBucketList"
                            accessibilityLabel="addItemTxtSetUpBucketList"
                            placeholder="Add Item" style={styles.setupBucketListTextInput}
                            value={text}
                            onChange={(e) => this.txtHandler(e)}
                        ></TextInput>

                        <Button 
                            accessible={true}
                            testID="addBtnSetUpBucketList"
                            accessibilityLabel="addBtnSetUpBucketList"
                            type="outline"
                            buttonStyle={{ borderRadius: 50, width: 45, height: 45, marginLeft: 35, backgroundColor: "#39ac96" }}
                            icon={<Icon type="font-awesome" name="plus" style={{ fontSize: 10, fontWeight: '100' }}></Icon>}
                            onPress={() => this.addBucketList()}
                        ></Button>
                    </Row>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10, }}>
                    {
                        bucketList.map((item, key) => (
                            <Row key={key} style={styles.setupBucketListItem}>
                                <Text style={{color: "white", fontSize: 16, fontWeight: 'bold', alignSelf: 'center'}}>{item}</Text>
                            </Row>
                        ))
                    }
                </View>
                <View style={{ padding: 20, paddingLeft: 10, paddingRight: 10 }}>
                    <Row>
                        <Col style={{ justifyContent: 'center', alignItems: 'center' }}>

                            <TouchableOpacity 
                                accessible={true}
                                testID="nextBtnSetUpBucketList"
                                accessibilityLabel="nextBtnSetUpBucketList"    
                                style={styles.nextButton} onPress={() => {this.props.navigation.navigate('SetupCalendar')}}>
                                <Text style={{color:"white", fontSize: 20, fontWeight:"bold"}}>
                                    Next
                                </Text>
                            </TouchableOpacity>

                        </Col>
                    </Row>
                </View> 
                </ScrollView>
            </View>
        );
    }
}

// const styles = StyleSheet.create({
//     container: {
//         // display: 'flex',
//     },
//     txtInput: {
//         width: 200,
//         height: 40,
//         borderRadius: 50,
//         borderColor: 'gray',
//         borderWidth: 0.5,
//         borderStyle: 'solid',
//         backgroundColor: 'white',
//         padding: 5,
//         paddingLeft: 15,
//         marginTop: 100,
//     },
//     btnStyle: {
//         width: 150,
//         height: 40,
//         borderRadius: 50,
//     },
//     listItem: {
//         padding: 10,
//         borderWidth: 0.5,
//         borderColor: 'grey',
//         borderStyle: 'solid',
//         marginBottom: 10,
//         width: 200,
//         height: 40,
//         borderRadius: 50,
//         justifyContent: 'center',

//     }
// });

const mapStateToProps = (state) => {
    return {
        bucket: state.bucket,
        //bucketItems: state.bucket.personData

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
      //  addBucket: (newItem) => dispatch(addBucket(newItem)),
        addToBucketList: (newItem) => dispatch(addToBucketList(newItem)),
        initializeBucketList: () => dispatch(initializeBucketList()),
        initalizeWishList: () => dispatch(initalizeWishList()),
        initializeMemories: () => dispatch(initializeMemories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetupBucketList);
