<template>
  <div class="agent-infor">
    <Header />
    <AgentInforList
      :currentPage="currentPage"
      :list="list"
      @getNewPage="getNewPage"
    />
    <Footer />
  </div>
</template>
<script>
import Header from "../fl/Header";
import Footer from "../Footer";
import getAgentInfor from "@/api/agentInfor";
import getMyAgentInfor from '@/api/agentInfor-my'
import { Indicator } from "mint-ui";
import AgentInforList from "./AgentInforList";
import myToast from "../../views/myToast";
export default {
  data() {
    return {
      currentPage: 1,
      list: [],
    };
  },
  components: {
    Header,
    Footer,
    AgentInforList,
  },
  methods: {
    //首次获取数据。在beforeRouterEnter中获取时，缓存组件每次进入也会触发。在created中获取数据。
    getData(){
      Indicator.open();
        getAgentInfor(1).then(
          (resolve) => {
              console.log(resolve.data);
              this.currentPage = 1;
              this.list = resolve.data;
              Indicator.close();
          },
          //加载出错，不调用next跳转
          () => {
            Indicator.close();
            myToast("加载出错", 1500);
          }
        );
    },
    //获取数据：page是当前页数，area是地区
    getNewPage(flag, ...[args]) {
      let page = args[0];
      let area = args[1];
      let flId = args[2];
      Indicator.open();
      if (flag === true) {
        //flag为true获取全国数据
        getAgentInfor(page, area, flId).then(
          (resolve) => {
            console.log(resolve.data);
            this.list = resolve.data;
            this.currentPage = page;
            window.scrollTo(0, 0);
            Indicator.close();
          },
          () => {
            Indicator.close();
            myToast("加载出错", 1500);
          }
        );
      }else{
        //false 获取我的数据
        let comId = this.$root.$data.sharedStore.state.comId
        getMyAgentInfor(comId,page,area,flId).then(
          resolve=>{
            console.log(resolve.data);
            this.list = resolve.data;
            this.currentPage = page;
            window.scrollTo(0, 0);
            Indicator.close();
          },
          () => {
            Indicator.close();
            myToast("加载出错", 1500);
          }
        )
      }
    }
  },
  created() {
    this.getData();
  },
}
</script>
<style lang="css" scoped>
.agent-infor{
  width: 100%;
}
</style>