// components/hot-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    banner: Object
  },
  // 新式监听器
  observers: {
    //监听banner属性
    'banner': function(banner) {
      if (!banner) {
        return
      }
      if (banner.items.length === 0) {
        return
      }
      const left = banner.items.find(item => item.name === 'left')
      const rightTop = banner.items.find(item => item.name === 'right-top')
      const rightBottom = banner.items.find(item => item.name === 'right-bottom')
      this.setData({
        left,
        rightTop,
        rightBottom
      })
    }
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