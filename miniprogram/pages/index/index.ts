// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    radioSex: ''
  },
  onLoad() {
  },
  navigateToUser() {
    wx.navigateTo({
      url: '/pages/userinfo/userinfo'
    })
  },
  navigateToQuestion() {
    wx.navigateTo({
      url: '/pages/question/question'
    })
  },
  navigateToCheck() {
    wx.navigateTo({
      url: '/pages/check/check'
    })
  },
  navigateToBook() {
    wx.navigateTo({
      url: '/pages/book/book'
    })
  },
  onChangeSex(event: any) {
    this.setData({
      radioSex: event.detail,
    });
  },
})
