import React from 'react'
import { View, Text, FlatList, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import TbActions, { TbSelectors } from '../Redux/TbRedux'

import ScrollToTop from '../Components/ScrollToTop'
import Empty from '../Components/Empty'
import Footer from '../Components/Footer'
import SectionListItem from '../Components/SectionListItem'
import ChanelBar from '../Components/ChanelBar'
import SortBar from '../Components/SortBar'


// Styles
import styles from './Styles/GoodsListStyle'
import { GoodsCategorySelectors } from '../Redux/GoodsCategoryRedux'

export default class GoodsList extends React.PureComponent {
  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/
  state = {
    dataObjects: [
      {title: 'First Title', description: 'First Description'},
      {title: 'Second Title', description: 'Second Description'},
      {title: 'Third Title', description: 'Third Description'},
      {title: 'Fourth Title', description: 'Fourth Description'},
      {title: 'Fifth Title', description: 'Fifth Description'},
      {title: 'Sixth Title', description: 'Sixth Description'},
      {title: 'Seventh Title', description: 'Seventh Description'}
    ],
    datas: [
      {
        goodTotal: 2520,
        earnSum: '',
        goodsId: 42210818322,
        objUrl: 'https://img.alicdn.com/imgextra/i1/2659514323/TB2tHiMbyQnBKNjSZFmXXcApVXa_!!2659514323.jpg_250x250.jpg',
        costPrice: 5.8,
        rebatePrice: 4.8,
        couponPrice: 1,
        videoId: 0,
        source: 0,
        userType: null,
        purchaseNum: 56089,
        title: 'PVC护角条 护墙角保护条墙护角条贴防撞条线包阳角线 免打孔护角'
      },
      {
        goodTotal: 14200,
        earnSum: '',
        goodsId: 40651415322,
        objUrl: 'https://img.alicdn.com/imgextra/i4/1050131635/TB2m87QaoF7MKJjSZFLXXcMBVXa_!!1050131635.jpg_250x250.jpg',
        costPrice: 13.9,
        rebatePrice: 11.9,
        couponPrice: 2,
        videoId: 0,
        source: 1,
        userType: null,
        purchaseNum: 55743,
        title: '男士短袖t恤夏季纯棉潮流圆领纯色韩版修身黑白色潮牌半袖打底衫'
      },
      {
        goodTotal: 41898,
        earnSum: '',
        goodsId: 536695141637,
        objUrl: 'https://img.alicdn.com/imgextra/i4/202224264/TB26je9pOC9MuFjSZFoXXbUzFXa_!!202224264.jpg_250x250.jpg',
        costPrice: 66,
        rebatePrice: 56,
        couponPrice: 10,
        videoId: 0,
        source: 1,
        userType: null,
        purchaseNum: 55473,
        title: '五谷磨房 红豆薏米粉代餐粉 红枣薏仁粉五谷杂粮磨坊现磨营养早餐'
      },
      {
        goodTotal: 0,
        earnSum: '',
        goodsId: 569011162529,
        objUrl: 'https://img.alicdn.com/bao/uploaded/i2/938298246/TB2yIcow29TBuNjy0FcXXbeiFXa_!!938298246-0-item_pic.jpg_250x250.jpg',
        costPrice: 39.9,
        rebatePrice: 39.9,
        couponPrice: 0,
        videoId: 0,
        source: 1,
        userType: null,
        purchaseNum: 55467,
        title: '御庄园嘉兴粽子礼盒装端午节礼品蛋黄肉粽鲜肉粽手工团购8粽8味'
      }
    ]
  }

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow ({item}) {
    return (
      <View style={styles.row}>
        <Text style={styles.boldLabel}>{item.title}</Text>
        <Text style={styles.label}>{item.description}</Text>
      </View>
    )
  }

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  // Render a header?
  renderHeader = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Header - </Text>

  // Render a footer?
  renderFooter = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>

  // Show this when data is empty
  renderEmpty = () =>
    <Text style={styles.label}> - Nothing to See Here - </Text>

  renderSeparator = () =>
    <Text style={styles.label}> - ~~~~~ - </Text>

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 10

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  render2 () {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataObjects}
          renderItem={this.renderRow}
          numColumns={2}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          onEndReachedThreshold={0.3}
          keyExtractor={this.keyExtractor}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    )
  }

  /**
   * 加载数据
   */
  _loadDatas = () => {
    if (!this.props.fetching && this.props.more) {
      this.props.fetchRequest()
    }
  }
  initDatas = () => {
    this.pageno = 1;
    this._loadDatas();
  }
  componentWillMount () {
    if (this.props.data.length < 1) {
      this.props.fetchRequest()
    }
  }

  /**
   * 下拉刷新
   */
  _onRefreshing = () => {
    if (!this.props.fetching && this.props.more) {
      this.props.fetchRequest()
    }
  }

  /**
   * 上拉加载
   */
  _onLoading = () => {
    //alert(this.props.fetching)
    if (!this.props.fetching && this.props.more) {
      this.props.fetchRequest()
    }
  }

  _renderItem = ({item}) => (
    <SectionListItem navigation={this.props.navigation} product={item}/>
  )

  /**
   * getItemLayout是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度。如果你的行高是固定的，getItemLayout用起来就既高效又简单
   */
  _itemLayout = (item, index) => {
    const height = this.props.itemHeight ? this.props.itemHeight : 50
    return {
      length: height,
      offset: height * index,
      index
    }
  }

  _onScroll = e => {
    const offsetY = e.nativeEvent.contentOffset.y
    this.setState({
      isShow: offsetY > 100
    })
  }

  _scrollToTop = () => {
    this._flatList.scrollToOffset({offset: 0, animated: true})
  }
  _renderHeader = () => {
    return (
      <View>
        {this.props.channels && <ChanelBar data={this.props.channels} navigation={this.props.navigation}
                   selected={this.props.channelId}/>}
        <SortBar onChange={this.props.onSortChange}/>
      </View>
    )
  }
  render () {
    return (
      <View style={styles.container}>
        <FlatList

          style={styles.listView}
          data={this.props.data}
          numColumns={1}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          onEndReachedThreshold={0.5}
          ref={flat => (this._flatList = flat)}
          keyExtractor={(item, index) => index}
          ListEmptyComponent={<Empty/>}
          getItemLayout={this._itemLayout}
          onEndReached={this._onLoading}
          ListHeaderComponent={this._renderHeader}
          renderItem={this._renderItem}
          onScroll={this._onScroll}
          refreshControl={
            <RefreshControl
              onRefresh={this._onRefreshing}
              refreshing={this.props.fetching}
              title={this.props.fetching ? '刷新数据中' : '松开立即更新'}
            />
          }
          ListFooterComponent={
            <Footer
              reloading={this._onLoading}
              fetching={this.props.fetching}
              more={this.props.more}
            />
          }
        />
        <ScrollToTop isShow={this.state.isShow} scrollTo={this._scrollToTop}/>
      </View>
    )
  }
}

/*const mapStateToProps = (state, props) => {
  //const channelId = props.channelId
  const channelId = 21779
  const channelProductIds = TbSelectors.getChannelProductIds(state.tb, channelId)
  // 频道产品
  const channelProductPrds = TbSelectors.getChannelProductPrds(state.tb, channelId)

  return {
    channelId,
    channelProductIds,
    p:props,
    data: channelProductPrds,
    fetching: state.tb.fetching, // 加载
    more: state.tb.channelProductMore // 更多
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTbChannelProduct: (channelId) => dispatch(TbActions.tbChannelProductRequest(channelId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodsList)*/
