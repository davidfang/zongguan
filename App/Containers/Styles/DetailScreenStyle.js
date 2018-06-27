import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  backIcon: {
    width: 30,
    height: 30,
    backgroundColor: Colors.windowTint,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    position: 'absolute',
    left: 25,
    top: 25,
    zIndex: 1000
  },
  autoImage: {
    margin: 0,
    padding: 0,
    resizeMode: 'stretch'
  },
  buyCard: {
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  coupon: {
    backgroundColor: '#f69919',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 70
  },
  getCoupon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fc3616',
    width: 120,
    height: 50
  },
  getCouponText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center'
  }
})
