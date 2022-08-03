// pages/recommend/recommend.ts
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
    recommendBody: [],
    relativeBody: [],
    loading: true,
    firstItem: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options: {bodyArr: string}) {
    this.setData({
      loading: true
    })
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
    const arr: Array<{id: String, name: String, result: Number}> = JSON.parse(options.bodyArr)
    const arr_com: any = []
    const arr_rel: any = []
    arr.forEach((e: {id: String, name: String, result: Number})=> {
      if (e.result === 1) {
        e.name = e.name.replace(/[ ]/g, '')
        arr_com.push(e)
      } else if (e.result === 2) {
        e.name = e.name.replace(/[ ]/g, '')
        arr_rel.push(e)
      }
    })

    // 设置box
    try {
      const recData: any[] = [...arr_com]
      const relData: any[] = [...arr_rel]
      const _arr1: any[] = []
      const _arr2: any[] = []
      if (recData.length > 0) {
        recData.forEach(async (e: {id: string; name: string; result: number}, idx: number) => {
          const res = wx.cloud.callContainer({
            path: '/api/teaRecommend?bodyType_id=' + e.id,
            method: 'GET',
            header: {
              "X-WX-SERVICE": "springboot-cxiq",
              "content-type": "application/json",
            }
          })
          _arr1.push(res)
        })
        const resArr1 = await Promise.all(_arr1)
        resArr1.forEach((e: any, idx: number) => {
          if (e.statusCode === 200 && e.data.code === 200) {
            const teaData: TeaData = e.data.data
            recData[idx].data = teaData
            // 设置展示状态
            recData[idx].display = false
          }
        })
        recData[0].display = true
        if (relData.length > 0) {
          relData.forEach(async (e: {id: string; name: string; result: number}, idx: number) => {
            const res = wx.cloud.callContainer({
              path: '/api/teaRecommend?bodyType_id=' + e.id,
              method: 'GET',
              header: {
                "X-WX-SERVICE": "springboot-cxiq",
                "content-type": "application/json",
              }
            })
            _arr2.push(res)
          })
          const resArr2 = await Promise.all(_arr2)
          resArr2.forEach((e: any, idx: number) => {
            if (e.statusCode === 200 && e.data.code === 200) {
              const teaData: TeaData = e.data.data
              relData[idx].data = teaData
              // 设置展示状态
              relData[idx].display = false
            }
          })
        }
        // @ts-ignore
        this.setData({
          recommendBody: recData,
          relativeBody: relData,
        })
      }
    } catch (error) {
      console.log('set box error', error)
    } finally {
      const data: {data: Record<string, string>} = this.data.recommendBody[0]
      for (let item in data.data) {
        data.data[item] = data.data[item].replaceAll('\n', '')
      }
      console.log(this.data.firstItem, this.data.relativeBody)
      this.setData({
        firstItem: this.data.recommendBody[0],
        recommendBody: this.data.recommendBody.length >=3 ? [this.data.recommendBody[1], this.data.recommendBody[2]] : this.data.recommendBody,
        relativeBody: this.data.relativeBody.length >=2 ? [this.data.relativeBody[0], this.data.relativeBody[1]] : this.data.relativeBody,
        loading: false,
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

  },

  clickToBody () {
    wx.navigateTo({
      url: '/pages/check/check'
    })
  },

  // clickToTea (e: any) {
  //   const event: {name: String, bodytype: String} = {
  //     name: e.currentTarget.dataset.item.name,
  //     bodytype: e.currentTarget.dataset.item.id
  //   }
  //   wx.navigateTo({
  //     url: '/pages/detail/detail?bodyType_id=' + event.bodytype + '&body=' + event.name
  //   })
  // },
  clickToTea (e: any) {
    const event = e.currentTarget.dataset.item
    let recData = this.data.recommendBody

    this.data.recommendBody.forEach((e: any, idx: number) => {
      if (e.id === event.id) {
        // @ts-ignore
        recData[idx].display = !e.display
        this.setData({
          recommendBody: recData
        })
      }
    })
  },
  clickToTeaR (e: any) {
    const event = e.currentTarget.dataset.item
    let relData = this.data.relativeBody

    this.data.relativeBody.forEach((e: any, idx: number) => {
      if (e.id === event.id) {
        // @ts-ignore
        relData[idx].display = !e.display
        this.setData({
          relativeBody: relData
        })
      }
    })
  },
  clickToIndex () {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  }
})