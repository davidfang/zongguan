import React, { Component } from 'react'
import { ScrollView, View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import SearchBar from '../Components/SearchBar'
import ScrollToTop from '../Components/ScrollToTop'
import SwiperBanners from '../Components/SwiperBanners'
import BannerBar from '../Components/BannerBar'

// Styles
import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShow: true,
      datas: []
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
      </View>
    )
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

  render () {
    const {navigate} = this.props.navigation
    return (
      <View style={styles.container}>
        <SearchBar
          showLogo={true}
          onSubmit={key => {
            navigate('result', {
              keyworld: key
            })
          }}
        />
        {this._renderHeader()}
        <BannerBar dataSource={this.props.recommend} navigation={this.props.navigation} />
        <KeyboardAvoidingView behavior='position'>
          <Text onPress={() => this.props.navigation.navigate('ChangePasswordScreen')}>HomeScreen</Text>
        </KeyboardAvoidingView>
        <ScrollToTop isShow={this.state.isShow} scrollTo={this._scrollToTop}/>
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  // 获取数据 swiper recommend
  const {swiper: _swiper = [], recommend: _recommend = [], items = {}} = state.banner
  const swiper = _swiper.map(id => items[id])
  const recommend = _recommend.map(id => items[id])
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

  return {
    swiper,
    recommend: [...staticRecommend, ...recommend]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
