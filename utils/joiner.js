/**
 * @作者 yangdxg
 * @创建时间 2020/3/16 2:36 下午
 */

class Joiner {
    _str = ''
    _symbol = '-'
    _cutCharNum = 1

    constructor(symbol, cutCharNum) {
        if (symbol) {
            this._symbol = symbol
        }
        if (cutCharNum) {
            this._cutCharNum = cutCharNum
        }
    }

    join(part) {
        if (part) {
            this._str += `${part}${this._symbol}`
        }
    }

    getStr() {
        return this._str.substring(0, this._str.length - this._symbol.length)
    }
}

export {
    Joiner
}