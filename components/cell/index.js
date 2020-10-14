// components/cell/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        cell: Object,
        y: Number,
        x: Number
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        onTap(event) {
            this.triggerEvent('cellTap', {
                //子组件向父组件传参通过事件来完成
                cell: this.properties.cell,
                x: this.properties.x,
                y: this.properties.y
            }, {
                // 开启冒泡
                bubbles: true,
                // 跨越组件边界
                composed: true
            })
        }
    }
})
