import { StyleSheet } from 'react-native'
import {Colors, Metrics} from '../../Themes'

export default StyleSheet.create({
  container: {
    //flex: 1,
    //height: 200
    padding:3,
    backgroundColor:Colors.silver
  },
  productItem: {
    height: 200,
    width: Metrics.screenWidth * 0.3,
    flexDirection: 'column',
    padding: 5,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeff1',
    justifyContent: 'flex-start'
  },
  zhutu: {
    width: Metrics.screenWidth * 0.3,
    height: 100
  },
  info: {
    flex: 1,
    //paddingLeft: 5,
    // justifyContent: 'flex-start'
  },
  title: {
    // height: 40,
    alignItems: 'center'
  },
  coupon: {
    flexDirection: 'row',
    alignItems: 'center',
    top: -20
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
    fontSize: 15,
    fontWeight: 'bold'
  },
  rprice: {
    paddingLeft: 5,
    textDecorationLine: 'line-through',
    flex: 1,
    fontSize: 12
  }
})
