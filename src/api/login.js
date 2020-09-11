import Vue from 'vue'
const login = (userName, passWord) => {
    return new Promise((resolve, reject) => {
        Vue.axios({
            // url: "http://m-cs.jius.net/test.asp",
            url: "http://cs.jius.net/Login.asp?Action=Log",
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            withCredentials: true,
            responseEncoding: "gb2312",
            // 转换数据，服务端是gbk格式，用escape转码。
            // 也可以使用qs模块。qs.stringify(data)字符串化data对象，赋值给data
            transformRequest: [
                function (data) {
                    let ret = "";
                    for (let it in data) {
                        ret += escape(it) + "=" + escape(data[it]) + "&";
                    }
                    return ret;
                },
            ],
            data: {
                UserName: userName,
                PassWord: passWord,
                Cookie: 1,
                ComeUrl: "/Member/",
            },
        }).then(res => {
            resolve(res)
        },
            (err) => {
                reject(err)
                console.log(err)
            }
        )
    })
}
export default login
//返回值在login中做判断