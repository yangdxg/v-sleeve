// components/spu-preview/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        data: Object
    },

    /**
     * 组件的初始数据
     */
    data: {
        tags: Array
    },

    observers: {
        data: function (data) {
            if (!data) {
                return
            }
            if (!data.tags) {
                return
            }
            const tags = data.tags.split('$')
            this.setData({
                tags
            })
        }
    },


    /**
     * 组件的方法列表
     */
    methods: {
        // 获取图片的真实宽高
        // 也可食使用getImageInfo获取图片的真实宽高，但是需要先下载图片
        onImgLoad(event) {
            const {width, height} = event.detail
            // 计算缩放之后的图片宽高
            this.setData({
                w: 340,
                h: 340 * height / width
            })
        },
        // 为了通用性，把pid抛出去到具体的页面做跳转行为，因为这里所有的spu都
        // 跳转到detail页面，所以跳转逻辑卸载这里（业务型组件）
        // 小程序组件可以分为俩种
        // 业务型组件
        // 通用型组件（可以使用小程序的eventChannel来实现）
        onItemTap(event) {
            const pid = event.currentTarget.dataset.pid
            wx.navigateTo({
                url: `/pages/detail/detail?pid=${pid}`
            })
        }
    }
})
