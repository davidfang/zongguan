import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  forgotPasswordRequest: ['mobile', 'code', 'password'],
  forgotPasswordSuccess: ['response'],
  forgotPasswordFailure: ['error'],

  changePasswordRequest: ['password'],
  changePasswordSuccess: ['response'],
  changePasswordFailure: ['error'],

  passInit: []
})

export const PasswordTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  change: null,
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to request a password reset email
export const resetRequest = (state) => state.merge({ fetching: true })

// we've successfully request to reset the password
export const resetSuccess = (state, data) => state.merge({ fetching: false, error: null, change: true})

// we've had a problem requesting to reset the password
export const resetFailure = (state, { error }) => state.merge({ fetching: false, error })

// we're attempting to request a password reset email
export const changeRequest = (state) => state.merge({ fetching: true })

// we've successfully request to reset the password
export const changeSuccess = (state, data) => state.merge({ fetching: false, error: null, change: true})

// we've had a problem requesting to reset the password
export const changeFailure = (state, { error }) => state.merge({ fetching: false, error })

// init password
export const passInit = state => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FORGOT_PASSWORD_REQUEST]: resetRequest,
  [Types.FORGOT_PASSWORD_SUCCESS]: resetSuccess,
  [Types.FORGOT_PASSWORD_FAILURE]: resetFailure,

  [Types.CHANGE_PASSWORD_REQUEST]: changeRequest,
  [Types.CHANGE_PASSWORD_SUCCESS]: changeSuccess,
  [Types.CHANGE_PASSWORD_FAILURE]: changeFailure,
  [Types.PASS_INIT]: passInit
})

/* ------------- Selectors ------------- */

