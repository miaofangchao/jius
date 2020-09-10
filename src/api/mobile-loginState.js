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
//返回 true  或者 false