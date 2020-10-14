/**
 * @作者 yangdxg
 * @创建时间 2020/3/4 10:42 上午
 */

class Matrix {
    m = []

    constructor(martix) {
        this.m = martix
    }

    //行数
    get rowsNum() {
        return this.m.length
    }

    //列数
    get colsNum() {
        return this.m[0].length
    }

    /**
     * 遍历
     * @param cb
     */
    forEach(cb) {
        if (!this.m) {
            return
        }
        for (let j = 0; j < this.colsNum; j++) {
            for (let i = 0; i < this.rowsNum; i++) {
                const element = this.m[i][j]
                cb(element, i, j)
            }
        }
    }

    /**
     * 二维数组转置
     * @returns {[][]}
     */
    transpose() {
        const desArr = []
        for (let j = 0; j < this.colsNum; j++) {
            desArr[j] = []
            for (let i = 0; i < this.rowsNum; i++) {
                desArr[j][i] = this.m[i][j]
            }
        }
        return desArr
    }
}

export {
    Matrix
}