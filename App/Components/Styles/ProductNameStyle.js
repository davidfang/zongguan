import { StyleSheet } from 'react-native'
import {Metrics} from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  product: {
    backgroundColor: '#fff',
    width: Metrics.screenWidth,
    padding: 10,
    justifyContent: 'space-around'
  },
  name: {
    width: '100%',
    textAlignVertical: 'center',
    flexDirection: 'row',
    paddingBottom: 5
  },
  price: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between'
  },
  salePrice: {
    fontSize: 18,
    color: '#fc3616',
    fontWeight: 'bold',
    marginLeft: 5,
    marginRight: 5
  },
  oldPrice: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  rprice: {
    textDecorationLine: 'line-through'
  },
  coupon: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  couponTitle: {
    backgroundColor: '#ff6600',
    color: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: '#ff6600',
    textAlign: 'center'
  },
  couponInfo: {
    borderWidth: 1,
    borderColor: '#ff6600',
    paddingLeft: 15,
    paddingRight: 10
  }
})
