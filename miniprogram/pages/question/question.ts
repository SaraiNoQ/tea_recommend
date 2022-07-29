// pages/question/question.ts
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

interface answerInfo {id?: string, type?: number, data?: string, options_id?: string}
interface Option {
  describe: null | string;
  id:       null | string;
}
interface Datum {
  describe: string;
  id:       string;
  options:  Option[];
  /**
   * 0和1 代表 正常的选择题   2代表需要上传图片 3代表文本框上传文字
   */
  type: number;
}
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
    loading: true,
    submitLoading: false
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
      const resData: {problems: Array<Datum>; errorMsg?: string} = res.data.data
      const retData: Array<{optionsId: string; problemId: string;}> = ret.data.data
      const data: Array<Datum> = resData.problems
      // 未排序版本
      // data.map((e: any) => {
      //   retData.forEach((element: {optionsId: string; problemId: string;}) => {
      //     if (e.id === element.problemId) {
      //       Object.assign(e, element)
      //     }
      //   })
      // })
      data.map((e: Datum, index: number) => Object.assign(e, retData[index]))
      this.setData({
        questions: resData.problems as []
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
      let temp: Array<answerInfo> = this.data.answers
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
    // finally {
    //   console.log('change', this.data.answers)
    //   for (let i = 0; i < this.data.answers.length; i++) {
    //     console.log(this.data.answers[i] === undefined)
    //   }
    // }
  },

  submitQuestion () {
    // 将回显内容填入answers数组
    const arr: Array<{id: string; optionsId?: string; problemId?: string; type: number;}> = this.data.questions
    const newAnswers: Array<undefined | {id: string; type: number; options_id: string;}> = [...this.data.answers]
    for (let i = 1; i <= arr.length; i++) {
      if (newAnswers[i] === undefined && arr[i - 1].optionsId) {
        newAnswers[i] = {
          id: arr[i - 1].id,
          type: arr[i - 1].type,
          options_id: arr[i - 1].optionsId as string
        }
      }
    }
    this.setData({
      answers: newAnswers as []
    })

    // 判断表单
    if (this.data.answers.length === 0) {
      Toast.fail({
        message: '请填写表单！',
        selector: '#van-toast',
      })
      return
    }
    if (this.data.answers.length <= this.data.questions.length) {
      Toast.fail({
        message: '表单不完整！',
        selector: '#van-toast',
      })
      return
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