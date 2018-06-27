import React, { Component } from 'react'
import { ScrollView, View, Text, KeyboardAvoidingView, FlatList, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import BannersActions, {BannerSelectors} from '../Redux/BannerRedux'
import TbActions, {TbSelectors} from '../Redux/TbRedux'



import SearchBar from '../Components/SearchBar'
import ScrollToTop from '../Components/ScrollToTop'
import SwiperBanners from '../Components/SwiperBanners'
import BannerBar from '../Components/BannerBar'
import Lanmu from '../Components/Lanmu'
import Empty from '../Components/Empty'
import Footer from '../Components/Footer'
import SectionListItem from '../Components/SectionListItem'

// Styles
import styles from './Styles/HomeScreenStyle'

const itemHeight = 50

class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      scrollIsShow: false
    }
    this.flag = 1

  }

  /**
   * 头部模块
   */
  _renderHeader = () => {
    return (
      <View>
        <SwiperBanners
          dataSource={this.props.swiper}
          navigation={this.props.navigation}
        />
        <BannerBar dataSource={this.props.recommend} navigation={this.props.navigation}/>
        {/*<Lanmu navigation={this.props.navigation}/>*/}
      </View>
    )
  }
  /**
   * getItemLayout是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度。如果你的行高是固定的，getItemLayout用起来就既高效又简单
   */
  _itemLayout = (item, index) => {
    return {
      length: itemHeight,
      offset: itemHeight * index,
      index
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

  /**
   * 加载数据 TODO
   */
  _loadDatas = () => {

  }

  /**
   * 下拉刷新 TODO
   */
  _onRefreshing = () => {
    if (!this.props.fetching) {
      this.props.getTbIndexRecommend()
    }
  }

  /**
   * 上拉加载 TODO
   */
  _onLoading = () => {
    if (!this.props.fetching && this.props.tbIndexRecommendMore) {
      this.props.getTbIndexRecommend()
    }
  }

  _renderItem = ({item}) => (
    <SectionListItem navigation={this.props.navigation} product={item} />
  )
  componentWillMount() {
    // this.props.getTbIndexRecommend(1)
  }
  render () {
    const {navigate} = this.props.navigation
    return (
      <View style={styles.container}>
        <SearchBar
          showLogo={true}
          onSubmit={key => {
            navigate('ResultScreen', {
              keyWord: key
            })
          }}
        />
        <FlatList
          style={styles.listView}
          data={this.props.tbIndexRecommend}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          onEndReachedThreshold={0.3}
          ref={flat => (this._flatList = flat)}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<Empty />}
          getItemLayout={this._itemLayout}
          onEndReached={this._onLoading}
          renderItem={this._renderItem}
          onScroll={this._onScroll}
          ListHeaderComponent={this._renderHeader}
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
              more={this.props.tbIndexRecommendMore}
            />
          }
        />
        <ScrollToTop isShow={this.state.scrollIsShow} scrollTo={this._scrollToTop} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  // 获取数据 swiper recommend
  const items = BannerSelectors.getItems(state.banner)
  const swiper = BannerSelectors.getSwiper(state.banner).map(id => items[id])
  const recommend = BannerSelectors.getRecommend(state.banner).map(id => items[id])
  //静态固定的推荐位s
  const staticRecommend = [
    {
      id: 5,
      type: 'recommend',
      title: '女生',
      url: '',
      nav: 'SearchScreen',
      params: {
        id: 6
      },
      status: '1',
      img: require('../Images/9k91.png')
    },
    {
      id: 6,
      type: 'recommend',
      title: '品牌',
      url: '',
      nav: 'SearchScreen',
      params: {
        id: 6
      },
      status: '1',
      img: require('../Images/tejia.jpg')
    }
  ]

  // 获取首页淘宝推荐的产品
  const tbIndexRecommend = TbSelectors.getIndexRecommendPrds(state.tb)

  return {
    swiper,
    recommend: [...staticRecommend, ...recommend],
    tbIndexRecommend, // 首页淘宝推荐的产品
    fetching: state.tb.fetching, // 加载
    tbIndexRecommendMore: state.tb.indexRecommendMore // 更多
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTbIndexRecommend: () => dispatch(TbActions.tbIndexRecommendRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
