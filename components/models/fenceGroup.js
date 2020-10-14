/**
 * @作者 yangdxg
 * @创建时间 2020/3/3 5:05 下午
 */
import {Matrix} from "./Matrix";
import {Fence} from "./fence";

class FenceGroup {
    spu
    skuList = []
    fences = []

    constructor(spu) {
        this.spu = spu
        this.skuList = spu.sku_list
    }

    /**
     * 获取默认的SKu
     * @returns {*}
     */
    getDefaultSku() {
        const defaultSkuId = this.spu.default_sku_id
        if (!defaultSkuId) {
            return
        }
        return this.skuList.find(s => s.id === defaultSkuId)
    }

    initFences() {
        const matrix = this._createMatrix(this.skuList)
        const fences = []
        // 俩种方法实现将二维数组转成fences(遍历和转置)
        // let currentJ = -1
        // matrix.forEach((element, i, j) => {
        //     if (currentJ != j) {
        //         // 开启一个新列
        //         currentJ = j
        //         // 创建一个fence
        //         fences[currentJ] = this._createFence(element)
        //     }
        //     fences[currentJ].pushValueTitle(element.value)
        // })

        const AT = matrix.transpose()
        AT.forEach(r => {
            const fence = new Fence(r)
            fence.init()
            if (this._hasSketchFence() && this._isSketchFence(fence.id)) {
                fence.setFenceSketch(this.skuList)
            }
            fences.push(fence)
        })
        this.fences = fences
    }

    // 有没有可是规格
    _hasSketchFence() {
        return this.spu.sketch_spec_id ? true : false
    }

    /**
     * 判断传进来的规格id是不是可视的规格id
     * @param fenceId
     * @returns {boolean}
     * @private
     */
    _isSketchFence(fenceId) {
        return this.spu.sketch_spec_id === fenceId ? true : false
    }

    // /**
    //  * 创建fence（私有方法加上一个_）
    //  * @private
    //  */
    // _createFence(element) {
    //     const fence = new Fence()
    //     // fence.pushValueTitle(element.value)
    //     return fence
    // }

    /**
     * 创建矩阵
     * @param skuList
     * @returns {Matrix}
     * @private
     */
    _createMatrix(skuList) {
        const m = []
        skuList.forEach(sku => {
            m.push(sku.specs)
        })
        return new Matrix(m)
    }

    /**
     * 遍历fenceGroup
     * @param cb
     */
    eachCell(cb) {
        for (let i = 0; i < this.fences.length; i++) {
            for (let j = 0; j < this.fences[i].cells.length; j++) {
                const cell = this.fences[i].cells[j]
                cb(cell, i, j)
            }
        }
    }

    /**
     * 根据id更改选择状态
     */
    setCellStatusById(cellId, status) {
        this.eachCell((cell) => {
            if (cell.id === cellId) {
                cell.status = status
            }
        })
    }

    setCellStatusByXY(x, y, status) {
        this.fences[x].cells[y].status = status
    }

    getSkuByCode(skuCode) {
        const fullSkuCode = this.spu.id + '$' + skuCode
        const sku = this.spu.sku_list.find(sku => sku.code === fullSkuCode)
        return sku ? sku : null
    }

}

export {
    FenceGroup
}