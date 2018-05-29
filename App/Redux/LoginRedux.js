import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['username', 'password'],
  loginSuccess: ['authToken'],
  loginFailure: ['error'],
  loginLoad: null,
  loginLoadSuccess: null,
  logout: null,
  autoLogin: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  authToken: null,
  error: null,
  fetching: false,
  loading: false
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state) => state.merge({ fetching: true })

// we've successfully logged in
export const success = (state, data) => {
  const { authToken } = data
  return state.merge({ fetching: false, error: null, authToken })
}

// we've had a problem logging in
export const failure = (state, { error }) => state.merge({ fetching: false, error, authToken: null })

// we're attempting to load token from startup sagas
export const load = (state) => state.merge({ loading: true })

export const loadSuccess = (state) => state.merge({ loading: false })
// we've logged out
export const logout = (state) => INITIAL_STATE

// startup saga invoked autoLogin
export const autoLogin = (state) => state

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGIN_LOAD]: load,
  [Types.LOGIN_LOAD_SUCCESS]: loadSuccess,
  [Types.LOGOUT]: logout,
  [Types.AUTO_LOGIN]: autoLogin

})

/* ------------- Selectors ------------- */
// Is the current user logged in?
export const isLoggedIn = (loginState) => loginState.authToken !== null
