import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Text,  View,  TextInput,  TouchableOpacity,  Keyboard,  Image } from 'react-native'
import styles from './Styles/SearchBarStyle'

export default class SearchBar extends Component {
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
  constructor (props) {
    super(props)
    this.state = {
      inputText: this.props.text
    }
  }

  static defaultProps = {
    text: '',
    showLogo: false
  }

  searchClick = () => {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.inputText)
    }
    Keyboard.dismiss() // 回收展开的键盘
  }

  onTextChange = txt => {
    this.setState({
      inputText: txt
    })
  }

  clearInput = () => {
    this.setState({
      inputText: ''
    })
  }
  render() {
    let eleCancel = null
    if (this.state.inputText.length >= 1) {
      eleCancel = (
        <Text onPress={this.clearInput} style={styles.cancel}>
          X
        </Text>
      )
    }
    let logo = null
    if (this.props.showLogo) {
      logo = (
        <Image style={styles.logo} source={require('../Images/logo.png')} />
      )
    }
    return (
      <View style={[styles.container, this.props.style]}>
        {logo}
        <View style={styles.searchBox}>
          <Image
            source={require('../Images/search_icon.png')}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder='好宝贝 等你搜'
            returnKeyType='search'
            defaultValue={this.state.inputText}
            onChangeText={this.onTextChange}
            underlineColorAndroid='transparent'
            onSubmitEditing={this.searchClick}
            style={styles.searchInput}
          />
          {eleCancel}
        </View>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={this.searchClick}
        >
          <Text>搜索</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
