import React, { Component } from 'react';

import {
    View,
    Image,
    Text,
    TouchableHighlight
} from 'react-native'
import { Images } from '../Themes/'
import styles from './Styles/SelectItemStyle'
export default class SelectItem extends Component {

    render() {
        return (
            <TouchableHighlight underlayColor="#E6E6E6" onPress={this.props.onPress}>
                <View style={styles.item}>
                    <View style={styles.container}>
                        <Image source={this.props.icon} style={styles.img} />
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Image source={ Images.icMore } style={styles.skipImg}/>
                    </View>
                    {this.props.showline ? <View style={styles.underline} /> : <View/>}
                </View>
            </TouchableHighlight>
        )
    }
}
