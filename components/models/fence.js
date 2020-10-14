/**
 * @作者 yangdxg
 * @创建时间 2020/3/3 5:04 下午
 */

import {Cell} from "./cell";

class Fence {
    cells = []
    specs
    // 规格名的信息
    title
    id

    constructor(specs) {
        this.specs = specs
        if (specs.length > 0) {
            this.title = specs[0].key
            this.id = specs[0].key_id
        }
    }

    init() {
        this._initCells()
    }

    _initCells() {
        this.specs.forEach(s => {
            //some every都会遍历当前的数组
            //some要求数组下面的某一个元素符合就返回
            //every要求所有元素都符合才会返回
            //用于去重
            const existed = this.cells.some(c => {
                return c.id === s.value_id
            })
            if (existed) {
                return
            }
            const cell = new Cell(s);
            this.cells.push(cell)
        })
    }

    setFenceSketch(skuList) {
        this.cells.forEach(cell => {
            this._setCellSkuImg(cell, skuList)
        })
    }

    _setCellSkuImg(cell, skuList) {
        let cellCode = cell.getCellCode()
        const matchedSku = skuList.find(s=>s.code.includes(cellCode))
        cell.skuImg = matchedSku.img
    }

    // pushValueTitle(title) {
    //     this.valueTitles.push(title)
    // }
}

export {
    Fence
}