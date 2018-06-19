import React, { Component } from 'react'
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import AutoImage from 'react-native-scalable-image'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import TbActions, { TbSelectors } from '../Redux/TbRedux'

import ScrollToTop from '../Components/ScrollToTop'
import ProductImages from '../Components/ProductImages'
import ProductName from '../Components/ProductName'
// Styles
import styles from './Styles/DetailScreenStyle'
import { Metrics } from '../Themes'

class DetailScreen extends Component {

  constructor (props) {
    super(props)
    const {goodsId, title, goodsInfo} = this.props.navigation.state.params
    this.flag = 1
    this.state = {
      goodsId, title, goodsInfo,
      product: {},
      scrollIsShow: false
    }
  }

  _onScroll = e => {
    const offsetY = e.nativeEvent.contentOffset.y
    this.setState({
      scrollIsShow: offsetY > 100
    })
  }

  _scrollToTop = () => {
    this._flatList.scrollToOffset({offset: 0, animated: true})
  }
  _goBuy = () => {
    let {goodsInfo} = this.state
    this.destory = 1
    alert('aaaaaa')
    //RNAlibcSdk.Show(goodsInfo.SPYHQTGLJ)
  }

  _renderItem = ({item}) => {
    return (
      <AutoImage
        width={Metrics.screenWidth}
        style={styles.autoImage}
        source={{uri: item.imgUrl}}
        resizeMode='cover'
      />
    )
  }

  _renderHeader = () => {
    let {goodsInfo} = this.state
    let {smallImages} = this.props
    return (
      <View>
        <ProductImages source={smallImages}/>
        <ProductName product={goodsInfo}/>
        <View
          style={{
            borderLeftColor: '#FF0036',
            borderLeftWidth: 3,
            borderStyle: 'solid',
            height: 45,
            padding: 3,
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
            marginTop: 5
          }}
        >
          <Text
            style={{
              fontSize: 18,
              paddingLeft: 10
            }}
          >
            商品图片
          </Text>
        </View>
      </View>
    )
  }

  componentDidMount () {
    const {smallImages, detailImages, guessLike} = this.props
    if (!smallImages.length && !detailImages.length && !guessLike.length) {
      this.props.getTbDetail(this.state.goodsId)
    }
  }

  render () {
    let {goodsInfo} = this.state
    return (
      <View style={styles.container}>
        <FlatList
          ref={flat => (this._flatList = flat)}
          onScroll={this._onScroll}
          ListHeaderComponent={this._renderHeader}
          keyExtractor={(item, index) => index}
          data={this.props.detailImages}
          renderItem={this._renderItem}
        />
        <ScrollToTop isShow={this.state.scrollIsShow} scrollTo={this._scrollToTop}/>
        <TouchableOpacity
          style={styles.buyCard}
          activeOpacity={1}
          onPress={this._goBuy}
        >
          <Text style={{marginLeft: 5, flex: 1}}>
            券后价：
            <Text style={{color: '#fc3616'}}>￥</Text>
            <Text
              style={[styles.salePrice, {fontSize: 24, color: '#fc3616'}]}
            >
              {goodsInfo.rebatePrice}
            </Text>
          </Text>
          <View
            style={styles.coupon}
          >
            <Text style={{color: '#fff'}}>优惠券</Text>
            <Text style={{color: '#fff'}}>{goodsInfo.couponPrice}元</Text>
          </View>
          <View style={styles.getCoupon}>
            <Text
              style={styles.getCouponText}
            >
              领券购买
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  //const {nav: {routes: [, {params}]}} = state
  const {navigation: {state: {params}}} = props
  return {
    smallImages: TbSelectors.getSmallImages(state.tb, params.goodsId),
    detailImages: TbSelectors.getDetailImages(state.tb, params.goodsId),
    guessLike: TbSelectors.getGuessLikePrds(state.tb, params.goodsId),
    ...params
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTbDetail: (goodsId) => dispatch(TbActions.tbDetailRequest(goodsId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen)
