const promisic = function (func) {
    return function (params = {}) {
        return new Promise(((resolve, reject) => {
            const args = Object.assign(params, {
                success: (res) => {
                    resolve(res)
                },
                fail: (error) => {
                    reject(error)
                }
            })
            func(args)
        }))
    }
}

/**
 * 数学组合
 * @param arr 待选元素
 * @param size 三选一填1，三选二填2，三选3填3
 */
const combination = function (arr, size) {
    var r = []

    function _(t, a, n) {
        if (n === 0) {
            r[r.length] = t
            return
        }
        for (let i = 0, l = a.length - n; i <= l; i++) {
            let b = t.slice()
            b.push(a[i])
            _(b, a.slice(i + 1), n - 1)
        }
    }

    _([], arr, size)
    return r
}

export {
    promisic,
    combination
}