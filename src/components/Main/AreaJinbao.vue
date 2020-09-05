<template>
  <div class="jinbao">
    <div>
      <div class="jinbao-zhaoshang">
        <img src="@/assets/jinbao.jpg" alt="火爆专区" />
      </div>
    </div>
    <div>
        <ul class="jinbao-list">
            <li class="jinbao-list-li" v-for="item in imgList" :key="item.id">
                <a class="jinbao-list-li-a" :href="item.href" :title="item.title">
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
                { id:1, href:'/co/?id=4479', src:'/images/jinbao/fujianfudeyuanyi.jpg',title:'福建福德元一商贸有限公司（西藏青稞啤酒）'},
                { id:2, href:'/co/?id=5235', src:'/images/jinbao/guimaohejiuye.jpg',title:'贵州贵矛合酒'},
                { id:3, href:'/co/?id=5140', src:'/images/jinbao/guizhouhuaizhuangjiuyejituan.jpg',title:'贵州怀庄酒业(集团)贵醑酒全国运营总部'},
            ]
        }
    },
}
</script>
<style lang="css" scoped>
.jinbao{
    margin-top: 10px;
}
.jinbao-zhaoshang{
    font-size: 0;
}
.jinbao-list{
    display: flex;
    flex-wrap: wrap;
}
.jinbao-list-li{
    box-sizing: border-box;
    width: 33.33%;
    border-right: solid 1px #efefef;
    border-bottom: solid 1px #efefef;
}
.jinbao-list-li-a{
    font-size: 0;
}
</style>