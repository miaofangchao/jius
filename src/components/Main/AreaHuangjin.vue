<template>
  <div class="huangjin">
    <div>
      <div class="huangjin-zhaoshang">
        <img src="@/assets/huangjinzhuanqu.jpg" alt="火爆专区" />
      </div>
    </div>
    <div>
        <ul class="huangjin-list">
            <li class="huangjin-list-li" v-for="item in imgList" :key="item.id">
                <a class="huangjin-list-li-a" :href="item.href" :title="item.title">
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
                { id:1, href:'/co/?id=7152', src:'/images/huangjin/luzhoutianzhishengye.jpg',title:'泸州天之圣液酒'},
                { id:2, href:'/co/?id=9274', src:'/images/huangjin/xuzhouhongbingshu.jpg',title:'徐州红杉树商贸有限公司'},
                { id:3, href:'/co/?id=9108', src:'/images/huangjin/anhuiyangziguojiu.jpg',title:'安徽扬子尊享酒业有限公司'},
                { id:4, href:'/co/?id=8758', src:'/images/huangjin/yangheguoyujiuye.jpg',title:'江苏省宿迁市洋河国御酒业股份有限公司 '},
                { id:5, href:'/co/?id=3713', src:'/images/huangjin/shanghaizuoenjiuye.jpg',title:'上海佐恩酒业有限公司'},
                { id:6, href:'/co/?id=7856', src:'/images/huangjin/sichuanshijiyuanweijiulei.jpg',title:'四川世纪原味酒类销售有限公司'},
                { id:7, href:'/co/?id=8808', src:'/images/huangjin/luzhoushengshijiuyuanjiulei.jpg',title:'泸州盛世久源酒类销售有限公司'},
                { id:8, href:'/co/?id=8998', src:'/images/huangjin/qianfunjiuye.jpg',title:'贵州省仁怀市黔君酒业有限公司 '},
                { id:9, href:'/co/?id=9071', src:'/images/huangjin/sichuanshijihuibojiuye.jpg',title:'四川省合四川世纪汇博酒业有限公司作社白酒有限公司'},
            ]
        }
    },
}
</script>
<style lang="css" scoped>
.huangjin{
    margin-top: 10px;
}
.huangjin-zhaoshang{
    font-size: 0;
}
.huangjin-list{
    display: flex;
    flex-wrap: wrap;
}
.huangjin-list-li{
    box-sizing: border-box;
    width: 33.33%;
    border-right: solid 1px #efefef;
    border-bottom: solid 1px #efefef;
}
.huangjin-list-li-a{
    font-size: 0;
}
</style>