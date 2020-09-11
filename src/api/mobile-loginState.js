import Vue from 'vue'
const getUrl = ()=>{
    return 'http://cs.jius.net/mobile-loginState.asp'
}
const getLoginState = ()=>{
    return new Promise((resolve,reject)=>{
        Vue.axios(
            {
                url:getUrl(),
                method:'get',
                withCredentials:true
            }
        ).then(res=>{
            resolve(res)
        },
        ()=>{
            reject(false)
        }
        )
    })
}
export default getLoginState

// 数据结构：
//     登录成功：
//     {
//         "loginState":true,
//         "comId":"企业id"
//     }
//     失败：
//     {
//         "loginState":false
//     }