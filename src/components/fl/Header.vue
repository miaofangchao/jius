<template>
  <div class="investment-page-header">
    <ul>
      <li>
        <router-link to="/" exact>首 页</router-link>
      </li>
      <li :class="{'router-link-active':$route.params.id == 'bj'?1:0}">
        <router-link to="/fl/bj?id=1&p=1">白 酒</router-link>
      </li>
      <li :class="{'router-link-active':$route.params.id == 'pj'?1:0}">
        <router-link to="/fl/pj?id=2&p=1">啤 酒</router-link>
      </li>
      <li :class="{'router-link-active':$route.params.id == 'ptj'?1:0}">
        <router-link to="/fl/ptj?id=4&p=1">葡萄酒</router-link>
      </li>
      <li :class="{'router-link-active':$route.params.id == 'hj'?1:0}">
        <router-link to="/fl/hj?id=5&p=1">红 酒</router-link>
      </li>
      <li :class="{'router-link-active':$route.params.id == 'bjj'?1:0}">
        <router-link to="/fl/bjj?id=3&p=1">保健酒</router-link>
      </li>
      <li :class="{'router-link-active':$route.params.id == 'gj'?1:0}">
        <router-link to="/fl/gj?id=6&p=1">黄米果酒</router-link>
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