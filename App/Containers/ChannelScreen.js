import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import { GoodsCategorySelectors } from '../Redux/GoodsCategoryRedux'
import TbActions, { TbSelectors } from '../Redux/TbRedux'

import ChanelBar from '../Components/ChanelBar'
import SortBar from '../Components/SortBar'
import GoodsList from './GoodsList'
// Styles
import styles from './Styles/ChannelScreenStyle'

class ChannelScreen extends Component {
  currentCat = 0
  currentSort = 0
  constructor (props) {
    super(props)
    this.state = {
      scrollIsShow: false
    }
  }
  _onCatChange = cat => {
    this.currentCat = cat.id
    //this._flatList.initDatas();
  }
  _onSortChange = sort => {
    this.currentSort = sort
    //this._flatList.initDatas();
  }
  _fetchRequest = () => {
    //alert(this.props.fetching)
    if (!this.props.fetching && this.props.more) {
      this.props.getTbChannelProduct(this.props.channelId)
    }
  }

  componentWillMount () {
    // this.props.getTbChannelProduct(this.props.channelId)
  }

  render () {
    /***/
    return (
      <View style={styles.container}>S
        {/*<ChanelBar data={this.props.goodsCategories} navigation={this.props.navigation}
                   selected={this.props.channelId}/>
        <SortBar onChange={this._onSortChange}/>*/}
        <GoodsList
          ref={flat => (this._flatList = flat)}
          fetching={this.props.fetching}
          more={this.props.more}
          fetchRequest={this._fetchRequest}
          navigation={this.props.navigation}
          data={this.props.channelProductPrds}
          channels={this.props.goodsCategories}
          channelId={this.props.channelId}
          onSortChange={this._onSortChange}
        />
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  const {navigation: {state: {params}}} = props
  const {channelId} = params

  const goodsCategories = GoodsCategorySelectors.getData(state.goodsCategory)// 产品分类
  // 频道产品IDS
  const channelProductIds = TbSelectors.getChannelProductIds(state.tb, channelId)
  // 频道产品
  const channelProductPrds = TbSelectors.getChannelProductPrds(state.tb, channelId)

  return {
    channelId,
    goodsCategories,
    channelProductIds,
    channelProductPrds,
    fetching: state.tb.fetching, // 加载
    more: state.tb.channelProductMore // 更多
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTbChannelProduct: (channelId) => dispatch(TbActions.tbChannelProductRequest(channelId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelScreen)
