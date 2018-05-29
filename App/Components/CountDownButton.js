/**
 * Created by admin on 17/8/9.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native'

const CountDownButtonState = {
  CountDownButtonActive: 0,
  CountDownButtonDisable: 1
}

// {id , startTime, deathCount}
var timeRecodes = []  // 根据id来记录CountDownButton的信息

class CountDownButton extends Component {

  // 构造
  constructor (props) {
    super(props)
    // 初始状态
    this.state = {
      btnTitle: '默认'
    }
  }

  static propTypes = {
    id: PropTypes.string,          // 按钮的身份标识,同一个页面的按钮是同一个id
    beginText: PropTypes.string,   // 初始状态按钮title
    endText: PropTypes.string,     // 读秒结束后按钮的title
    count: PropTypes.number,       // 计时数
    pressAction: PropTypes.func,   // 按下按钮的事件,但是触发倒数需要你自己来调用方法
    changeWithCount: PropTypes.func,   // 读秒变化的函数,该函数带有一个参数count,表示当前的剩余事件
    end: PropTypes.func,           // 读秒完毕后的函数
    frameStyle: View.propTypes.style    // 初始化的位置大小
  }

  buttonState = CountDownButtonState.CountDownButtonActive

  componentWillMount () {
    this.shouldSetState = true
    this.setState({
      btnTitle: this.props.beginText
    })
  }

  componentDidMount () {
    const {id, changeWithCount} = this.props
    for (var i = 0; i < timeRecodes.length; i++) {
      let obj = timeRecodes[i]
      if (obj.id == id) {
        let liveTime = Date.now() - obj.startTime
        if (liveTime < obj.deathCount * 1000) {
          // 避免闪动
          let detalTime = Math.round(liveTime / 1000)
          let content = changeWithCount(obj.deathCount - detalTime)
          this.setState({
            btnTitle: content
          })
          // 手动调用倒计时
          this.startCountDownWithCount(obj.startTime)
        }
      }
    }

  }

  clearTime () {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  componentWillUnmount () {
    this.shouldSetState = false
    this.clearTime()
  }

  startCountDownWithCount (startTime) {
    this.buttonState = CountDownButtonState.CountDownButtonDisable
    const {changeWithCount, endText, count, end} = this.props
    this.startTime = startTime
    this.interval = setInterval(() => {
      let detalTime = Math.round((Date.now() - this.startTime) / 1000)
      let content = changeWithCount(count - detalTime)
      if (detalTime >= count) {
        content = endText
        this.clearTime()
        end && end()
        this.buttonState = CountDownButtonState.CountDownButtonActive
      }
      if (this.shouldSetState) {
        this.setState({
          btnTitle: content
        })
      }
    }, 1000)
  }

  recordButtonInfo () {
    const {id, count} = this.props
    var hasRecord = false
    for (var i = 0; i < timeRecodes.length; i++) {
      let obj = timeRecodes[i]
      if (obj.id == id) {
        obj.startTime = Date.now()
        hasRecord = true
        break
      }
    }
    if (!hasRecord) {
      let buttonInfo = {
        id: id,
        deathCount: count,
        startTime: Date.now()
      }
      timeRecodes.push(buttonInfo)
    }
  }

  // 外界调用
  startCountDown () {
    this.startCountDownWithCount(Date.now())
    this.recordButtonInfo()
  }

  render () {
    let isDisable = this.buttonState == CountDownButtonState.CountDownButtonDisable
    const {frameStyle} = this.props
    return (
      <TouchableOpacity disabled={isDisable}
                        onPress={() => {this.props.pressAction && this.props.pressAction()}}
                        style={[styles.buttonCommonStyle, isDisable ? styles.disableButtonStyle : styles.activeButtonStyle, frameStyle]}
      >
        <Text style={[styles.txtCommonStyle, isDisable ? styles.disableTxtStyle : styles.activeTxtStyle]}>
          {this.state.btnTitle}
        </Text>
      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({

  buttonCommonStyle: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'gray',
    paddingRight: 8,
    paddingLeft: 8,
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  // 禁用时候的TouchableOpacity样式
  disableButtonStyle: {
    backgroundColor: 'red'
  },
  // 可以点击时候的TouchableOpacity样式
  activeButtonStyle: {
    backgroundColor: 'green'
  },

  txtCommonStyle: {
    fontSize: 14
  },
  // 禁用时候的Text样式
  disableTxtStyle: {
    color: 'gray'
  },
  // 可以点击时候的Text样式
  activeTxtStyle: {
    color: 'black'
  }
})

export default CountDownButton
