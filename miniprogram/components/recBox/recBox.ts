// components/recBox/recBox.ts
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
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommend: {
      type: Object
    },
    springTea: {
      type: String
    },
    summerTea: {
      type: String
    },
    autumnTea: {
      type: String
    },
    winterTea: {
      type: String
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
