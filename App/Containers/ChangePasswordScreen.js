import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import PasswordActions from '../Redux/PasswordRedux'
import t from 'tcomb-form-native'

// Styles
import styles from './Styles/ChangePasswordScreenStyle'
import {FormStyles} from '../Themes'

let Form = t.form.Form
class ChangePasswordScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      formModel: t.struct({
        password: t.String,
        confirmPassword: t.String
      }),
      formValue: { password: null, confirmPassword: null },
      formOptions: {
        stylesheet: FormStyles,
        fields: {
          password: {
            label: '密码',
            secureTextEntry: true,
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('confirmPassword').refs.input.focus()
          },
          confirmPassword: {
            label: '重复密码',
            secureTextEntry: true,
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm()
          }
        }
      },
      success: false
    }
    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  submitForm () {
    this.setState({
      success: false
    })
    // call getValue() to get the values of the form
    const value = this.refs.form.getValue()
    if (value) { // if validation fails, value will be null
      if (value.password !== value.confirmPassword) {
        Alert.alert('注意', '密码修改失败', [{text: 'OK'}])
        return
      }
      this.props.changePassword(value.password)
    }
  }

  componentWillReceiveProps (newProps) {
    // Did the changePassword attempt complete?
    if (!newProps.fetching) {
      if (newProps.error) {
        Alert.alert('注意', newProps.error, [{text: 'OK'}])
      } else {
        this.setState({
          success: true
        })
        Alert.alert('成功', '密码修改成功', [{text: 'OK'}])
        this.props.navigation.goBack()
      }
    }
  }

  formChange (newValue) {
    this.setState({
      formValue: newValue
    })
  }

  render () {
    return (
        <ScrollView style={styles.container}>
          <Form
            ref='form'
            type={this.state.formModel}
            options={this.state.formOptions}
            value={this.state.formValue}
            onChange={this.formChange}
          />
          <TouchableHighlight style={styles.button} onPress={this.submitForm} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.password.fetching,
    error: state.password.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (password) => dispatch(PasswordActions.changePasswordRequest(password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordScreen)
