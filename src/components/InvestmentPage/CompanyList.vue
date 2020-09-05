<template>
    <div class="investment-page-companylist">
        <h2 class="investment-page-companylist-h2" ref="h">{{title[$route.query.id]}}</h2>
        <ul class="investment-page-companylist-ul">
            <li v-for="(item,index) in listData" :key="item.id" class="investment-page-companylist-li" v-liResetHeight>
                <a :href="'/co/?id='+item.id">
                    <img :src="coverImg" alt="" v-if="showCoverimgFlag[index]">
                    <TransitionFade>
                        <img 
                            class="investment-page-companylist-showimg"
                            :src="item.imgSrc" 
                            :alt="item.name" 
                            v-show="!showCoverimgFlag[index]" 
                            @load="hidFillImg(index)" 
                            ref="img">
                    </TransitionFade>
                    <p class="investment-page-companylist-ul-p">{{item.name}}</p>
                </a>
            </li>
        </ul>
        <ul class="investment-page-companylist-btn">
            <li v-tap="{methods:toFirstPage}">首页</li>
            <li v-tap="{methods:toPreviousPage}">上一页</li>
            <li class="investment-page-companylist-select-li">
                <select name="pageNum" class="investment-page-companylist-select" ref="select" @change="turnPage" v-model="selectValue">
                    <option :value="item" v-for="item in pageNum" :key="item">{{item}}/{{pageNum}}</option>
                </select>
            </li>
            <li v-tap="{methods:toNextPage}">下一页</li>
            <li v-tap="{methods:toLasttPage}">尾页</li>
        </ul>
    </div>
</template>
<script>
import coverImg from '@/assets/cover.png'
import TransitionFade from './../../views/TransitionFade'
export default {
    data() {
        return {
            title:[
                '',
                '白酒招商',
                '啤酒招商',
                '保健酒招商',
                '葡萄酒招商',
                '红酒招商',
                '黄米果酒招商',
            ],
            coverImg:coverImg,
            showCoverimgFlag:[1,1,1,1,1,1,1,1,1,1],
            selectValue:1//当前页数
        }
    },
    components:{
        TransitionFade
    },
    computed: {
        pageNum(){
            if(this.listData){
                return Number(this.listData[0].pageCount)
            }else{
                return null
            }
        }
    },
    props:{
        listData:{
                type:Array,
                defaule:null
            }
    },
    methods:{
        hidFillImg(index){
            this.$set(this.showCoverimgFlag,index,false)
        },
        toFirstPage(){
            if(this.selectValue > 1){
                this.selectValue = 1
                //需要手动激活一次change事件，直接修改value、selected都不触发change，所以可以根据$route.query.page的值动态改变selectValue的值而不会重复push路由
                //Vue.nextTick()，点击后等selectValue的值刷新后再触发事件，否则触发事件的selectValue值为原始值，等同于重复提交当前路由，报错
                this.$nextTick().then(()=>{
                    this.dispatchEventChange()
                })
            }   
        },
        toPreviousPage(){
            if(this.selectValue > 1){
                this.selectValue--
                this.$nextTick().then(()=>{
                    this.dispatchEventChange()
                })
            }
        },
        toNextPage(){
            if(this.selectValue < this.pageNum){
                this.selectValue++
                this.$nextTick().then(()=>{
                    this.dispatchEventChange()
                })
            }
        },
        toLasttPage(){
            if(this.selectValue < this.pageNum){
                this.selectValue = this.pageNum
                this.$nextTick().then(()=>{
                    this.dispatchEventChange()
                })
            }
        },
        //使用v-model配合watch 代替change事件 来触发翻页事件
        //翻页时，触发change事件,改变路由
        turnPage(){
            console.log('turnPage:' + this.selectValue)
            this.$router.push({path:'/InvestmentPage/'+this.$route.params.id,query:{id:this.$route.query.id,page:this.selectValue}})  
        },
        //需要手动激活一次change事件，因为修改value、selected都不触发change
        dispatchEventChange(){
            this.$refs.select.dispatchEvent(new Event('change'))
        }
    },
    directives:{
        //初始化li的高度
        liResetHeight:{
            bind(el){
                const windowWidth = document.body.offsetWidth//窗口宽度
                const imgWH = 300 / 225                      //图片的宽高比
                el.style.height = ( windowWidth - windowWidth * 0.1 ) / 2 / imgWH + 30 + 'px' //0.1是10%，图片的margin；30是p标签的高度，
            }
        }
    },
    watch: {
        listData(){
            console.log('数据改变')
            const n = this.listData.length
            //第一次渲染时，this.$refs.img为undefined；
            if(this.$refs.img !== undefined){
                console.log('缓存图片'+this.$refs.img[0].complete)
                //在下次刷新时判断 img是否有缓存过。否则判断的是上次的图片，一直是true
                this.$nextTick().then(()=>{
                    if(this.$refs.img[0].complete){
                        this.showCoverimgFlag = Array(n).fill(false)
                    }else{
                        this.showCoverimgFlag = Array(n).fill(true)
                    }
                })
            }else{
                this.showCoverimgFlag = Array(n).fill(true)
                console.log('第一次加载图片：'+this.showCoverimgFlag)
            }
        },
        //当使用浏览器前进、后退按钮改变路由时，刷新selectValue的值
        $route(){
            console.log('$route')
            this.selectValue = this.$route.query.page
        }
    },
    //当刷新页面时，同步更新selectValue
    mounted() {
        this.selectValue = this.$route.query.page
    },
}
</script>
<style lang="css" scoped>
.investment-page-companylist-h2{
    text-align: left;
    padding-left: 2%;
    color: #df3031;
    border-bottom: 1px solid #df3031;
    margin-bottom: 0px;
    padding-bottom: 5px;
}
.investment-page-companylist-ul{
    display: flex;
    flex-wrap: wrap;
}
.investment-page-companylist-li{
    width: 45.5%;
    position: relative;
    margin: 10px 0 0 3%;
    overflow: hidden;
    background: #fff;
}
.investment-page-companylist-ul-p{
    color: #444;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    white-space: nowrap;
}
.investment-page-companylist-btn{
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    font-size: 120%;
}
.investment-page-companylist-btn li{
    flex: 3;
    border-right: 1px solid gray;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    padding: 1%;
    background-color: #efefef;
}
.investment-page-companylist-btn li:nth-child(3){
    flex: 4;
}
.investment-page-companylist-select{
    border: none;
    background-color: inherit; 
    font-size: 100%; 
    vertical-align: sub;
    text-align: center;
}
.investment-page-companylist-showimg{
    position: absolute;
    left: 0;
}
</style>