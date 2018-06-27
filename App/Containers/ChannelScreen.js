import React, { Component } from 'react'
import { View } from 'react-native'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import lodash from 'lodash'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import { GoodsCategorySelectors } from '../Redux/GoodsCategoryRedux'
import TbActions, { TbSelectors } from '../Redux/TbRedux'

import GoodsList from './GoodsList'
// Styles
import styles from './Styles/ChannelScreenStyle'
import { Colors } from '../Themes'

class ChannelScreen extends Component {
  currentCat = 0

  constructor (props) {
    super(props)
    this.state = {
      scrollIsShow: false,
      channelId: props.channelId
    }
    this.channelId = props.channelId
  }

  _onCatChange = cat => {
    this.currentCat = cat.id
    //this._flatList.initDatas();
  }
  _fetchRequest = (channelId,sortId) => {
    let more = this.props.more.hasOwnProperty(channelId) ? this.props.more[channelId] : true
    if (!this.props.fetching && more) {
      this.props.getTbChannelProduct(channelId, sortId)
    }
  }

  componentWillMount () {
    // this.props.getTbChannelProduct(this.props.channelId)
  }

  render () {
    /***/
    return (
      <View style={styles.container}>
        <ScrollableTabView style={styles.scrollableTab}
                           tabBarBackgroundColor={Colors.silver}
                           tabBarActiveTextColor={Colors.fire}
                           tabBarInactiveTextColor={Colors.black}
                           tabBarUnderlineStyle={styles.scrollableTabBarUnderlineStyle}
                           renderTabBar={() => <ScrollableTabBar/>}
                           initialPage={lodash.findIndex(this.props.goodsCategories, {id: this.props.channelId})}
        >
          {
            this.props.goodsCategories.map((v, i) => {
              const channelProductPrds =  this.props.allChannelProductIds.hasOwnProperty(v.id) ? this.props.allChannelProductIds[v.id].map(id => this.props.allProductLists[id]) : []
              return (<GoodsList key={i} tabLabel={v.title}
                                 fetching={this.props.fetching}
                                 more={this.props.more}
                                 fetchRequest={(sortId) => this._fetchRequest(v.id, sortId)}
                                 navigation={this.props.navigation}
                                 data={channelProductPrds}
                                 channels={this.props.goodsCategories}
                                 channelId={v.id}
              />)

            })
          }
        </ScrollableTabView>

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

export default connect(mapStateToProps, mapDispatchToProps)(ChannelScreen)
