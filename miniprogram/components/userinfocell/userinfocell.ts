Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    data: {
      type: Array,
      value: ['没有（根本不）', '很少（有一点）', '有时（有些）', '经常（相当）', '总是（非常）']
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    radio: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange: function(event: any) {
      this.setData({
        radio: event.detail
      })
    }
  },
})
