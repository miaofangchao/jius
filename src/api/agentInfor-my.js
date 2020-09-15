import Vue from 'vue'
const testUrl = 'http://m-cs.jius.net'
const getUrl = (comId, page, area = "", flId = 0) => {
    return testUrl + '/agentInfor-my.asp?comId=' + comId + '&page=' + page + '&area=' + escape(area) + '&flId=' + flId
}
const getAgentInfor = (comId,page, area, flId) => {
    return new Promise((resolve, reject) => {
        Vue.axios.get(getUrl(comId,page, area, flId)).then(
            (res) => {
                // console.log(getUrl(comId,page, area, flId))
                // console.log(res)
                resolve(res)
            },
            () => {
                reject(false)
            }
        )
    }
    )
}
export default getAgentInfor

//接口说明：第一个参数为页码值，第二个参数可选：地区查询
// 数据结构：
// [
//     {
//         "id":"399719",   --在表中的唯一id
//         "date":"2020/9/3 11:44:04",
//         "name":"刘仁辉",
//         "area":"辽宁丹东",
//         "companyName":"祥昱商行",
//         "companyId":"806",  --公司表中的id
//         "pageCount":"13751"  --只在index==0中，数据的总页数
//     }
// ]