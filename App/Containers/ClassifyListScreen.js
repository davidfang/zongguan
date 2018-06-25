import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'
import lodash from 'lodash'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import { GoodsCategorySelectors } from '../Redux/GoodsCategoryRedux'
import TbActions, { TbSelectors } from '../Redux/TbRedux'

import ChanelBar from '../Components/ChanelBar'
import SortBar from '../Components/SortBar'
import GoodsList from './GoodsList'

// Styles
import styles from './Styles/ClassifyListScreenStyle'
import { Colors } from '../Themes'

class ClassifyListScreen extends Component {
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
  _fetchRequest = (channelId) => {
    //alert(this.props.fetching)
    let more = this.props.more.hasOwnProperty(channelId) ? this.props.more[channelId] : true
    if (!this.props.fetching && more) {
      this.props.getTbChannelProduct(channelId)
    }
  }

  componentWillMount () {
    // this.props.getTbChannelProduct(this.props.channelId)
  }

  render () {
    return (
      <View style={styles.container}>
        <GoodsList
          ref={flat => (this._flatList = flat)}
          fetching={this.props.fetching}
          more={this.props.more}
          fetchRequest={this._fetchRequest}
          navigation={this.props.navigation}
          data={this.props.channelProductPrds}
          //channels={null}
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
  // 所有频道产品IDS
  const allChannelProductIds = TbSelectors.getAllChannelProductIds(state.tb)
  // 所有产品信息列表
  const allProductLists = TbSelectors.getProductLists(state.tb)
  // 频道产品
  const channelProductPrds = TbSelectors.getChannelProductPrds(state.tb, channelId)

  return {
    channelId,
    goodsCategories,
    channelProductIds,
    allChannelProductIds,
    allProductLists,
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

export default connect(mapStateToProps, mapDispatchToProps)(ClassifyListScreen)
