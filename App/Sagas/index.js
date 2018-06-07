import { takeLatest, takeEvery, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { BannerTypes } from '../Redux/BannerRedux'
import { GithubTypes } from '../Redux/GithubRedux'
//import { LoginTypes as Login2Types } from '../Redux/Login2Redux'
import { LoginTypes } from '../Redux/LoginRedux'

import { RegisterTypes } from '../Redux/RegisterRedux'
import { PasswordTypes } from '../Redux/PasswordRedux'
import { AccountTypes } from '../Redux/AccountRedux'
import { CaptchaCodeTypes } from '../Redux/CaptchaCodeRedux'

import { AppSetTypes } from '../Redux/AppSetRedux'
/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getBanner } from './BannerSagas'
import { getUserAvatar } from './GithubSagas'
// import { login as login2 } from './Login2Sagas'

import { getAppSet, getAppSetProvince } from './AppSetSagas'
import { login, loginLoad } from './LoginSagas'
import { register } from './RegisterSagas'
import { forgotPassword, changePassword } from './PasswordSagas'
import { getAccount, updateAccount, updateProfile, uploadAvatar } from './AccountSagas'
import { getCaptcha, getCode } from './CaptchaCodeSagas'

/* ------------- API ------------- */
// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeEvery(BannerTypes.BANNER_REQUEST, getBanner, api),
    takeEvery(AppSetTypes.PROVINCE_REQUEST, getAppSetProvince, api),

    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),


    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),
    takeLatest(PasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api),
    takeLatest(PasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),

    takeLatest(CaptchaCodeTypes.CAPTCHA_REQUEST, getCaptcha, api),
    takeLatest(CaptchaCodeTypes.CODE_REQUEST, getCode, api),
    // ignite-jhipster-saga-redux-connect-needle

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api),
    takeLatest(AccountTypes.UPLOAD_AVATAR_REQUEST, uploadAvatar, api),
    takeLatest(AccountTypes.PROFILE_UPDATE_REQUEST, updateProfile, api),
    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
  ])
}
