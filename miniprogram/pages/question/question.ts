// pages/question/question.ts
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questions: [],
    infoData: {
      weight: -1,
      height: -1,
      favoriteTea: '',
      teaAge: '', 
      lifeIn: '', 
      growthIn: '', 
      professional: ''
    },
    answers: [],
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    this.setData({
      loading: true,
    })
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      selector: '#my-toast',
    });
    // 获取全部题目
    try {
      const res = await wx.cloud.callContainer({
        path: '/api/survey/',
        method: 'GET',
        header: {
          'X-WX-SERVICE': 'springboot-cxiq',
          'content-type': 'application/json' // 默认值
        }
      })
      const ret = await wx.cloud.callContainer({
        path: '/api/survey/answer',
        method: 'GET',
        header: {
          'X-WX-SERVICE': 'springboot-cxiq',
          'content-type': 'application/json',
          'Authorization': wx.getStorageSync('token'),
        }
      })
      const resData = res.data.data
      const retData: Array<{optionsId: string; problemId: string;}> = ret.data.data
      const data = resData.problems
      data.map((e: any, index: number) => Object.assign(e, retData[index]))
      this.setData({
        questions: resData.problems
      })
    } catch (error) {
      console.log('get request error!', error)
    } finally {
      this.setData({
        loading: false,
      })
    }
    this.setData({
      infoData: JSON.parse(wx.getStorageSync('infoData'))
    })
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

  getValue(e: any) {
    try {
      let temp: Array<{id?: string, type?: number, data?: string, options_id?: string}> = this.data.answers
      temp[parseInt(e.detail.id)] = {
        id: e.detail.id,
        type: e.detail.type,
        options_id: e.detail.event.detail,
      }
      this.setData({
        // @ts-ignore
        answers: temp
      })
    } catch (error) {
      console.log(error)
    }
  },

  submitQuestion () {
    if (this.data.answers.length === 0) {
      Toast.fail('请填写表单！')
      return
    }
    for (let i = 1; i < this.data.answers.length; i++) {
      if (this.data.answers[i] === undefined) {
        Toast.fail('表单不完整！')
        return
      }
    }
    // 提交表单
    const { weight, height, favoriteTea, teaAge, lifeIn, growthIn, professional } = this.data.infoData
    const data = {
      problem: this.data.answers.slice(1),
      info: { weight, height, favoriteTea, teaAge, lifeIn, growthIn, professional }
    }
    wx.cloud.callContainer({
      path: '/api/survey/submit',
      method: 'POST',
      data: data,
      header: {
        'Authorization': wx.getStorageSync('token'),
        'X-WX-SERVICE': 'springboot-cxiq',
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        const resData: Array<{id: String, name: String, result: Number}> = res.data.data.list
        wx.navigateTo({
          url: '/pages/recommend/recommend?bodyArr=' + JSON.stringify(resData)
        })
      },
      fail: err => {
        console.log('error', err)
      }
    })
  }
})