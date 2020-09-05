<template>
  <div class="zhizun">
    <div>
      <div class="zhizun-zhaoshang">
        <img src="@/assets/zhizunzhuanqu.jpg" alt="火爆专区" />
      </div>
    </div>
    <div>
        <ul class="zhizun-list">
            <li class="zhizun-list-li" v-for="item in imgList" :key="item.id">
                <a class="zhizun-list-li-a" :href="item.href" :title="item.title">
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
                { id:1, href:'/co/?id=8711', src:'/images/zhizun/jiangsushuanggoujiuye.jpg',title:'江苏双沟酒业'},
                { id:2, href:'/co/?id=9255', src:'/images/zhizun/guizhouzuideyuanjiuyeyouxiangongsi.jpg',title:'贵州醉德缘酒业有限公司'},
                { id:3, href:'/co/?id=9131', src:'/images/zhizun/jiuyuejiuyijiuye.jpg',title:'贵州省仁怀市九月九忆酒业'},
                { id:4, href:'/co/?id=8909', src:'/images/zhizun/guizhoubohonghuijiuye.jpg',title:'贵州铂泓汇酒业有限公司、茅台集团白金酒公司白金秘酱酒 '},
                { id:5, href:'/co/?id=9119', src:'/images/zhizun/shanxixifengjiuye.jpg',title:'陕西西凤美香酒业-西凤酒十二生肖酒'},
                { id:6, href:'/co/?id=8919', src:'/images/zhizun/shanghaixinyu.jpg',title:'上海心雨食品有限公司'},
                { id:7, href:'/co/?id=8520', src:'/images/zhizun/shenyangbeitechunjiuchang.jpg',title:'沈阳市北特春酒厂'},
                { id:8, href:'/co/?id=8969', src:'/images/zhizun/shengyangdongquanjiuchang.jpg',title:'沈阳市东泉酒厂 '},
                { id:9, href:'/co/?id=8825', src:'/images/zhizun/sichuanhezuoshebaijiu.jpg',title:'四川省合作社白酒有限公司'},
            ]
        }
    },
}
</script>
<style lang="css" scoped>
.zhizun{
    margin-top: 10px;
}
.zhizun-zhaoshang{
    font-size: 0;
}
.zhizun-list{
    display: flex;
    flex-wrap: wrap;
}
.zhizun-list-li{
    box-sizing: border-box;
    width: 33.33%;
    border-right: solid 1px #efefef;
    border-bottom: solid 1px #efefef;
}
.zhizun-list-li-a{
    font-size: 0;
}
</style>