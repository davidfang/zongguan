import React, { Component } from 'react'
import R from 'ramda'
import PropTypes from 'prop-types'
import { TouchableOpacity, FlatList, Image, View, Text } from 'react-native'
import styles from './Styles/ChanelBarStyle'

export default class ChanelBar extends Component {
  // Prop type warnings
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    selected: PropTypes.number.isRequired
  }

  // Defaults for props
  static defaultProps = {
    data: []
  }

  constructor (props) {
    super(props)
    this.state = {
      selected: this.props.selected
    }
  }

  _child = child => {
    let navigate = this.props.navigation && this.props.navigation.navigate
    return (
      <TouchableOpacity
        key={child.id}
        activeOpacity={1}
        onPress={() => {
          navigate &&
          navigate('ClassifyListScreen', {
            title: child.title,
            channelId: child.id
          })
        }}
        style={styles.child}
      >
        <Image source={{uri: child.img}} style={styles.childImage}/>
        <Text style={styles.childText}>
          {child.title}
        </Text>
      </TouchableOpacity>
    )
  }

  render () {
    const channelInfo = R.find(R.propEq('id', this.state.selected))(this.props.data)
    return (
      <View style={styles.container}>
        <View style={styles.childs}>
          {channelInfo && channelInfo.data.map(child => this._child(child))}
        </View>
      </View>
    )
  }
}
