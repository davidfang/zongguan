import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  productItem: {
    height: 150,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeff1'
  },
  zhutu: {
    width: 150,
    height: 150
  },
  info: {
    flex: 1,
    paddingLeft: 5,
    justifyContent: 'space-around'
  },
  title: {
    height: 40,
    alignItems: 'center'
  },
  coupon: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  couponTitle: {
    backgroundColor: '#ff6600',
    color: '#fff',
    paddingLeft: 3,
    paddingRight: 3,
    borderWidth: 1,
    borderColor: '#ff6600',
    textAlign: 'center'
  },
  couponInfo: {
    borderWidth: 1,
    borderColor: '#ff6600',
    paddingLeft: 5,
    paddingRight: 5
  },
  sale: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  saleImage: {
    width: 18,
    height: 18,
    resizeMode: 'stretch'
  },
  saleInfo: {
    flex: 1
  },
  price: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cprice: {
    color: '#FF0000',
    fontSize: 16,
    fontWeight: 'bold'
  },
  rprice: {
    paddingLeft: 5,
    textDecorationLine: 'line-through',
    flex: 1,
    fontSize: 13
  }
})
