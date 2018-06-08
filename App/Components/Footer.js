import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import styles from './Styles/FooterStyle'

export default class Footer extends Component {
  // Prop type warnings
  static propTypes = {
    reloading: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
    more: PropTypes.bool.isRequired

  }

  // Defaults for props
  static defaultProps = {
    fetching: false,
    loadingText: '努力加载中...',
    failureText: '暂无数据，点我重新加载',
    noMoreText: '亲，没有更多数据了...'
  }

  render () {
    let eleFooter = null
    if (this.props.fetching) { // 努力加载中
      eleFooter = (
        <View style={styles.footerContainer}>
          <ActivityIndicator size='small' color='#888888'/>
          <Text style={[styles.footerText, {marginLeft: 7}]}>
            {this.props.loadingText}
          </Text>
        </View>
      )
    } else if (!this.props.more) { // 没有更多
      eleFooter = (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>{this.props.noMoreText}</Text>
        </View>
      )
    } else { // 暂无数据，点我重新加载
      const onReloading = () => {
        this.props.reloading && this.props.reloading()
      }
      eleFooter = (
        <TouchableOpacity
          style={styles.footerContainer}
          activeOpacity={1}
          onPress={onReloading}
        >
          <Text style={styles.footerText}>{this.props.failureText}</Text>
        </TouchableOpacity>
      )
    }
    return eleFooter
  }
}
