import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
// pages/userinfo/userinfo.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    age: '',
    radio: '',
    professional: '',
    teaAge: -1,
    height: -1,
    weight: -1,
    growthIn: '',
    lifeIn: '',
    favoriteTea: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  submitUserInfo () {
    this.validateValue()
  },

  getInputValue (e: any) {
    this.setData({
      age: e.detail
    })
  },
  getRadio (e: any) {
    this.setData({
      radio: e.detail
    })
  },
  getProfessionValue (e: any) {
    this.setData({
      professional: e.detail
    })
  },
  getTeaageValue (e: any) {
    this.setData({
      teaAge: parseInt(e.detail)
    })
  },
  getHeightValue (e: any) {
    this.setData({
      height: parseInt(e.detail)
    })
  },
  getWeightValue (e: any) {
    this.setData({
      weight: parseInt(e.detail)
    })
  },
  getGrowthValue (e: any) {
    this.setData({
      growthIn: e.detail
    })
  },
  getLifeValue (e: any) {
    this.setData({
      lifeIn: e.detail
    })
  },
  getFavoriteValue (e: any) {
    this.setData({
      favoriteTea: e.detail
    })
  },

  validateValue () {
    if (this.data.age === ''
    || this.data.favoriteTea === ''
    || this.data.growthIn === ''
    || this.data.lifeIn === ''
    || this.data.radio === ''
    || this.data.lifeIn === ''
    || this.data.professional === ''
    ) {
      Toast.fail('表单不完整！')
      return
    }
    // 当height和weight全部为数组时，且没有未填项时，才能提交表单
    if (Number.isFinite(this.data.height) && Number.isFinite(this.data.weight)) {
      this.saveToGlobal()
      wx.navigateTo({
        url: '/pages/question/question'
      })
    } else {
      Toast.fail('表单有误！')
    }
  },

  navigateToQuestion() {
    setTimeout(() => {
      wx.redirectTo({
        url: '/pages/question/question'
      })
    }, 1000)
    Toast.success('提交成功!');
  },

  saveToGlobal () {
    const dataStr = JSON.stringify(this.data)
    wx.setStorageSync('infoData', dataStr)
  }
})