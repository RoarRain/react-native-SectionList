/**
 * Created by denzyl on 2017/8/6.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    Image,
    Easing
} from 'react-native';

const  top_arrow = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABZklEQVRYR+2Uy06DQBSG/2FK2bgwcqs+gPeFT2Ai3bjwfY2bsnPvpfoKBZRNjQlzATOEJi1py6WLxmRYwnD+73znAMGeL7LnfGgAbUAb0Ab+rwHP83whxFNRFJJb1v3PbJb0+av2MqDCMylDClxUoe/MNIM+EJ0BXNcdsTyfVOHTHCAGcAmgF0QngDJciJAaxjmAqTkYBMpAJkRYQZT3oiiK246jNUAtfKVb3/c9LsQEwNUCrC1EKwDHcY6llCExjDMAb8w0x/V5L0PkwMeQ0iCO46jJRCNAPZwzFszn8691hftAbAVYCSfklWfZeFP4AuhgNHKHnIdqHBL4tCi922ZiI4DjOCdCLRelp2gZXoNQO3GtIIaGESRJMltnbSPAoW1Py80uihfOuer8u2mey88rEyWEqpGm6U0ngCPbfpYAyRl76Bq+YoKxRwC/aZredgLo0u0uZxu/gl2Kt3lXA2gD2oA28Acz8rwhW6SpsAAAAABJRU5ErkJggg=='
export default class SectionHeader extends Component {

    constructor(props){
        super(props);
        this.state = {
            rotateValue: new Animated.Value(0),
        }
    }

    handlerSectionHeader = (info) => {
        this.props.handlerSectionHeader(info);
        if (info.section.show) {
            this.state.rotateValue.setValue(180);
            Animated.timing(this.state.rotateValue, {
                toValue: 0,
                duration: 400,
                easing: Easing.linear
            }).start();// 开始spring动画

        }else {
            this.state.rotateValue.setValue(0);
            Animated.timing(this.state.rotateValue, {
                toValue: 180,
                duration: 400,
                easing: Easing.linear
            }).start();// 开始spring动画
        }

    };

    render() {

        const {info} = this.props;

      return(
          <View style={styles.container}>
              <TouchableOpacity
                  onPress={() => this.handlerSectionHeader(info)}
                  style={styles.subView}
              >
                  <Text>
                      {info.section.title}
                  </Text>

                      <Animated.Image
                          style={[styles.image,
                                     {transform:[{
                                             rotate:
                                             this.state.rotateValue.interpolate({
                                                     inputRange: [0, 180],
                                                     outputRange: ['0deg', '180deg']
                                                 })
                                               }]
                                        }
                                     ]}
                          source={{uri:top_arrow}}>

                      </Animated.Image>
              </TouchableOpacity>
          </View>

      ) ;

    };

}


const styles = StyleSheet.create({
    container: {
    height:30,
    backgroundColor:'#38B0DE',
    justifyContent:'center'
    },
    subView: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:20
    },
    image: {
        width:16,
        height:16,
        marginLeft:25

    }
});
