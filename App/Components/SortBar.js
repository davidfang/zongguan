import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/SortBarStyle'

export default class SortBar extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }
  sorts = [
    {
      id: 0,
      name: '人气'
    },
    {
      id: 1,
      name: '销量'
    },
    {
      id: 2,
      name: '到手价'
    },
    {
      id: 3,
      name: '推荐'
    }
  ]

  constructor (props) {
    super(props)
    this.state = {
      selected: 4
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return this.state.selected != nextState.selected
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired
  }

  static defaultProps = {
    data: this.sorts
  }

  _onChange = item => {
    if (item.id === this.state.selected) {
      return
    }
    this.setState({
      selected: item.id
    })
    this.props.onChange && this.props.onChange(item.id)
  }

  render () {
    return (
      <View style={styles.container}>
        {this.sorts.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={1}
              onPress={() => this._onChange(item)}
              style={styles.item}
            >
              <Text
                style={this.state.selected === item.id ? styles.selected : null}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
}
