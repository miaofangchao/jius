<template>
  <div class="huobao">
    <div>
      <div class="huobao-zhaoshang">
        <img src="@/assets/huobaozhaoshang.jpg" alt="火爆专区" />
      </div>
    </div>
    <div>
        <ul class="huobao-list">
            <li class="huobao-list-li" v-for="item in imgList" :key="item.id">
                <a class="huobao-list-li-a" :href="item.href" :title="item.title">
					<img :alt="item.title" :src="item.src">
				</a>
            </li>
        </ul>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            imgList:[
                { id:1, href:'/co/?id=4479', src:'/images/huobao/aidingbaopijiu.jpg',title:'英国爱丁堡啤酒集团国际有限公司'},
                { id:2, href:'/co/?id=5235', src:'/images/huobao/anhuijinshenghaomaka.jpg',title:'金盛豪玛咖养生啤酒'},
                { id:3, href:'/co/?id=5140', src:'/images/huobao/anhuitianxiafangjiuye.jpg',title:'安徽天下酒坊酒业有限公司'},
                { id:4, href:'/co/?id=9047', src:'/images/huobao/beijingyidanliang.jpg',title:'北京老汉一担粮二锅头酒业有限公司'},
                { id:5, href:'/co/?id=8618', src:'/images/huobao/beijinglibao.jpg',title:'北京栗宝酒业有限公司'},
                { id:6, href:'/co/?id=5147', src:'/images/huobao/beijingwulanshan.jpg',title:'北京午栏山酒业'}
            ]
        }
    },
}
</script>
<style lang="css" scoped>
.huobao{
    margin-top: 10px;
}
.huobao-zhaoshang{
    font-size: 0;
}
.huobao-list{
    display: flex;
    flex-wrap: wrap;
}
.huobao-list-li{
    box-sizing: border-box;
    width: 33.33%;
    border-right: solid 1px #efefef;
    border-bottom: solid 1px #efefef;
}
.huobao-list-li-a{
    font-size: 0;
}
</style>