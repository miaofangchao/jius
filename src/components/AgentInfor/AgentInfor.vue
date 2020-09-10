<template>
  <div class="agent-infor">
    <Header />
    <AgentInforList
      :currentPage="currentPage"
      :list="list"
      @getNewPage="getNewPage"
      title="代理意向信息库"
    />
    <Footer />
  </div>
</template>
<script>
import Header from "../fl/Header";
import Footer from "../Footer";
import getAgentInfor from "../../api/agentInfor";
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
    //获取数据：page是当前页数，area是地区
    getNewPage(...[args]) {
      let page = args[0];
      let area = args[1];
      let flId = args[2];
      Indicator.open();
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

      // setTimeout(() => {
      //   Indicator.close();
      // }, 500);
    },
  },
  beforeRouteEnter(to, from, next) {
    Indicator.open();
    getAgentInfor(1).then(
      (resolve) => {
        next((vm) => {
          console.log(resolve.data);
          vm.currentPage = 1;
          vm.list = resolve.data;
          Indicator.close();
        });
      },
      //加载出错，不调用next跳转
      () => {
        Indicator.close();
        myToast("加载出错", 1500);
      }
    );
    // 核查数据库错误数据
    // Vue.axios.get('http://m-cs.jius.net/hecha.asp?page=40')
    //   .then(res=>{
    //     next(vm=>{
    //       vm.test = res.data
    //       console.log(vm.test)
    //       console.log(vm.test[4999].id)
    //     })
    //   })

    // 测试数据
    // setTimeout(() => {
    //   Indicator.close();
    //   next((vm) => {
    //     vm.list = JSON.parse(
    //       '[{"id":"399864","date":"2019/9/4 11:46:27","name":"陈先生","area":"安徽合肥","companyName":"青岛琅琊台集团股份有限公司","companyId":"2186","pageCount":"0"},{"id":"399863","date":"2019/9/4 11:46:27","name":"贾先生","area":"浙江温州","companyName":"烟台锦华酒业有限公司","companyId":"7389"},{"id":"399862","date":"2019/9/4 11:46:27","name":"刘","area":"重庆万州","companyName":"四川仙潭集团金旺年酒业有限公司","companyId":"2153"},{"id":"399861","date":"2019/9/4 11:46:27","name":"李先生","area":"山东潍坊","companyName":"浙江中凯生态食品有限公司","companyId":"7559"},{"id":"399860","date":"2019/9/4 11:46:27","name":"崔先生","area":"江苏徐州","companyName":"上海易佰国际酒业有限公司","companyId":"2327"},{"id":"399859","date":"2019/9/4 11:46:27","name":"李盛斌","area":"广西玉林","companyName":"苏州海普利斯贸易有限公司","companyId":"5510"},{"id":"399858","date":"2019/9/4 11:46:27","name":"黄昌","area":"广东韶关","companyName":"北京德福宝投资管理有限公司","companyId":"628"},{"id":"399857","date":"2019/9/4 11:46:27","name":"宋先生","area":"吉林长春","companyName":"安徽弋江酒业有限公司","companyId":"5222"},{"id":"399856","date":"2019/9/4 11:46:27","name":"吕建波","area":"山东滨州","companyName":"河南省七溪商贸有限公司","companyId":"5484"},{"id":"399855","date":"2019/9/4 11:46:27","name":"石航","area":"河北邯郸","companyName":"潍坊欧美亚国际葡萄酒有限公司","companyId":"1389"},{"id":"399854","date":"2019/9/4 11:46:27","name":"郭贵兵","area":"江西南昌市","companyName":"郎酒1912品牌运营中心-四川郎酒集团","companyId":"2808"},{"id":"399853","date":"2019/9/4 11:46:27","name":"谭","area":"浙江杭州","companyName":"江苏洋河酿酒业有限公司","companyId":"2243"},{"id":"399852","date":"2019/9/4 11:46:27","name":"王先生","area":"辽宁鞍山","companyName":"四川喜庆人家酒业有限公司","companyId":"5635"},{"id":"399851","date":"2019/9/4 11:46:27","name":"李玉杰","area":"天津和平","companyName":"百威啤酒国际有限公司","companyId":"5585"},{"id":"399850","date":"2019/9/4 11:46:27","name":"朱洪","area":"河北邯郸","companyName":"茅台集团华东销售公司","companyId":"2442"},{"id":"399849","date":"2019/9/4 11:46:27","name":"董军锋","area":"山东菏泽","companyName":"怀旧酒业有限公司","companyId":"5378"},{"id":"399848","date":"2019/9/4 11:46:27","name":"孙秀国","area":"山东聊城","companyName":"重庆雷行天下国际商贸有限公司","companyId":"5263"},{"id":"399847","date":"2019/9/4 11:46:27","name":"杨海宁","area":"宁夏银川","companyName":"贵州茅台集团华窖酒全国营销中心","companyId":"2522"},{"id":"399846","date":"2019/9/4 11:46:27","name":"吴丹煜","area":"广东汕头","companyName":"青岛纯啤啤酒有限公司","companyId":"635"},{"id":"399845","date":"2019/9/4 11:46:27","name":"周颖","area":"河北衡水","companyName":"烟台奥特卡罗葡萄酒有限公司","companyId":"5163"}]'
    //     );
    //   });
    // }, 500);
  },
};
</script>
<style lang="css" scoped>
</style>