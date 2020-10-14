/**
 * @作者 yangdxg
 * @创建时间 2020/3/4 4:09 下午
 */
import {CellStatus} from "../../core/enum";

class Cell {
    id
    title
    spec
    skuImg
    status = CellStatus.WAITING

    constructor(spec) {
        this.id = spec.value_id
        this.title = spec.value
        this.spec = spec
    }

    getCellCode() {
        return this.spec.key_id + "-" + this.spec.value_id
    }
}

export {
    Cell
}