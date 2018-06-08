import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/EmptyStyle'

export default class Empty extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  static defaultProps = {
    text: '亲，木有了哦~'
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>{this.props.text}</Text>
      </View>
    )
  }
}
