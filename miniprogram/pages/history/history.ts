// pages/history/history.ts
import dayjs from '../../miniprogram_npm/dayjs/index'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isNull: true,
    record: [],
    isEmpty: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    })
    this.setData({
      isNull: true
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
  async onShow() {
    try {
      const res = await wx.cloud.callContainer({
        path: '/api/history/simple',
        method: 'POST',
        header: {
          "X-WX-SERVICE": "springboot-cxiq",
          "Authorization": wx.getStorageSync('token')
        }
      })
      console.log('status code', res)
      if (res.statusCode === 200) {
        if (res.data.code != null) {
          // token过期
          wx.navigateTo({
            url: '/pages/login/login'
          })
        } else {
          const resData: Array<{id: string; createTime: string}> = res.data
          const arr: Array<{id: string; createTime: string}> = []
          resData.forEach((e: {id: string; createTime: string}) => {
            e.createTime = dayjs(e.createTime).add(8, 'hour').format('YYYY-MM-DD HH:mm:ss')
            arr.push(e)
          })
          this.setData({
            // @ts-ignore
            record: arr
          })
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.setData({
        isNull: false
      })
      if (this.data.record.length === 0) {
        this.setData({
          isEmpty: true
        })
      }
    }
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
  async onPullDownRefresh() {
    try {
      const res = await wx.cloud.callContainer({
        path: '/api/history/simple',
        method: 'POST',
        header: {
          "X-WX-SERVICE": "springboot-cxiq",
          "Authorization": wx.getStorageSync('token')
        }
      })
      if (res.statusCode === 200) {
        const resData = res.data
        this.setData({
          record: resData
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      wx.stopPullDownRefresh()
    }
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

  async clickToDetail (e: any) {
    wx.navigateTo({
      url: '/pages/book/book?id=' + e.target.dataset.item
    })
  }
})