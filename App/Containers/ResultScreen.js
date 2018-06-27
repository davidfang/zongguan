import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import TbActions, { TbSelectors } from '../Redux/TbRedux'
import GoodsList from './GoodsList'
// Styles
import styles from './Styles/ResultScreenStyle'

import SearchBar from '../Components/SearchBar'

let _this = null

class ResultScreen extends Component {
  static navigationOptions = ({navigation}) => {
    let {params = {}} = navigation.state
    return {
      header: <SearchBar
        text={params.keyWord}
        showLogo={true}
        onSubmit={key => _this._changeKeyWord(key)}
      />
    }
  }

  componentDidMount () {
    _this = this
    this._fetchRequest(4)
  }

  _changeKeyWord = (keyWord) => {
    this.setState({keyWord})
    this.props.searchKeyWord(keyWord)
  }

  constructor (props) {
    super(props)
    this.state = {
      keyWord: props.keyWord
    }
  }

  _fetchRequest = (sortId) => {
    if (!this.props.fetching && this.props.more) {
      this.props.searchKeyWord(this.state.keyWord, sortId)
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <GoodsList
          ref={flat => (this._flatList = flat)}
          fetching={this.props.fetching}
          more={this.props.more}
          fetchRequest={this._fetchRequest}
          navigation={this.props.navigation}
          data={this.props.searchResult}
        />
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  let {navigation: {state: {params}}} = props
  let {keyWord} = params
  let searchResult = TbSelectors.getSearchKeyWordPrds(state.tb, keyWord)
  return {
    keyWord,
    searchResult,
    fetching: state.tb.fetching, // 加载
    more: state.tb.searchMore // 更多
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchKeyWord: (keyWord, sortId) => dispatch(TbActions.tbSearchRequest(keyWord, sortId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultScreen)
