<template>
  <div class="mnlist">
    <ul class="top-nav-ul">
      <li>
        <router-link to="/InvestmentPage/baijiu?id=1&page=1">
          <img src="@/assets/baijiu.png" />
          <p>白酒招商</p>
        </router-link>
      </li>
      <li>
        <router-link to="/InvestmentPage/pijiu?id=2&page=1">
          <img src="@/assets/pijiu.png" />
          <p>啤酒招商</p>
        </router-link>
      </li>
      <li>
        <router-link to="/InvestmentPage/putaojiu?id=4&page=1">
          <img src="@/assets/hongjiu.png" />
          <p>葡萄酒招商</p>
        </router-link>
      </li>
      <li>
        <router-link to="/InvestmentPage/baojianjiu?id=3&page=1">
          <img src="@/assets/baojianjiu.png" />
          <p>保健酒招商</p>
        </router-link>
      </li>
      <li>
        <router-link to="/AgentInfor">
          <img src="@/assets/dailiyixiang.png" />
          <p>代理意向</p>
        </router-link>
      </li>
      <li>
        <a href="http://www.jius.net/Article/">
          <img src="@/assets/zixun.png" />
          <p>酒水资讯</p>
        </a>
      </li>
      <li>
        <a href="http://www.jius.net/Class/">
          <img src="@/assets/gongqiu.png" />
          <p>供求信息</p>
        </a>
      </li>
      <li>
        <a href="http://www.jius.net/expo/">
          <img src="@/assets/nongzihui.png" />
          <p>糖酒会</p>
        </a>
      </li>
      <li>
        <a href="http://www.jius.net/Product/">
          <img src="@/assets/chanpinku.png" />
          <p>产品库</p>
        </a>
      </li>
      <li>
        <a href="http://www.jius.net/Company/">
          <img src="@/assets/qiyeku.png" />
          <p>企业库</p>
        </a>
      </li>
    </ul>
  </div>
</template>
<style lang="css" scoped>
.top-nav-ul{
    display: -webkit-flex;
    display: flex;
    flex-wrap: wrap;
}
.mnlist li {
    padding: 2px;
    box-sizing: border-box;
    width: 20%;
}
.mnlist li a {
    color: #555;
}
p{
    font-size: 80%;
}
img{
  width: 60%;
}
</style>