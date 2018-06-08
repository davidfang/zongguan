import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, Image, TouchableOpacity, SectionList } from 'react-native'
import styles from './Styles/SectionListItemStyle'
import { is, Map } from 'immutable'

export default class SectionListItem extends Component {
  // Prop type warnings
  static propTypes = {
    product: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  }

  // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  constructor (props) {
    super(props)
  }

  _onRedirect = () => {
    const {product, navigation} = this.props
    navigation.navigate &&
    navigation.navigate('detail', {
      itemId: product.SPID,
      title: product.SPMC,
      intro: product
    })
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !is(Map(this.props.product), Map(nextProps.product))
  }

  render () {
    const {product, navigation} = this.props
    console.log('SectionListItem')
    return (
      <TouchableOpacity
        onPress={this._onRedirect}
        activeOpacity={1}
        style={styles.productItem}
      >
        <Image style={styles.zhutu} source={{uri: product.pict_url}}/>
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>
          <View style={styles.coupon}>
            {/* 券信息 */}
            <Text style={styles.couponTitle}>券</Text>
            <Text style={styles.couponInfo}>￥{product.CP}</Text>
          </View>
          <View style={styles.sale}>
            <Image style={styles.saleImage}/>
            <Text style={styles.saleInfo}>已售 {product.volume}件</Text>
          </View>
          <View style={styles.price}>
            <View
              style={{flexDirection: 'row', alignItems: 'baseline', flex: 1}}
            >
              <Text>券后价</Text>
              <Text style={styles.cprice}>￥{product.zk_final_price}</Text>
            </View>
            <View
              style={{flexDirection: 'row', alignItems: 'baseline', flex: 1}}
            >
              <Text>原价</Text>
              <Text style={styles.rprice}>￥{product.reserve_price}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
