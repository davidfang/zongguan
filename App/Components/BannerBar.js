import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './Styles/BannerBarStyle'

export default class BannerBar extends Component {
  // // Prop type warnings
  static propTypes = {
    dataSource: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired
  }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  _renderChild = () => {
    let navigate = this.props.navigation && this.props.navigation.navigate
    let items = this.props.dataSource
    if (items && items.length >= 1) {
      return items.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => {
              const nav = item.nav != null ? item.nav : 'html'
              console.log(navigate)
              navigate &&
              navigate(nav, {
                title: item.title,
                url: item.url,
                ...item.params
              })
            }}
          >
            <Image
              style={styles.image}
              source={ typeof(item.img) == 'string'  ? { uri: item.img } : item.img }
            />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )
      })
    } else {
      return <View />
    }
  }
    render () {
    return (
      <View style={styles.container}>
        {this._renderChild()}
      </View>
    )
  }
}
