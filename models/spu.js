/**
 * @作者 yangdxg
 * @创建时间 2020/3/3 5:15 下午
 */
import {Http} from "../utils/http";

class Spu {
    // 判断是不是无规格Spu
    static isNoSpec(spu) {
        if (spu.sku_list.length === 1 && spu.sku_list[0].specs.length === 0) {
            return true
        }
        return false
    }

    static getDetail(id) {
        return Http.request({
            url: `spu/id/${id}/detail`
        });
    }


}

export {
    Spu
}