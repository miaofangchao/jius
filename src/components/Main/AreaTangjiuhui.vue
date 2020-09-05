<template>
  <div class="tangjiuhui">
    <div class="tangjiuhui-top">
      <a href="http://www.jius.net/expo/">
        <img src="@/assets/tangjiuhuituijian.jpg" />
      </a>
      <ul class="tangjiuhui-top-ul">
        <li class="tangjiuhui-top-li" v-for="item in imgList" :key="item.id">
          <a :href="item.href">
            <img :src="item.src" />
          </a>
        </li>
      </ul>
    </div>
    <div class="tangjiuhui-content">
      <ul class="tangjiuhui-content-ul">
        <li class="tangjiuhui-content-li" v-for="item in contentList" :key="item.id">
          <a :href="item.href">
            <h3>{{item.title}}</h3>
            <p>{{item.time}}</p>
            <p>{{item.place}}</p>
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
        {id:1,src:'/images/tangjiuhui/zhengzhoutangjiuhui.jpg',href:'http://www.jius.net/expo_44190_1/'},
        {id:2,src:'/images/tangjiuhui/guizhoutangjiuhui.jpg',href:'http://www.jius.net/expo_44130_1/'}
      ],
      contentList:[
        {
          id:1,
          title:'2020第十一届中国（上海）国际高端葡萄酒及烈酒展览会',
          href:'http://www.jius.net/expo_35_1_0/',
          time:'时间：2020/6/4至2020/6/6',
          place:'地点：中国·上海光大会展中心'
        },
        {
          id:2,
          title:'2020 第二十五届中国（郑州）国际糖酒食品交易会',
          href:'http://www.jius.net/expo_44190_1/',
          time:'时间：2020/8/21至2020/8/23',
          place:'地点：郑州国际会展中心'
        },
        {
          id:3,
          title:'2020第十届贵州酒博会-2020第十届中国（贵州）国际酒类',
          href:'http://www.jius.net/expo_44130_1/',
          time:'时间：2020/9/9至2020/9/12',
          place:'地点：贵阳市国际会议展览中心'
        },
      ]
    }
  },
};
</script>
<style lang="css" scoped>
  .tangjiuhui{
    margin-top: 10px;
  }
  .tangjiuhui-top-ul{
    display: flex;
  }
  .tangjiuhui-top-li{
    flex: 1;
    font-size: 0;
  }
  .tangjiuhui-content-li{
    padding:0 2%;
    border-bottom: 1px solid #f0eff5;
  }
  .tangjiuhui-content-li p,.tangjiuhui-content-li h3{
    text-align: left;
  }
  .tangjiuhui-content-li p{
    color: #868484;
  }

  .tangjiuhui-content-li:nth-child(1){
    margin-top: -10px;
  }
</style>