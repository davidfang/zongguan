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

  _onChange = item => {
    let navigate = this.props.navigation && this.props.navigation.navigate
    navigate &&
    navigate('ChannelScreen', {
      title: item.title,
      channelId: item.id
    })

    /*if (item.id === this.state.selected) {
      return
    }
    this.setState({
      selected: item.id
    })
    this.props.onChange && this.props.onChange(item)*/
  }
  _renderItem = data => {
    let item = data.item
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this._onChange(item)}
        style={[
          styles.item,
          this.state.selected === item.id ? styles.selectedItem : null
        ]}
      >
        <Text style={this.state.selected === item.id ? styles.selected : null}>
          {item.title}
        </Text>
      </TouchableOpacity>
    )
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
            id: child.id
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
        <FlatList
          style={styles.body}
          horizontal={true}
          data={this.props.data}
          renderItem={this._renderItem}
          keyExtractor={item => item.id}
          extraData={this.state}
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.childs}>
          {channelInfo && channelInfo.data.map(child => this._child(child))}
        </View>
      </View>
    )
  }
}
