import Vue from 'vue'
const getUrl = (id)=>{
    return 'http://cs.jius.net/Member/User_Product_Refer1_show.asp?id='+id
}
const getTel = (id)=>{
    return new Promise((resolve,reject)=>{
        Vue.axios(
            {
                url:getUrl(id),
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
export default getTel
//参数：id：agentInfor获取数据中的id
// 获取电话信息 ： ,{withCredentials:true}
//  电话：<img src=/UpFile/CreTel/Dl/399815/c213d61846e406e90b19505575265339.gif border=0 align=absmiddle>