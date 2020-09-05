// 获取招商页的数据；kind是酒水种类，在to.query.id中获取；page是页码，在$event获取，默认值为1，初次加载可以不用传值。
const getUrl = (kind,page=1)=>{
    return '/MobileData.asp?kind='+kind + '&page='+page
}
export default getUrl

// [
// 	{
// 		"id": "企业对应数据库id",
// 		"name": "企业名字",
// 		"imgSrc": "展示图片",
// 		"pageCount": "数据页数"  只有在index=0的对象里面有，记录查询出来数据的页数
// 	},
// 	...
// ]