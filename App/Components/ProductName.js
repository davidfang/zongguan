import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import styles from './Styles/ProductNameStyle'

export default class ProductName extends Component {
  // Prop type warnings
  static propTypes = {
    product: PropTypes.object.isRequired
  }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    let {product} = this.props
    return (
      <View style={styles.product}>
        <Text style={styles.name} numberOfLines={2}>
          {product.title}
        </Text>
        <View style={styles.price}>
          <View style={styles.oldPrice}>
            <Text>券后价</Text>
            <Text style={styles.salePrice}>￥{product.rebatePrice}</Text>
            <Text style={styles.rprice}>￥{product.costPrice}</Text>
          </View>
          <View style={styles.coupon}>
            <Text style={styles.couponTitle}>券</Text>
            <Text style={styles.couponInfo}>{product.couponPrice}</Text>
          </View>
          <Text >已售{product.purchaseNum}件</Text>
        </View>
        <Text
          style={{
            //marginTop: 5,
            //marginBottom: 5
            color: '#FF3C00',
            textAlign: 'center'
          }}
        >
          -----相关推荐-----
        </Text>
      </View>
    )
  }
}
