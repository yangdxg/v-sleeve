/**
 * @作者 yangdxg
 * @创建时间 2020/2/25 4:06 下午
 */

import {Http} from "./http";

class Paging {
    //不关心细节
    //需要下一页数据
    //保存状态
    //new Paging实例化

    start
    count
    req
    url
    // 锁
    locaker = false
    // 当前是否还有更多数据
    moreData = true
    // 累加后的所有数据
    accumulator = []

    constructor(req, count = 10, start = 0) {
        this.start = start
        this.count = count
        this.req = req
        this.url = req.url
    }

    async getMoreData() {
        if (!this.moreData) {
            return
        }
        if (!this._getLocker()) {
            return
        }
        const data = await this._actualGetData()
        this._releaseLocaker()
        return data;
    }

    // 真实的获取数据
    async _actualGetData() {
        const req = this._getCurrentReq()
        let paging = await Http.request(req)
        if (!paging) {
            return null
        }
        // 数据结构
        // paging.page
        // paging.total_page
        // paging.items
        if (paging.total_page === 0) {
            return {
                empty: true,
                items: [],
                moreData: false,
                accumulator: []
            }
        }
        this.moreData = this._moreData(paging.total_page, paging.page)
        if (this.moreData) {
            this.start += this.count
        }
        this._accumulate(paging.items)
        return {
            // 数据是否为空
            empty: false,
            // 当前请求回来的数据
            items: paging.items,
            // 是否还有更多数据，是否还有下一页
            moreData: this.moreData,
            // 累加后的所有数据
            accumulator: this.accumulator
        }
    }

    _accumulate(items) {
        this.accumulator = this.accumulator.concat(items)
    }

    _moreData(totalPage, pageNum) {
        return pageNum < totalPage - 1
    }

    _getCurrentReq() {
        let url = this.url
        const params = `start=${this.start}&count=${this.count}`
        if (url.includes('?')) {
            url += '&' + params
        } else {
            url += '?' + params
        }
        this.req.url = url
        return this.req
    }

    _getLocker() {
        if (this.locaker) {
            return false
        }
        this.locaker = true
        return true
    }

    _releaseLocaker() {
        this.locaker = false
    }

}

export {
    Paging
}