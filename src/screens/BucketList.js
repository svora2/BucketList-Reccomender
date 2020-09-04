//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { displayList, deleteFromList, addToBucketList } from '../actions/bucketAction'
import EachItem from '../components/EachItem'
import { SearchBar, Icon, Button } from 'react-native-elements';
import { getSearchBucketList } from "../actions/searchAction";

const mapStateToProps = (state) => {
    return {
        personData: state.bucket.personData,
        searchBucketList: state.search.searchBucketList,
        search: state.search.search
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToBucketList: (newItem) => dispatch(addToBucketList(newItem)),
        displayList: () => dispatch(displayList()),
        deleteFromList: (delItem) => dispatch(deleteFromList(delItem)),
        getSearchBucketList: search => dispatch(getSearchBucketList(search))
    };
}

// create a component
class NewItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // ItemtoAdd: this.props.ItemtoAdd,
            text: "",
            search: ""
        }
    }

    addItemHandler = () => {

        let existing = false;
        if (this.state.text.length != 0) {
            let existingItems = this.props.personData;
            console.log("existing Items:" + JSON.stringify(existingItems))
            for (var i = 0; i < existingItems.length; i++) {
                if ((existingItems[i].eachItem[1].item) == this.state.text) {
                    existing = true;
                }
            }
            if (existing != true) {
                this.props.addToBucketList(this.state);
            }
            else {
                Alert.alert("Item already existing in the list")
            }
        }
       // console.log("done displaying")

    };

    deleteHandler = (deleteItem) => {
        //console.log("delKey in eachItem: " + deleteItem)
        this.props.deleteFromList(deleteItem);
        this.forceUpdate;
    };

    componentDidMount() {
        this.props.getSearchBucketList("");
    }

    render() {
        // console.log("personData = " +JSON.stringify(this.props.personData));
        return (
            <View>
                <SearchBar
                        accessible={true}
                        testID="searchTextBucketList"
                        accessibilityLabel="searchTextBucketList"
                        placeholder="Type Here..."
                        onChangeText={this.props.getSearchBucketList}
                        value={this.props.search}
                />
                <View style={styles.container}>
                    
                    <TextInput
                        accessible={true}
                        testID="addItemTxtBucketList"
                        accessibilityLabel="addItemTxtBucketList"
                        onChangeText={(input) => this.setState({ text: input })}
                        placeholder="Add item"
                        style={styles.addItem}
                    />
                    <Button
                        accessible={true}
                        testID="addItemBtnBucketList"
                        accessibilityLabel="addItemBtnBucketList"
                        style={styles.addButton}
                        icon={<Icon type="font-awesome" name="plus-square" color="#ffffff" backgroundColor="grey"></Icon>}
                        onPress={this.addItemHandler}
                    ></Button>
                </View>
                <ScrollView>
                    {
                        // console.log("personData in render" + JSON.stringify(this.props.personData)),
                        this.props.searchBucketList.map((item, key) => (
                            <View key={key} style = {styles.container}>
                                
                                <EachItem 
                                  itemVal={item.eachItem[1].item} 
                                  keyVal={item.eachItem[0]} 
                                />

                                <Button 
                                    accessible={true}
                                    testID="deleteItemBtnBucketList"
                                    accessibilityLabel="deleteItemBtnBucketList"
                                    buttonStyle= {{backgroundColor: "#a3cdd4"}}
                icon={<Icon type="font-awesome" name="trash" color="#ffffff"></Icon>}
                                  onPress={() => this.deleteHandler(item.eachItem[0])}
                                  
                               ></Button>
                                
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        );
    }

    componentDidUpdate(prevProps) {
        if (prevProps.personData !== this.props.personData){
            this.props.getSearchBucketList("")
        }
        //console.log("Search",this.props.search)
        // if(prevProps.recommendList !== this.props.recommendList){
        //     this.props.recommendationsToList(this.props.recommendList);
        // }
        // if(this.props.search.length != 0 && prevProps.search !== this.props.search){
        //     this.props.recommendationsToList(this.props.searchList);
        // }
        // else if(this.props.search.length == 0 && prevProps.search !== this.props.search){
        //     this.props.recommendationsToList(this.props.recommendList);
        // }
    }

}

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 30,
        marginHorizontal: 20
    },
    addButton: {
        height: 50,
        flex: 1,
        padding: 5
    },
    addItem: {
        borderWidth: 1,
        borderColor: '#f2f2e1',
        backgroundColor: '#D3D3D3',
        height: 50,
        flex: 1,
        padding: 5
    }

});

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(NewItem);
