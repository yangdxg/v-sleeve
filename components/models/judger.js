/**
 * @作者 yangdxg
 * @创建时间 2020/3/12 2:35 下午
 */
import {SkuCode} from "./sku-code";
import {CellStatus} from "../../core/enum";
import {SkuPending} from "./sku-pending";
import {Joiner} from "../../utils/joiner";

class Judger {
    fenceGroup
    skuPending
    pathDict = []

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup
        this.initPathDict()
        this._initSkuPending()
    }

    _initSkuPending() {
        const specsLength = this.fenceGroup.fences.length
        let skuPending = new SkuPending(specsLength);
        this.skuPending = skuPending
        const defaultSku = this.fenceGroup.getDefaultSku()
        if (!defaultSku) {
            return
        }
        this.skuPending.initDefaultSku(defaultSku)
        this._initSelectedCell()
        this.judge(null, null, null, true)
    }

    _initSelectedCell() {
        this.skuPending.pending.forEach(cell => {
            this.fenceGroup.setCellStatusById(cell.id, CellStatus.SELECTED)
        })
    }

    initPathDict() {
        this.fenceGroup.spu.sku_list.forEach(s => {
            const skuCode = new SkuCode(s.code)
            this.pathDict = this.pathDict.concat(skuCode.totalSegments)
        })
    }

    judge(cell, x, y, isInit = false) {
        if (!isInit) {
            this._changeCurrentCellStatus(cell, x, y)
        }
        this.fenceGroup.eachCell((cell, x, y) => {
            // 1. 已选中的Cell，不需要再判断潜在路径
            // 2. 对于某个Cell，他的潜在路径应该是他自己加上其它行的已选Cell
            // 3. 对于某个Cell，不需要考虑当前行其它Cell是否已选中
            const path = this._findPotentialPath(cell, x, y)
            if (path) {//当前Cell是选中状态，不对状态进行处理（已经选中了就不用判断它自己的路径了）
                const isIn = this._isInDict(path)
                if (isIn) {
                    this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAITING)
                } else {
                    this.fenceGroup.setCellStatusByXY(x, y, CellStatus.FORBIDDEN)
                }
            }
        })
    }

    /**
     * 查找潜在路径是否再所有路径当中
     * @private
     */
    _isInDict(path) {
        return this.pathDict.includes(path)
    }

    // 私有方法加上下划线(习惯)
    _changeCurrentCellStatus(cell, x, y) {
        if (cell.status === CellStatus.WAITING) {
            this.fenceGroup.setCellStatusByXY(x, y, CellStatus.SELECTED)
            this.skuPending.insertCell(cell, x)
        }
        if (cell.status === CellStatus.SELECTED) {
            this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAITING)
            this.skuPending.removeCell(x)
        }
    }

    /**
     * 寻找潜在的路径(遍历判断当前可能存在的路径)
     * @private
     */
    _findPotentialPath(cell, x, y) {
        const joiner = new Joiner('#')
        for (let i = 0; i < this.fenceGroup.fences.length; i++) {
            const selected = this.skuPending.findSelectedCellByX(i)
            if (x === i) {
                //当前行
                if (this.skuPending.isSelected(cell, x)) {
                    return
                }
                const cellCode = this._getCellCode(cell.spec)
                joiner.join(cellCode)
            } else {
                // 其它行
                if (selected) {
                    const selectedCellCode = this._getCellCode(selected.spec)
                    joiner.join(selectedCellCode)
                }
            }
        }
        return joiner.getStr()
    }

    _getCellCode(spec) {
        return spec.key_id + "-" + spec.value_id
    }

    isSkuInTact() {
        return this.skuPending.isIntack()
    }

    /**
     * 获取选中的sku
     */
    getDeterminateSku() {
        let skuCode = this.skuPending.getSkuCode()
        let sku = this.fenceGroup.getSkuByCode(skuCode)
        return sku
    }

    // getTips() {
    //     if (this.isSkuInTact()) {
    //         return this.skuPending.getCurrentSpecValues()
    //     } else {
    //         const joiner = new Joiner(',')
    //         const missingKeys = this.skuPending.getMissingSpecKeys()
    //         for (let i = 0; i < missingKeys.length; i++) {
    //             let id = missingKeys[i]
    //             joiner.join(this.fenceGroup.fences[id].title)
    //         }
    //         return joiner.getStr()
    //     }
    // }

    getMissingKeys(){
        const missingKeysIndex=this.skuPending.getMissingSpecKeys()
        return missingKeysIndex.map(i=>{
            return this.fenceGroup.fences[i].title
        })
    }

    getCurrentValues(){
        return this.skuPending.getCurrentSpecValues()
    }
}

export {
    Judger
}