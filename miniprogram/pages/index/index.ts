// index.ts
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

Page({
  data: {
    radioSex: '',
    message: '本项目旨在通过问卷的形式让您了解自己的身体状况，并推荐一套适合您的健康饮茶方案！'
  },
  async onLoad() {
    if (wx.getStorageSync('token') === '') {
      wx.redirectTo({
        url: '/pages/login/login'
      })
    }
  },
  async navigateToUser() {
    // 如果已经存在该用户的个人信息，则直接填表
    // const res = await wx.cloud.callContainer({
    //   path: '/survey/info',
    //   method: 'GET',
    //   header: {
    //     Authorization: ''
    //   }
    // })
    // if (res.data) {
    //   wx.navigateTo({
    //     url: '/pages/question/question'
    //   })
    // } else {
    //   wx.navigateTo({
    //     url: '/pages/userinfo/userinfo'
    //   })
    // }
    if (!this.validateLoginStatus()) {
      return
    }
    wx.navigateTo({
      url: '/pages/userinfo/userinfo'
    })
  },
  navigateToFeedback () {
    if (!this.validateLoginStatus()) {
      return
    }
    wx.navigateTo({
      url: '/pages/feedback/feedback'
    })
  },
  navigateToCheck() {
    wx.navigateTo({
      url: '/pages/check/check'
    })
  },
  navigateToHistory () {
    if (!this.validateLoginStatus()) {
      return
    }
    wx.navigateTo({
      url: '/pages/history/history'
    })
  },
  onChangeSex(event: any) {
    this.setData({
      radioSex: event.detail,
    });
  },
  validateLoginStatus () {
    if (wx.getStorageSync('token') === '') {
      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/login/login'
        })
      }, 1000)
      Toast.fail('请先登录！')
      return false
    }
    return true
  }
})
