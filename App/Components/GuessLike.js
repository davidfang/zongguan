import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native'
import SectionListItem from './SectionListItem'
import styles from './Styles/GuessLikeStyle'

export default class GuessLike extends Component {
  // Prop type warnings
  static propTypes = {
    goods: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired
  }

  // Defaults for props
  static defaultProps = {
    goods: []
  }
  _onRedirect = (product, navigation) => {
    // const {product, navigation} = this.props
    navigation.navigate &&
    navigation.navigate('DetailScreen', {
      goodsId: product.goodsId,
      title: product.title,
      goodsInfo: product
    })
  }

  // shouldComponentUpdate (nextProps, nextState) {
  //   return !is(Map(this.props.goods), Map(nextProps.goods))
  // }

  _renderItem = ({item}) => {
    const product = item
    const {navigation} = this.props
    console.log('SectionListItem')
    return (
      <TouchableOpacity
        onPress={() => this._onRedirect(product, navigation)}
        activeOpacity={1}
        style={styles.productItem}
      >
        <Image style={styles.zhutu} source={{uri: product.objUrl}}/>
        <View style={styles.coupon}>
          {/* 券信息 */}
          <Text style={styles.couponTitle}>券</Text>
          <Text style={styles.couponInfo}>￥{product.couponPrice}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>

          <View style={styles.price}>
            <View
              style={{flexDirection: 'row', alignItems: 'baseline', flex: 1}}
            >
              <Text style={styles.cprice}>￥{product.rebatePrice}</Text>
            </View>
            <View
              style={{flexDirection: 'row', alignItems: 'baseline', flex: 1}}
            >
              <Text style={styles.rprice}>￥{product.costPrice}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  _renderItem2 = (item) => {
    return (<SectionListItem product={item} navigation={this.props.navigation}/>)
  }

  render () {
    return (
      <FlatList
        style={styles.container}
        horizontal={true}
        data={this.props.goods}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index}
      />
    )
  }
}
