import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeff1',
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  selected: {
    color: '#FF0000'
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
