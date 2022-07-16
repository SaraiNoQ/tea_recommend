// pages/detail/detail.ts
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
interface TeaData {
  afternoonTea:   string;
  autumnTea:      string;
  bodyTypeId:     string;
  drinkingAdvice: string;
  evenTea:        string;
  morningTea:     string;
  specialTea:     string;
  springTea:      string;
  summerTea:      string;
  winterTea:      string;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bodyType: '',
    body: '',
    teaData: {
      afternoonTea:   '',
      autumnTea:      '',
      bodyTypeId:     '',
      drinkingAdvice: '',
      evenTea:        '',
      morningTea:     '',
      specialTea:     '',
      springTea:      '',
      summerTea:      '',
      winterTea:      '',
    },
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options: any) {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
    this.setData({
      bodyType: options.bodyType_id,
      body: options.body + '体质茶叶推荐'
    })
    try {
      const res = await wx.cloud.callContainer({
        path: '/api/teaRecommend?bodyType_id=' + this.data.bodyType,
        method: 'GET',
        header: {
          "X-WX-SERVICE": "springboot-cxiq",
        }
      })
      if (res.statusCode === 200) {
        const resData: TeaData = res.data.data
        this.setData({
          teaData: resData
        })
        console.log(this.data.teaData)
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.setData({
        loading: false
      })
    }
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

  }
})