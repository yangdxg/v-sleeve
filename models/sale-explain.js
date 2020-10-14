import {Http} from "../utils/http";

/**
 * @作者 yangdxg
 * @创建时间 2020/3/20 2:15 下午
 */
class SaleExplain {
    static async getFixed() {
        const explains = await Http.request({
            url: `sale_explain/fixed`
        })
        return explains.map(e => {
            return e.text
        })
    }
}

export {SaleExplain}