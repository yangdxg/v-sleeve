/**
 * @作者 yangdxg
 * @创建时间 2020/3/16 1:46 下午
 */
import {Cell} from "./cell";
import {CellStatus} from "../../core/enum";
import {Joiner} from "../../utils/joiner";

class SkuPending {
    pending = []
    // 完整的SKU有多少种规格
    size

    constructor(size) {
        this.size = size
    }

    initDefaultSku(sku) {
        for (let i = 0; i < sku.specs.length; i++) {
            const cell = new Cell(sku.specs[i])
            cell.status = CellStatus.SELECTED
            this.insertCell(cell, i)
        }
    }

    /**
     * 判断用户有没有确认完成的SKU
     */
    isIntack() {
        // if (this.size !== this.pending.length) {
        //     return false
        // }
        for (let i = 0; i < this.size; i++) {
            if (this.isEmptyPart(i)) {
                return false
            }
        }
        return true
    }

    /**
     * 获取当前选中的skuCode
     * @returns {StringConstructor}
     */
    getSkuCode() {
        let joiner = new Joiner("#")
        this.pending.forEach(cell => {
            joiner.join(cell.getCellCode())
        })
        return joiner.getStr()
    }

    isEmptyPart(index) {
        return this.pending[index] ? false : true
    }

    insertCell(cell, x) {
        this.pending[x] = cell
    }

    removeCell(x) {
        this.pending[x] = null
    }

    findSelectedCellByX(x) {
        return this.pending[x]
    }

    isSelected(cell, x) {
        const pendingCell = this.pending[x]
        if (!pendingCell) {
            return false
        }
        return cell.id === pendingCell.id
    }

    /**
     * 获取已选的规格值
     */
    getCurrentSpecValues() {
        // 模型类最好不要固定死返回形式，所以暂时不返回字符串，返回数组
        // let joiner = new Joiner(',')
        // this.pending.forEach(cell => {
        //     joiner.join(cell.title)
        // })
        // return joiner.getStr()
        const values = this.pending.map(cell => {
            return cell ? cell.spec.value : null
        })
        return values
    }

    /**
     * 获取未选规格名(下标)
     */
    getMissingSpecKeys() {
        // 模型类最好不要固定死返回形式，所以暂时不返回字符串，返回数组
        // let missingSpec = []
        // for (let i = 0; i < this.pending.length; i++) {
        //     if (!this.pending[i]) {
        //         missingSpec.push(i)
        //     }
        // }
        // return missingSpec
        let keysIndex = []
        for (let i = 0; i < this.size; i++) {
            if (!this.pending[i]) {
                keysIndex.push(i)
            }
        }
        return keysIndex
    }
}

export {
    SkuPending
}