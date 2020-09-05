<template>
    <div class="tuijian" v-divHeight>
        <div class="tuijian-sort">
            <ul class="tuijian-sort-ul">
                <li :class="{'tuijian-sort-li':true,'tuijian-sort-li-active':highLightFlag}" v-tap="{methods:toggle}">企业库</li>
                <li :class="{'tuijian-sort-li':true,'tuijian-sort-li-active':!highLightFlag}" v-tap="{methods:toggle}">产品库</li>
            </ul>
        </div>
        <div class="tuijian-content">
            <TransitionScale position="absolute">
            <ul v-show="highLightFlag">
                <li v-for="item in companyLib" :key="item.id">
                    ·<a :href="item.href">{{item.title}}</a>
                </li>
            </ul>
            </TransitionScale>
            <TransitionScale position="absolute">
            <ul v-show="!highLightFlag">
                <li v-for="item in productLib" :key="item.id">
                    <span>{{item.sort}}</span>
                    ·<a :href="item.href">{{item.title}}</a>
                </li>
            </ul>
            </TransitionScale>
        </div>
    </div>
</template>
<script>
import TransitionScale from '../../views/TransitionScale'
export default {
    data() {
        return {
            highLightFlag:true,//tab栏的高亮显示开关。内容的显示也用这个flag。两个内容只同时显示一个，另一个取反
            companyLib:[
                {id:1,href:'/co/?id=4479',title:'英国爱丁堡啤酒集团国际有限公司'},
                {id:2,href:'/co/?id=5235',title:'安徽金盛豪玛咖养生啤酒'},
                {id:3,href:'/co/?id=5140',title:'安徽天下酒坊酒业有限公司'},
                {id:4,href:'/co/?id=9047',title:'北京老汉一担粮二锅头酒业有限公司'},
                {id:5,href:'/co/?id=8618',title:'北京栗宝酒业有限公司'},
                {id:6,href:'/co/?id=5147',title:'北京午栏山酒业'},
            ],
            productLib:[
                {id:1,sort:'[啤酒营销]',href:'/co/?id=8776',title:'福建福德元一商贸有限公司（西藏青稞啤酒）'},
                {id:2,sort:'[白酒营销]',href:'/co/?id=7152',title:'泸州天之圣液酒'},
                {id:3,sort:'[白酒营销]',href:'/co/?id=4956',title:'贵州贵矛合酒'},
                {id:4,sort:'[白酒营销]',href:'/co/?id=9107',title:'贵州怀庄酒业(集团)贵醑酒全国运营总部'},
                {id:5,sort:'[果酒营销]',href:'/co/?id=9108',title:'安徽扬子尊享酒业有限公司'},
                {id:6,sort:'[果酒营销]',href:'/co/?id=8919',title:'上海心雨食品有限公司'},
            ]
        }
    },
    components:{
        TransitionScale
    },
    methods:{
        toggle(event){
            // 当点击目标不包含高亮的类名时，highLightFlag值取反，切换内容栏和tab栏的高亮
            // 插件v-tap的event对象为：{event,methods,tapObj}
            if(event.event.target.classList.contains('tuijian-sort-li-active') != true){
                this.highLightFlag = !this.highLightFlag
            }
        }
    },
    directives:{
        divHeight:{
            componentUpdated(el){
                let divHeight = window.getComputedStyle(el,null).height
                el.style.height = divHeight
            }
        }
    }
}
</script>
<style lang="css" scoped>
    .tuijian{
        margin-top: 10px;
        /* height: 220px; */
        overflow: hidden;
        position: relative;
    }
    .tuijian-sort-ul{
        display: flex;
    }
    .tuijian-sort-li{
        width: 50%;
        flex: 1;
        font-weight: bold;
        font-size: 130%;
        padding: 2%;
    }
    .tuijian-sort-li-active {
        background: #faf0f1;
        color: #df3031;
    }
    /* .tuijian-content{
        position: relative;
    } */
    .tuijian-content ul {
        width: 100%;
    }
    .tuijian-content li{
        width: 100%;
        border-bottom: 1px solid #f0eff5;
        text-align: left;
        padding-left: 10px;
        white-space: nowrap;
        padding: 2%;
    }
    .tuijian-content li span {
        color: #df3031;
        margin-left: 4px;
    }
</style>