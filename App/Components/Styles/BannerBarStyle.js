import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    width: Metrics.width,
    height: 100,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.silver
  },
  item: {
    flex: 1,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5
  },
  image: {
    width: 50,
    height: 50
  },
  title: {
    marginTop: 5,
    textAlign: 'center'
  }
})
