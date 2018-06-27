// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import AppConfig from '../Config/AppConfig'

// our "constructor"
// const create = (baseURL = 'http://zg-api.zhicaikeji.com/') => {
const create = (baseURL = AppConfig.apiUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL: baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const setAuthToken = (userAuth) => api.setHeader('Authorization', 'Bearer ' + userAuth) // 设置token
  const removeAuthToken = () => api.setHeader('Authorization', '') // 删除token
  const setFormData = () => api.setHeader('Content-Type', 'multipart/form-data;charset=utf-8') // 设置form data文件上传
  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', {q: username})
  const singUp = (mobile, code, password) => api.post('v1/sign-in/signup', {mobile, code, password})
  // const login = (mobile, password) => api.post('v1/sign-in/login', {identity: mobile, password})
  // const login = (mobile, password) => api.post('api/v1/sign-in/login', {identity:mobile, password,type:'miliao'})
  //const login = (mobile, password) => api.post('api/v1/sign-in/login', userAuth)
  const login = (userAuth) => api.post('v1/sign-in/login', userAuth)
  const getSmsCode = (mobile) => api.get('sms/get-code', {mobile})

  const register = (user) => api.post('v1/sign-in/signup', user) // 注册
  const forgotPassword = (data) => api.post('v1/sign-in/reset-password', data) // 忘记密码

  const getAccount = () => api.get('v1/profile/index') // 用户中心 获得用户信息
  const updateAccount = (account) => api.put('v1/profile/update', account) // 更新用户信息
  const resetPassword = (data) => api.post('v1/sign-in/reset-password', data) // 重置密码
  const changePassword = (data) => api.post('v1/profile/change-password', data) // 修改密码

  const getCaptcha = () => api.get('site/captcha', {refresh: 'refresh'}) // 获取图片验证码
  const checkCaptcha = (code) => api.get('site/check-captcha', {code}) // 校验图片验证码
  const getCode = (mobile, captcha) => api.get('sms-api/get-code', {mobile, id: 1, captcha}) // 获取手机验证码
  const getBanner = (type) => api.get('v1/banner', {type}) // 获得轮播图

  const getProvince = (parentId) => api.get('v1/prov-city-area-street/index', {parentId}) // 获得省市区信息

  // ignite-jhipster-api-method-needle
  const uploadAvatar = (formData) => api.post('v1/profile/avatar-upload', formData) //上传图像

  const getGoodsCategory = () => api.get('v1/goods-category/index') // 获得产品分类
  const getTbIndexRecommend = (page) => api.get('v1/taobao/index', {page}) // 获得首页淘宝推荐产品
  const getTbChannelProduct = (channelId, sortId, page) => api.get('v1/taobao/channel', {channelId, sortId, page}) // 获得频道推荐产品
  const getTbSearchKeyWord = (keyWord, page, sortId) => api.get('v1/taobao/search', {keyWord, page, sortId}) // 获得搜索产品
  const getTbDetail = (goodsId) => api.get('v1/taobao/detail', {goodsId}) // 获得产品详情

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    setAuthToken,
    removeAuthToken,
    setFormData,
    getRoot,
    getRate,
    getUser,
    singUp,
    login,
    getSmsCode,
    getBanner,

    register,
    forgotPassword,
    getAccount,
    updateAccount,
    resetPassword,
    changePassword,

    getCaptcha,
    checkCaptcha,
    getCode,

    getProvince,
    uploadAvatar,
    getGoodsCategory,
    getTbIndexRecommend,
    getTbChannelProduct,
    getTbSearchKeyWord,
    getTbDetail
  }
}

// let's return back our create method as the default.
export default {
  create
}
