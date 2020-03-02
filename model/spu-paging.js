/**
 * @作者 yangdxg
 * @创建时间 2020/2/25 2:36 下午
 */
import {Paging} from "../utils/paging";

class SpuPaging {
    static getLatestPaging() {
        return new Paging({
            url: `spu/latest`
        }, 5)
    }
}
export {
    SpuPaging
}
// 1.一条数据都没有情况
// 2.最后一页，还有没有更多的数据
// 3.累加，每次都会重新渲染页面
// 4.上滑触底 加载 避免用户重复发请求
// 按钮 button 防抖 截流，按钮应该又一个禁用状态或有一个倒计时状态，或全屏的loading
// 类  函数