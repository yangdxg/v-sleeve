/**
 * @作者 yangdxg
 * @创建时间 2020/3/12 2:49 下午
 * 一个Sku可能的路径组合
 */
import {combination} from "../../utils/util";

class SkuCode {
    code
    spuId
    totalSegments = []

    constructor(code) {
        this.code = code
        this._splitToSegumments()
    }

    _splitToSegumments() {
        // 2$1-44#3-9#4-14
        const spuAndSpec = this.code.split('$')
        this.spuId = spuAndSpec[0]
        const specCodeArray = spuAndSpec[1].split('#')
        const length = specCodeArray.length
        for (let i = 1; i <= length; i++) {
            const segments = combination(specCodeArray, i)
            const newSegments = segments.map(segs => {
                return segs.join('#')
            })
            this.totalSegments = this.totalSegments.concat(newSegments)
        }
    }
}

export {
    SkuCode
}