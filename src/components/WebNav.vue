<template>
  <div class="web-nav">
    <div class="web-nav-search">
        <form action="http://www.jius.net/Search/Search.asp" name="searchform" method="POST" accept-charset="gb2312">
            <select name="Type" class="web-nav-select">
                <option value="Company" selected="selected">企业</option>
                <option value="Product">产品</option>
                <option value="Class">供求</option>
                <option value="Article">展会</option>
                <option value="Article">商情</option>
                <option value="Company">白酒</option>
                <option value="Company">啤酒</option>
            </select>
            <input type="text" class="web-nav-input" value placeholder="请输入关键词！" name="Key"/>
            <input type="submit" class="web-nav-button" value="搜索" />
        </form>
    </div>
    <div class="web-nav-sort">
      <ul>
        <li>
          <div class="web-nav-sort-head">招商代理</div>
          <div class="web-nav-sort-list">
            <router-link to="/InvestmentPage/baijiu?id=1&page=1">白酒招商</router-link>
            <router-link to="/InvestmentPage/pijiu?id=2&page=1">啤酒招商</router-link>
            <router-link to="/InvestmentPage/putaojiu?id=4&page=1">葡萄酒</router-link>
            <router-link to="/InvestmentPage/hongjiu?id=5&page=1">红酒</router-link>
            <router-link to="/InvestmentPage/baojianjiu?id=3&page=1">保健酒</router-link>
            <router-link to="/InvestmentPage/guojiu?id=6&page=1">黄果米酒</router-link>
            <router-link to="http://m.jius.net/weixin/zszx.html">代理意向</router-link>
            <a href="http://www.jius.net/expo/">糖酒会</a>
            <a href="http://www.jius.net/Article/">酒水咨询</a>
          </div>
        </li>
        <li>
          <div class="web-nav-sort-head">快速选品</div>
          <div class="web-nav-sort-list">
            <a href="javascript:void(0)">诚信企业</a>
            <a href="javascript:void(0)">火爆产品</a>
            <a href="javascript:void(0)">热门专题</a>
            <a href="javascript:void(0)">热门产品</a>
          </div>
        </li>
        <li>
          <div class="web-nav-sort-head">行业动态</div>
          <div class="web-nav-sort-list">
            <a href="javascript:void(0)">酒业新闻</a>
            <a href="javascript:void(0)">品牌资讯</a>
            <a href="javascript:void(0)">糖酒会</a>
            <a href="javascript:void(0)">酒业财经</a>
            <a href="javascript:void(0)">商机互动</a>
            <a href="javascript:void(0)">酒企资讯</a>
          </div>
        </li>
        <li>
          <div class="web-nav-sort-head">价格行情</div>
          <div class="web-nav-sort-list">
            <a href="javascript:void(0)">白酒</a>
            <a href="javascript:void(0)">啤酒</a>
            <a href="javascript:void(0)">白酒</a>
            <a href="javascript:void(0)">葡萄酒</a>
            <a href="javascript:void(0)">养生酒</a>
            <a href="javascript:void(0)">特产酒</a>
          </div>
        </li>
        <li>
          <div class="web-nav-sort-head">酒文化</div>
          <div class="web-nav-sort-list">
            <a href="javascript:void(0)">白酒百科</a>
            <a href="javascript:void(0)">啤酒百科</a>
            <a href="javascript:void(0)">白酒百科</a>
            <a href="javascript:void(0)">葡萄酒百科</a>
            <a href="javascript:void(0)">养生酒百科</a>
            <a href="javascript:void(0)">特产酒百科</a>
            <a href="javascript:void(0)">鸡尾酒百科</a>
            <a href="javascript:void(0)">百科专题</a>
            <a href="javascript:void(0)">名酒大全</a>
            <a href="javascript:void(0)">好酒问答</a>
            <a href="javascript:void(0)">百科问答</a>
          </div>
        </li>
        <li>
          <div class="web-nav-sort-head">营销经管</div>
          <div class="web-nav-sort-list">
            <a href="javascript:void(0)">招商研究院</a>
            <a href="javascript:void(0)">经销商论坛</a>
            <a href="javascript:void(0)">专业市场</a>
            <a href="javascript:void(0)">行业协会</a>
            <a href="javascript:void(0)">黑格咨询</a>
          </div>
        </li>
      </ul>
    </div>
    <div class="web-nav-close" v-tap="{methods:closeWebNav}">
        点击关闭导航
    </div>
  </div>
</template>
<script>
export default {
  methods:{
    closeWebNav(){
      this.$emit('closeWebNav')
    }
  }
};
</script>
<style lang="css" scoped>
.web-nav{
    background-color: #ff3e3e;;
    position: fixed;
    top: 0;
    z-index: 999;
    font-size: 100%;
}
.web-nav-search,.web-nav-sort{
    background-color: white;
    padding-top: 15px;
}
.web-nav-select{
    width: 20%;
    padding: 2%;
}
.web-nav-input{
    width:50% ;
    padding: 2%;
}
.web-nav-button{
    width: 15%;
    padding: 1.7%;
}
.web-nav-select,.web-nav-input,.web-nav-button{
    font-size: 100%;
    vertical-align: middle;
    margin-left: 1%;
    border: 1px solid #afafaf;;
}
.web-nav-sort li{
    display: flex;
    border-bottom: 1px solid #b0b0b0;
}
.web-nav-sort li:nth-child(n+2){
    margin-top: 10px;
}
.web-nav-sort-head{
    width: 20%;
    font-weight: bolder;
    font-size: 110%;
}
.web-nav-sort-list{
    width: 80%;
    display: flex;
    flex-wrap: wrap;
}
.web-nav-sort-list a{
    width: 33.33%;
    padding-bottom: 3%;
}
.web-nav-close{
  font-size: 120%;
  color: white;
  padding: 2%;
}
</style>