/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component,PureComponent } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    SectionList
} from 'react-native';

import SectionHeader from './SectionHeader'



export default class SectionListPage extends PureComponent {

    constructor(props){
        super(props);
        this.state = {
            //sectionList数据
            cellDataArray:[]
        };

        //源收据
        this.cellDatas = [
            {key:'1',title:'section1',show:true,data:[
                {key:'1',title:'row1'} ,
                {key:'2',title:'row2'} ,
                {key:'3',title:'row3'}
            ]
            },
            {key:'2',title:'section2',show:true,data:[
                {key:'4',title:'row1'} ,
                {key:'5',title:'row2'} ,
                {key:'6',title:'row3'}
            ]
            },
            {key:'3',title:'section3',show:true,data:[
                {key:'7',title:'row1'} ,
                {key:'8',title:'row2'} ,
                {key:'9',title:'row3'}
            ]
            },
            {key:'4',title:'section4',show:true,data:[
                {key:'10',title:'row1'} ,
                {key:'11',title:'row2'} ,
                {key:'12',title:'row3'}
            ]
            },

        ];

    }


    componentDidMount(){
        let newArray = JSON.parse(JSON.stringify(this.cellDatas));
        this.setState({
            cellDataArray:newArray
        })
    }


    handlerSectionHeader = (info) => {
        if (info.section.show) {
            this.state.cellDataArray.map((item, index) => {
                if (item === info.section) {
                    item.show = !item.show;
                    item.data = [{key:'close'}];
                }
            });

        }else {
            this.cellDatas.map((item,index) => {
                if (item.key === info.section.key){
                    let data = item.data;
                    this.state.cellDataArray.map((cellItem,i) => {
                        if (cellItem === info.section){
                            cellItem.show = !cellItem.show;
                            cellItem.data = data;
                        }
                    });
                }
            });

        }
        let newDatas= JSON.parse(JSON.stringify(this.state.cellDataArray));
        this.setState({
            cellDataArray:newDatas
        })
    };

    //sectionList头部
    _ListHeaderComponent = () => {
        return (
            <View style={{height:35,backgroundColor:'#CD7F32',alignItems:'center',justifyContent:'center'}}>
                <Text>
                    SectionList Header
                </Text>
            </View>
        );

    };
    //sectionList底部
    _ListFooterComponent = () => {
        return (
            <View style={{height:35,backgroundColor:'#CD7F32',alignItems:'center',justifyContent:'center'}}>
                <Text>
                    SectionList Footer
                </Text>
            </View>

        );

    };

    //section之间的间隔
    _renderSectionSeparatorComponent = (info) => {
        return(
            <View style={{height:15,backgroundColor:'#9370DB'}}>

            </View>
        );
    };
    //cell之间的间隔
    _renderItemSeparatorComponent = (info) => {
        return(
            <View style={{height:1,backgroundColor:'blue'}}>

            </View>
        );

    };
    //section头部
    _renderSectionHeader = (item) => {
        return (
            <SectionHeader
                info={item}
                handlerSectionHeader = {this.handlerSectionHeader.bind(this)}
            />
        );
    };

    //cell
    _renderItem = (info) => {

        //如果title为undefined （解决空数据section之间不显示问题）
        if (info.item.title == undefined){
            return( <View>

            </View>);

        }else {
            return (
                <View style={{height:40,backgroundColor:'white',justifyContent:'center'}}>
                    <Text style={{color:'red'}}>
                        {info.item.title}
                    </Text>
                </View>
            );
        }
    };
    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    ListHeaderComponent={this._ListHeaderComponent}
                    ListFooterComponent={this._ListFooterComponent}
                    SectionSeparatorComponent={this._renderSectionSeparatorComponent}
                    ItemSeparatorComponent={this._renderItemSeparatorComponent}
                    renderSectionHeader={this._renderSectionHeader}
                    renderItem={this._renderItem}
                    sections={this.state.cellDataArray}
                    extraData={this.state}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
});

