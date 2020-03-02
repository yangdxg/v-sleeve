import {config} from "../config/config";
import {promisic} from "./util";

class Http {
    static async request({url, data, method = 'GET'}) {
        const res = await promisic(wx.request)({
            // 模版字符串ES6
            url: `${config.apiBaseUrl}${url}`,
            data: data,
            method,
            header: {
                appkey: config.appkey
            },
        })
        return res.data
    }
}


export {
    Http
}