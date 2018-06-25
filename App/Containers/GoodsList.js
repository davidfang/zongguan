import React from 'react'
import { View, FlatList, RefreshControl } from 'react-native'

import ScrollToTop from '../Components/ScrollToTop'
import Empty from '../Components/Empty'
import Footer from '../Components/Footer'
import SectionListItem from '../Components/SectionListItem'
import ChanelBar from '../Components/ChanelBar'
import SortBar from '../Components/SortBar'

// Styles
import styles from './Styles/GoodsListStyle'

export default class GoodsList extends React.PureComponent {
  state = {isShow: false}
  /**
   * 加载数据
   */
  _loadDatas = () => {
    this.props.fetchRequest(this.props.channelId)
  }
  initDatas = () => {
    this.pageno = 1
    this._loadDatas()
  }

  componentWillMount () {
    if (this.props.data.length < 1) {
      this.props.fetchRequest(this.props.channelId)
    }
  }

  /**
   * 下拉刷新
   */
  _onRefreshing = () => {
    this.props.fetchRequest(this.props.channelId)
  }

  /**
   * 上拉加载
   */
  _onLoading = () => {
    this.props.fetchRequest(this.props.channelId)
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
