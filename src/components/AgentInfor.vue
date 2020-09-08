<template>
  <div class="agent-infor">
    <Header />
    <div class="agent-infor-content">
      <h2 class="agent-infor-title">代理意向资料库</h2>
      <ul class="agent-infor-sertch">
        <li>
          <span>地区：</span>
        </li>
        <li>
          <select name="agentArea" class="agent-infor-select" v-model="selectArea">
            <option value selected>全国</option>
            <option :value="item[0]" v-for="(item,index) in provinceArr" :key="index">{{item[0]}}</option>
          </select>
        </li>
        <li>
          <button class="agent-infor-btn" v-tap="{methods:queryArea}">查询</button>
        </li>
      </ul>
      <ul class="agent-infor-header">
        <li>时间</li>
        <li>联系人</li>
        <li>代理区域</li>
        <li>联系电话</li>
        <li>意向公司</li>
      </ul>
      <ul class="agent-infor-list" v-for="item in list" :key="item.id">
        <li>{{item.date.split(' ')[0]}}</li>
        <li>
          <p>{{item.name}}</p>
        </li>
        <li>{{item.area}}</li>
        <li class="agent-infor-vip" v-tap="{methods:getTel,id:item.id}">VIP查看</li>
        <li>
          <a :href="'/co/?id='+item.companyId">{{item.companyName}}</a>
        </li>
      </ul>
      <ul class="agent-infor-btn-turnpage">
        <li v-tap="{methods:toFirstPage}">首页</li>
        <li v-tap="{methods:toPreviousPage}">上一页</li>
        <li v-tap="{methods:showInputPageNum}">
          <p>{{currentPage}}/{{pageCount}}</p>
        </li>
        <li v-tap="{methods:toNextPage}">下一页</li>
        <li v-tap="{methods:toLasttPage}">尾页</li>
      </ul>
    </div>
    <Footer />
    <TransitionFade>
      <div class="input-pagenum" v-show="showInputPageNumFlag">
        <input
          type="number"
          placeholder="请输入跳转页码"
          v-model="inputNum"
          class="input-pagenum-num"
          ref="inputPageNum"
        />
        <input type="button" value="跳转" v-tap="{methods:jumpPage}" />
        <p v-tap="{methods:closeAll}">点击关闭</p>
      </div>
    </TransitionFade>
    <TransitionFade>
      <CoverFullPage v-show="showInputPageNumFlag" @closeAll="closeAll" />
    </TransitionFade>
    <div class="agent-infor-tel" v-html="tel" v-show="showTelFlag"></div>
  </div>
</template>
<script>
import Header from "./fl/Header";
import Footer from "./Footer";
import CoverFullPage from "../views/CoverFullPage";
import TransitionFade from "../views/TransitionFade";
import getAgentInfor from "../api/agentInfor";
import getTelInfor from "../api/agentInfor-tel";
import { Indicator } from "mint-ui";
import myToast from "../views/myToast"
export default {
  data() {
    return {
      showInputPageNumFlag: false,
      selectArea: "", //地区delect绑定
      currentPage: 1, //当前页码
      inputNum: null, //将要跳转页码
      provinceArr: "", //地区option
      list: null, //数据列表
      tel: "", //获取vip查看的电话
      showTelFlag: false,
      telTimerId: null, //延时id
      //测试数据
      // msgList:
      //   '[{"id":"399719","date":"2020/09/03 11:44:04","name":"刘仁辉","area":"辽宁丹东","companyName":"祥昱商行","companyId":"806","pageCount":"13751"},{"id":"399718","date":"2020/9/3 11:43:53","name":"何女士","area":"湖北襄阳","companyName":"西凤贵宾酒全国营销中心","companyId":"2646"},{"id":"399717","date":"2020/9/3 11:43:43","name":"焦凡奎","area":"河北邢台","companyName":"江苏五琼浆酒业有限公司","companyId":"5799"},{"id":"399715","date":"2020/9/3 11:43:22","name":"龚建林","area":"福建龙岩","companyName":"杨令公酒业有限公司","companyId":"5309"},{"id":"399714","date":"2020/9/3 11:43:07","name":"李","area":"河北邢台","companyName":"洋河御酒酒业有限公司","companyId":"2397"},{"id":"399713","date":"2020/9/3 11:43:00","name":"周先生","area":"山东潍坊","companyName":"长沙尹上酒类贸易公司","companyId":"5113"},{"id":"399712","date":"2020/9/3 11:42:48","name":"孙","area":"内蒙古呼和浩特","companyName":"里开酒厂","companyId":"3106"},{"id":"399711","date":"2020/9/3 11:42:30","name":"刘先生","area":"江苏苏州","companyName":"北京九门之尊酒业有限公司","companyId":"7861"},{"id":"399710","date":"2020/9/3 11:42:29","name":"王涛","area":"山东日照","companyName":"深圳市长圣酒业有限公司","companyId":"2984"},{"id":"399709","date":"2020/9/3 11:42:28","name":"高增厚","area":"山东烟台","companyName":"四川丰谷酒业有限公司","companyId":"5278"},{"id":"399708","date":"2020/9/3 11:42:07","name":"刘女士","area":"河北保定","companyName":"烟台盛世酒业有限公司","companyId":"962"},{"id":"399707","date":"2020/9/3 11:42:00","name":"李明","area":"安徽六安","companyName":"山东天地缘集团有限公司","companyId":"2719"},{"id":"399706","date":"2020/9/3 11:41:57","name":"刘先生","area":"广东东莞","companyName":"甘肃红川酒业有限责任公司","companyId":"7424"},{"id":"399705","date":"2020/9/3 11:41:42","name":"杨国","area":"辽宁抚顺","companyName":"安徽沙河酒业有限公司","companyId":"2107"},{"id":"399704","date":"2020/9/3 11:41:35","name":"刘阳桥","area":"江苏苏州","companyName":"香港新一代啤酒集团有限公司","companyId":"152"},{"id":"399703","date":"2020/9/3 11:41:33","name":"刘振东","area":"山东济南","companyName":"沈阳锡伯酒业有限公司","companyId":"5988"},{"id":"399702","date":"2020/9/3 11:41:16","name":"陈","area":"江苏宿迁","companyName":"江西宜春泸纯酒业有限公司","companyId":"2512"},{"id":"399701","date":"2020/9/3 11:41:12","name":"齐峰","area":"山东济南","companyName":"新疆伊力特实业股份有限公司","companyId":"243"},{"id":"399700","date":"2020/9/3 11:41:11","name":"罗圣亮","area":"江西宜春","companyName":"山东泉友国科啤酒有限公司","companyId":"642"},{"id":"399699","date":"2020/9/3 11:40:54","name":"林强","area":"山东日照","companyName":"贵州老夫子酒业有限责任公司","companyId":"5622"}]',
    };
  },
  computed: {
    // list() {
    //   return JSON.parse(this.msgList);
    // },
    //数据总页数，在index==0的那个
    pageCount() {
      if (this.list) {
        return Number(this.list[0].pageCount);
      } else {
        return null;
      }
    },
  },
  components: {
    Header,
    Footer,
    CoverFullPage,
    TransitionFade,
  },
  methods: {
    toFirstPage() {
      if (this.currentPage != 1) {
        this.currentPage = 1;
        this.getNewPage(1, this.selectArea);
      }
    },
    toPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.$nextTick().then(() => {
          this.getNewPage(this.currentPage, this.selectArea);
        });
      }
    },
    toNextPage() {
      if (this.currentPage < this.pageCount) {
        this.currentPage++;
        this.$nextTick().then(() => {
          this.getNewPage(this.currentPage, this.selectArea);
        });
      }
    },
    toLasttPage() {
      if (this.currentPage < this.pageCount) {
        this.currentPage = this.pageCount;
        this.$nextTick().then(() => {
          this.getNewPage(this.currentPage, this.selectArea);
        });
      }
    },
    closeAll() {
      this.showInputPageNumFlag = false;
    },
    showInputPageNum() {
      this.showInputPageNumFlag = true;
      setTimeout(() => {
        this.$refs.inputPageNum.focus();
      }, 300);
    },
    // 获取vip电话信息
    getTel(params) {
      this.showTelFlag = false;
      clearTimeout(this.telTimerId);
      getTelInfor(params.id).then(
        (resolve) => {
          this.tel = resolve.data;
          this.showTelFlag = true;
          this.telTimerId = setTimeout(() => {
            this.showTelFlag = false;
          }, 5000);
        },
        () => {
          Indicator.close();
          myToast('加载出错',1500)
        }
      );
      // 测试数据
      // setTimeout(() => {
      //   Indicator.close();
      //   this.showTelFlag = true;
      //   this.tel =
      //     "电话：<img src=/UpFile/CreTel/Dl/399815/c213d61846e406e90b19505575265339.gif border=0 align=absmiddle>";
      //   this.telTimerId = setTimeout(() => {
      //     this.showTelFlag = false;
      //   }, 5000);
      // }, 500);
    },
    //跳转页数
    jumpPage() {
      if (this.inputNum && this.inputNum < this.pageCount) {
        this.showInputPageNumFlag = false;
        this.getNewPage(this.inputNum, this.selectArea);
        this.inputNum = null;
        window.scrollTo(0, 0);
      } else if (this.inputNum > this.pageCount) {
        myToast('请输入小于总页数的值',1500)
      } else {
        myToast('请输入跳转页数',1500)
      }
    },
    //地区查询
    queryArea() {
      this.getNewPage(1, this.selectArea);
    },
    //获取数据：page是当前页数，area是地区
    getNewPage(page, area = "") {
      Indicator.open();
      getAgentInfor(page, area).then(
        (resolve) => {
          console.log(resolve.data);
          this.list = resolve.data;
          this.currentPage = page;
          window.scrollTo(0, 0);
          Indicator.close();
        },
        () => {
          Indicator.close();
          myToast('加载出错',1500)
        }
      );

      // setTimeout(() => {
      //   Indicator.close();
      // }, 500);
    },
    //数据获取失败，加载出错的提示：
    loadErr(){

    }
  },
  created() {
    //保存省份数组
    let provinceArr = [];
    provinceArr[0] = ["北京"];
    provinceArr[1] = ["天津"];
    provinceArr[2] = ["上海"];
    provinceArr[3] = ["重庆"];
    provinceArr[4] = ["河北"];
    provinceArr[5] = ["河南"];
    provinceArr[6] = ["云南"];
    provinceArr[7] = ["辽宁"];
    provinceArr[8] = ["黑龙江"];
    provinceArr[9] = ["湖南"];
    provinceArr[10] = ["安徽"];
    provinceArr[11] = ["山东"];
    provinceArr[12] = ["新疆"];
    provinceArr[13] = ["江苏"];
    provinceArr[14] = ["浙江"];
    provinceArr[15] = ["江西"];
    provinceArr[16] = ["湖北"];
    provinceArr[17] = ["广西"];
    provinceArr[18] = ["甘肃"];
    provinceArr[19] = ["山西"];
    provinceArr[20] = ["内蒙古"];
    provinceArr[21] = ["陕西"];
    provinceArr[22] = ["吉林"];
    provinceArr[23] = ["福建"];
    provinceArr[24] = ["贵州"];
    provinceArr[25] = ["广东"];
    provinceArr[26] = ["青海"];
    provinceArr[27] = ["西藏"];
    provinceArr[28] = ["四川"];
    provinceArr[29] = ["宁夏"];
    provinceArr[30] = ["海南"];
    provinceArr[31] = ["台湾"];
    provinceArr[32] = ["香港"];
    provinceArr[33] = ["澳门"];
    this.provinceArr = provinceArr;
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
        myToast('加载出错',1500);
      }
    );

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
.agent-infor-title {
  text-align: left;
  padding-left: 2%;
  color: #df3031;
  border-bottom: 1px solid #df3031;
  margin-bottom: 0;
  padding-bottom: 5px;
}
.agent-infor-content {
  text-align: left;
}
.agent-infor-sertch {
  display: flex;
  flex-wrap: nowrap;
  padding: 1% 1%;
  border-bottom: 1px solid gray;
}
.agent-infor-sertch li:nth-child(1) {
  align-self: center;
  font-size: 120%;
}
.agent-infor-select {
  font-size: 100%;
  height: 100%;
}
.agent-infor-btn {
  font-size: 100%;
}
.agent-infor-header {
  box-sizing: border-box;
  margin-top: 5px;
  text-align: center;
}
.agent-infor-header li {
  padding: 4% 0;
}
.agent-infor-header,
.agent-infor-list {
  display: flex;
  flex-wrap: nowrap;
  padding: 0 1%;
}
.agent-infor-header li,
.agent-infor-list li {
  background-color: #ededed;
  margin-left: 1px;
  width: 18%;
}
.agent-infor-list li {
  margin-top: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.agent-infor-header li:nth-child(5),
.agent-infor-list li:nth-child(5) {
  flex: 1;
}
.agent-infor-header li:nth-child(1),
.agent-infor-list li:nth-child(1) {
  width: 20%;
}
.agent-infor-vip {
  color: red;
}
.agent-infor-btn-turnpage {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  font-size: 120%;
  text-align: center;
}
.agent-infor-btn-turnpage li {
  flex: 3;
  border-right: 1px solid gray;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  padding: 1%;
  background-color: #efefef;
}
.agent-infor-btn-turnpage li:nth-child(3) {
  flex: 4;
  display: flex;
  align-items: center;
}
.agent-infor-btn-select {
  border: none;
  background-color: inherit;
  font-size: 100%;
  vertical-align: sub;
  text-align: center;
}
.input-pagenum {
  z-index: 998;
  position: fixed;
  top: 40%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.input-pagenum input {
  font-size: 120%;
  border-radius: 5px;
  border: none;
  padding: 2%;
}
.input-pagenum p {
  font-size: 120%;
  width: 50%;
  color: white;
  margin-top: 5px;
}
.agent-infor-tel {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  color: red;
}
</style>