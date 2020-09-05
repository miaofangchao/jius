<template>
  <div class="investment-page-header">
    <ul>
      <li>
        <router-link to="/" exact>首 页</router-link>
      </li>
      <li :class="{'router-link-active':$route.params.id == 'baijiu'?1:0}">
        <router-link to="/InvestmentPage/baijiu?id=1&page=1">白 酒</router-link>
      </li>
      <li :class="{'router-link-active':$route.params.id == 'pijiu'?1:0}">
        <router-link to="/InvestmentPage/pijiu?id=2&page=1">啤 酒</router-link>
      </li>
      <li :class="{'router-link-active':$route.params.id == 'putaojiu'?1:0}">
        <router-link to="/InvestmentPage/putaojiu?id=4&page=1">葡萄酒</router-link>
      </li>
      <li :class="{'router-link-active':$route.params.id == 'hongjiu'?1:0}">
        <router-link to="/InvestmentPage/hongjiu?id=5&page=1">红 酒</router-link>
      </li>
      <li :class="{'router-link-active':$route.params.id == 'baojianjiu'?1:0}">
        <router-link to="/InvestmentPage/baojianjiu?id=3&page=1">保健酒</router-link>
      </li>
      <li :class="{'router-link-active':$route.params.id == 'guojiu'?1:0}">
        <router-link to="/InvestmentPage/guojiu?id=6&page=1">黄米果酒</router-link>
      </li>
      <li :class="{'router-link-active':$route.path == '/AgentInfor'?1:0}">
        <router-link to="/AgentInfor">代理意向</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
}
</script>
<style lang="css" scoped>
.investment-page-header{
  margin-top: 10px;
}
.investment-page-header ul{
    display: flex;
    flex-wrap: wrap;
}
.investment-page-header li{
    width: 25%;
    box-sizing: border-box;
    padding: 2% 0;
    font-weight: 800;
    border-radius: 5px;
    font-size: 120%;
}
.investment-page-header li a{
  color: #d80105;
}
.router-link-active{
  background-color: #cd100a;
  color: white !important;
}

</style>