// pages/detail/detail.js
import {Spu} from "../../models/spu";
import {ShoppingWay} from "../../core/enum";
import {SaleExplain} from "../../models/sale-explain";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        spu: Object,
        // 弹出realm规格选择
        showRealm: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        const pid = options.pid
        const spu = await Spu.getDetail(pid)
        const saleExplain = await SaleExplain.getFixed()
        this.setData({
            spu,
            saleExplain
        })
    },
    onSpecChange(event) {
        this.setData({
            specs: event.detail
        })
        console.log(this.data.specs)
    },
    onGoToHome(event) {
        wx.switchTab({
            url: '/pages/home/home'
        })
    },
    onGoToCart(event) {
        wx.switchTab({
            url: '/pages/cart/cart'
        })
    },
    onAddToCart(event) {
        this.setData({
            showRealm: true,
            orderWay: ShoppingWay.CART
        })
    },
    onBuy(event) {
        this.setData({
            showRealm: true,
            orderWay: ShoppingWay.BUY
        })
    }

})