// components/realm/index.js
import {FenceGroup} from "../models/fenceGroup";
import {Judger} from "../models/judger";
import {Spu} from "../../models/spu";
import {Cell} from "../models/cell";
import {Cart} from "../../models/cart";

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        spu: Object,
        orderWay: String
    },
    /**
     * 监听器，处理数据
     */
    observers: {
        'spu': function (spu) {
            if (!spu) {
                return
            }

            // 处理有无规格情况
            if (Spu.isNoSpec(spu)) {
                this.processNoSpec(spu)
            } else {
                this.processHasSpec(spu)
            }
            this.triggerSpecEvent()
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        judger: Object,
        fences: Array,
        previewImg: String,
        title: String,
        price: String,
        discountPrice: String,
        // 库存
        stock: Number,
        // 有没有已经选择了的完成的SKU路径
        skuInTack: false,
        // 当前所选数量
        currentSkuCount: Cart.SKU_MIN_COUNT

    },

    /**
     * 组件的方法列表
     */
    methods: {
        /**
         * 处理无规格情况
         */
        processNoSpec(spu) {
            this.setData({
                noSpec: true
            })
            this.bindSkuData(spu.sku_list[0])
            this.setStockStatus(spu.sku_list[0].stock, this.data.currentSkuCount)
        },
        /**
         * 处理有规格情况
         */
        processHasSpec(spu) {
            const fenceGroup = new FenceGroup(spu)
            fenceGroup.initFences()
            const judger = new Judger(fenceGroup)
            this.data.judger = judger
            const defaultSku = fenceGroup.getDefaultSku()
            if (defaultSku) {
                this.bindSkuData(defaultSku)
                this.setStockStatus(defaultSku.stock, this.data.currentSkuCount)
            } else {
                this.bindSpuData()
            }
            this.bindTipData()
            this.bindFenceGroupData(fenceGroup)
        },
        // 规格变化传递到detail页面
        triggerSpecEvent() {
            const noSpec = Spu.isNoSpec(this.properties.spu)
            if (noSpec) {
                this.triggerEvent('specchange', {
                    noSpec: Spu.isNoSpec(this.properties.spu),
                })
            } else {
                this.triggerEvent('specchange', {
                    noSpec: Spu.isNoSpec(this.properties.spu),
                    skuInTack: this.data.judger.isSkuInTact(),
                    currentValues: this.data.judger.getCurrentValues(),
                    missingKeys: this.data.judger.getMissingKeys()
                })
            }
        },
        bindSpuData() {
            const spu = this.properties.spu
            this.setData({
                previewImg: spu.img,
                title: spu.title,
                price: spu.price,
                discountPrice: spu.discount_price,
            })
        },
        bindSkuData(sku) {
            this.setData({
                previewImg: sku.img,
                title: sku.title,
                price: sku.price,
                discountPrice: sku.discount_price,
                stock: sku.stock,
            })
        },
        bindTipData() {
            this.setData({
                skuInTack: this.data.judger.isSkuInTact(),
                currentValues: this.data.judger.getCurrentValues(),
                missingKeys: this.data.judger.getMissingKeys()
            })
        },
        bindFenceGroupData(fenceGroup) {
            this.setData({
                fences: fenceGroup.fences
            })
        },
        // 接收数量变化
        onSelectCount(event) {
            const currentCount = event.detail.count
            this.data.currentSkuCount = currentCount
            if (this.data.judger.isSkuInTact()) {
                this.setStockStatus(this.data.judger.getDeterminateSku().stock, currentCount)
            }
        },
        // 判断是不是缺货
        isOutOfStock(stock, currentCount) {
            return stock < currentCount
        },
        setStockStatus(stock, currentCount) {
            this.setData({
                outStock: this.isOutOfStock(stock, currentCount)
            })
        },
        onCellTap(event) {
            // 拿到具体点击的cell
            const data = event.detail.cell
            const cell = new Cell(data.spec)
            cell.status = data.status
            const x = event.detail.x
            const y = event.detail.y
            const judger = this.data.judger
            judger.judge(cell, x, y)
            const skuIntack = judger.isSkuInTact()
            if (skuIntack) {
                const currentSku = judger.getDeterminateSku()
                this.bindSkuData(currentSku)
                this.setStockStatus(currentSku.stock, this.data.currentSkuCount)
            }
            this.bindTipData()
            this.bindFenceGroupData(judger.fenceGroup)
            this.triggerSpecEvent()
        }
    }
})
