import React, { Component } from 'react'
import { View} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import { GoodsCategorySelectors } from '../Redux/GoodsCategoryRedux'
import TbActions, { TbSelectors } from '../Redux/TbRedux'


import GoodsList from './GoodsList'

// Styles
import styles from './Styles/ClassifyListScreenStyle'

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
  _fetchRequest = (channelId) => {
    //alert(this.props.fetching)
    let more = this.props.more.hasOwnProperty(channelId) ? this.props.more[channelId] : true
    if (!this.props.fetching && more) {
      this.props.getTbChannelProduct(channelId, this.currentSort)
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
  // 更多
  const more = state.tb.channelProductMore.hasOwnProperty(channelId) ? state.tb.channelProductMore[channelId] : true
  return {
    channelId,
    goodsCategories,
    channelProductIds,
    allChannelProductIds,
    allProductLists,
    channelProductPrds,

    fetching: state.tb.fetching, // 加载
    more: more // 更多
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTbChannelProduct: (channelId, sortId) => dispatch(TbActions.tbChannelProductRequest(channelId, sortId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassifyListScreen)
