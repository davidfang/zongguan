import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import {GoodsCategorySelectors} from '../Redux/GoodsCategoryRedux'

import ChanelBar from '../Components/ChanelBar'
import SortBar from '../Components/SortBar'
// Styles
import styles from './Styles/ChannelScreenStyle'

class ChannelScreen extends Component {

  render () {
    return (
      <View style={styles.container}>
        <ChanelBar data={this.props.goodsCategories} navigation={this.props.navigation} selected={this.props.channel}/>
        <SortBar />
        <KeyboardAvoidingView behavior='position'>
          <Text>ChannelScreen</Text>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  const {navigation: {state: {params}}} = props
  const goodsCategories = GoodsCategorySelectors.getData(state.goodsCategory)
  return {
    channel: params.channelId,
    goodsCategories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelScreen)
