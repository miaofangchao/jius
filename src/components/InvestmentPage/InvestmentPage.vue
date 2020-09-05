<template>
    <div class="investment-page">
        <Header/>
        <CompanyList :listData="listData" ref="companyList"/>
        <Footer/>
    </div>
</template>
<script>
import Header from './Header'
import Footer from '../Footer'
import CompanyList from './CompanyList'
import Vue from 'vue'
import { Indicator } from 'mint-ui'
import { Toast } from 'mint-ui'
import getUrl from '../../api/InvestmentPage'
export default {
    data() {
        return {
            listData:null,
        }
    },
    components:{
        Header,
        CompanyList,
        Footer
    },
    beforeRouteEnter (to, from, next) {
        console.log('beforeRouteEnter')
        //打开加载动画
        Indicator.open()
        Vue.axios.get(getUrl(to.query.id,to.query.page))
        .then((res)=>{
            next(vm=>{
                vm.listData = res.data
                Indicator.close()
            })
        },()=>{
            Indicator.close()
            let instance = Toast('加载出错');
            setTimeout(() => {
                instance.close();
            }, 1500);
        })
        // 测试数据
        // setTimeout(()=>{
        //     next(vm=>{
        //         vm.sortId = to.params.id
        //         vm.listData = JSON.parse('[{"id": "4956","name":"贵州贵矛合酒业有限公司","imgSrc":"http://www.jius.net/UpFile/Company/201602/1602191802056640.jpg","pageCount":"175"},{"id":"4741","name":"河南上喆实业有限公司","imgSrc":"http://www.jius.net/UpFile/Coupon/201606/1606081110461191.gif"},{"id":"4930","name":"北京新拦山酒业有限公司","imgSrc":"http://www.jius.net/UpFile/Company/201512/1512311620477423.gif"},{"id":"4829","name":"四川省百年老窖酒业股份有限公司","imgSrc":"http://www.jius.net/UpFile/Coupon/201508/1508201818146495.gif"},{"id":"8253","name":"贵州省仁怀市海丰酒业有限公司","imgSrc":"http://www.jius.net/UpFile/Company/201805/1805151425443065.jpg"},{"id":"4246","name":"汾酒集团有限责任公司","imgSrc":"http://www.jius.net/UpFile/Company/201602/1602272023289643.gif"},{"id":"4787","name":"四川省神洲春酒业","imgSrc":"http://www.jius.net/UpFile/COMPANY/201507/1507231642451366.GIF"},{"id":"5137","name":"四川省迎宾郎酒业有限公司","imgSrc":"http://www.jius.net/UpFile/Coupon/201605/1605231705530864.jpg"},{"id":"4151","name":"衡水聚百川酒业有限公司","imgSrc":"http://www.jius.net/UpFile/Coupon/201403/1403171701480102.gif"},{"id":"4848","name":"贵州酱魁酒业有限公司","imgSrc":"http://www.jius.net/UpFile/Coupon/201508/1508311225309069.gif"},{"id":"5171","name":"衡水衡泰酒业","imgSrc":"http://www.jius.net/UpFile/Coupon/201606/1606011609351168.jpg"},{"id":"3163","name":"青谷原浆酒","imgSrc":"http://www.jius.net/UpFile/Company/201211/1211091434174537.jpg"},{"id":"5662","name":"贵州茅台老匠坊酒业公司","imgSrc":"http://www.jius.net/UpFile/Coupon/201609/1609111611467867.gif"},{"id":"3130","name":"北京京胜门酒业有限公司","imgSrc":"http://www.jius.net/UpFile/Company/201911/1911291745449954.jpg"},{"id":"4388","name":"贵州特将不老酒业股份有限公司","imgSrc":"http://www.jius.net/UpFile/Coupon/201606/1606151521472243.jpg"},{"id":"5551","name":"宜宾五粮液股份有限公司出品系列酒运营中心","imgSrc":"http://www.jius.net/UpFile/Coupon/201702/1702141941211493.jpg"},{"id":"4897","name":"亳州市古井1995酒业销售有限公司","imgSrc":"http://www.jius.net/UpFile/Coupon/201511/1511281750459834.gif"},{"id":"5193","name":"剑南福绵竹醇品牌运营中心","imgSrc":"http://www.jius.net/UpFile/Coupon/201606/1606131725385435.jpg"},{"id":"8105","name":"安徽省亳州市酿酒厂","imgSrc":"http://www.jius.net/UpFile/Coupon/201802/1802271425487055.gif"},{"id":"4839","name":"河南盛世百荣酒业有限公司","imgSrc":"http://www.jius.net/UpFile/Coupon/201805/1805211053271847.gif"}]')
        //     })
        //     Indicator.close()
        // },500)
    },
    beforeRouteUpdate(to, from, next){
        console.log('beforeRouteUpdate:'+ to.fullPath)
        // this.$router.push({params:{id:to.params.id}})
        Indicator.open()
        Vue.axios.get(getUrl(to.query.id,to.query.page))
        .then(res=>{
            this.listData = res.data
            Indicator.close()
            next()
        },()=>{
            Indicator.close()
            let instance = Toast('加载出错');
            setTimeout(() => {
                instance.close();
            }, 1500);
        })
        // 测试数据
        // setTimeout(()=>{
        //     this.listData = JSON.parse('[{"id": "6563","name":"邵氏茶酒邵氏酒业","imgSrc":"http://www.jius.net/UpFile/Company/201703/1703071150283194.jpg","pageCount":"8"},{"id":"4914","name":"福建双叶猕猴桃酒酿造有限公司","imgSrc":"http://www.jius.net/UpFile/Company/201512/1512041444353372.jpg"},{"id":"4623","name":"仙居县车头酿造厂(普通合伙）","imgSrc":"http://www.jius.net/UpFile/Company/201505/1505161142120230.jpg"},{"id":"176","name":"陕西秦洋长生酒业有限公司","imgSrc":"http://www.jius.net/UpFile/Company/201203/1203241010572768.jpg"},{"id":"5929","name":"山东天地缘酒业有限公司","imgSrc":"http://www.jius.net/UpFile/Company/201611/1611081502528538.jpg"},{"id":"182","name":"上海金枫酒业股份","imgSrc":"http://www.jius.net/UpFile/Company/201203/1203241157396085.jpg"},{"id":"6690","name":"黄山市金状元酿造有限公司","imgSrc":"http://www.jius.net/UpFile/Company/201703/1703210922181266.jpg"},{"id":"185","name":"河南双头黄酒业","imgSrc":"http://www.jius.net/UpFile/Company/201203/1203241452360446.jpg"},{"id":"480","name":"绥芬河市巴里赞姆酒业有限公司深圳分公司","imgSrc":"http://www.jius.net/UpFile/Coupon/201205/1205051543291490.jpg"},{"id":"160","name":"江苏南通白蒲黄酒公司","imgSrc":"http://www.jius.net/UpFile/Company/201203/1203231656104354.jpg"},{"id":"144","name":"江苏省丹阳酒","imgSrc":"http://www.jius.net/UpFile/Company/201203/1203231442216769.jpg"},{"id":"7306","name":"广东桑醇酒业有限公司","imgSrc":"http://www.jius.net/UpFile/Company/201706/1706081055585993.png"},{"id":"7458","name":"瑞安市帆鸣蜂业有限公司","imgSrc":"http://www.jius.net/UpFile/Company/201707/1707241105187594.jpg"},{"id":"6048","name":"深圳壹佰酒业发展有限公司","imgSrc":"http://www.jius.net/UpFile/Company/201612/1612011549197871.jpg"},{"id":"136","name":"河南省镇平枣蜜黄酒厂","imgSrc":"http://www.jius.net/UpFile/Company/201203/1203231149507467.jpg"},{"id":"150","name":"绍兴市百草园酒业","imgSrc":"http://www.jius.net/UpFile/Company/201203/1203231534594360.jpg"},{"id":"7461","name":"上海锦点贸易有限公司","imgSrc":"http://www.jius.net/UpFile/Company/201707/1707241735365087.jpg"},{"id":"8668","name":"河北老城酒业有限公司","imgSrc":"http://www.jius.net/UpFile/Company/201812/1812111624437237.gif"},{"id":"713","name":"东澍酒类经营部","imgSrc":"http://www.jius.net/UpFile/Company/201205/723795609.jpg"},{"id":"4310","name":"成都陵江水蜜桃酒业有限公司","imgSrc":"http://www.jius.net/UpFile/Company/201409/1409101551218262.jpg"}]')
        //     console.log(getUrl(to.query.id,to.query.page))
        //     Indicator.close()
        //     next()
        // },500)
    },
}
</script>
<style lang="css" scoped>
    
</style>