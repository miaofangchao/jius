<template>
  <div class="agent-infor">
    <div class="agent-infor-content">
      <div class="agent-infor-title">
        <h2
          :class="{'agent-infor-title-h2':true,'agent-infor-title-h2-active':lightTitleFlag}"
          v-tap="{methods:toggleToAll}"
        >{{title}}</h2>
        <h2>|</h2>
        <h2
          :class="{'agent-infor-title-h2':true,'agent-infor-title-h2-active':!lightTitleFlag}"
          v-tap="{methods:toggleToSingle}"
        >我的代理意向</h2>
      </div>
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
          <span>企业分类：</span>
        </li>
        <li>
          <select name="agentArea" class="agent-infor-select" v-model="selectSortId">
            <option :value="index" v-for="(item,index) in companySortArr" :key="index">{{item}}</option>
          </select>
        </li>
        <li>
          <button class="agent-infor-btn" v-tap="{methods:querySearch}">查询</button>
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
import CoverFullPage from "../../views/CoverFullPage";
import TransitionFade from "../../views/TransitionFade";
import getTelInfor from "../../api/agentInfor-tel";
import { Indicator } from "mint-ui";
import myToast from "../../views/myToast";
export default {
  data() {
    return {
      lightTitleFlag: true, //高亮显示当前代理库,true显示全国代理，false：我的代理。作为翻页事件的第一个参数，告知父元素该获取哪个数据。
      showInputPageNumFlag: false,
      selectArea: "", //地区delect绑定
      inputNum: null, //将要跳转页码
      provinceArr: "", //地区option
      companySortArr: [
        "全部分类",
        "白酒企业",
        "啤酒企业",
        "保健酒企业",
        "葡萄酒企业",
        "红酒企业",
        "特产酒企业",
      ], //企业分类数组
      selectSortId: 0, //企业分类id绑定
      tel: "", //获取vip查看的电话
      showTelFlag: false,
      telTimerId: null, //延时id
    };
  },
  props: {
    list: Array, ////数据列表
    currentPage: Number, //当前页码
    title: String,
  },
  computed: {
    //数据总页数，在index==0的那个
    pageCount() {
      if (this.list[0]) {
        return Number(this.list[0].pageCount);
      } else {
        return "--";
      }
    },
  },
  components: {
    CoverFullPage,
    TransitionFade,
  },
  methods: {
    //进入全国代理意向
    toggleToAll() {
      if (this.lightTitleFlag == false) {
        //重置两个select 获取第一页数据
        this.selectArea = "";
        this.selectSortId = 0;
        this.lightTitleFlag = true;
        this.$nextTick(() => {
          this.getNewPage([1]);
        });
      }
    },
    //我的代理意向
    toggleToSingle() {
      if (this.lightTitleFlag == true) {
        let loginFlag = this.$root.$data.sharedStore.state.loginFlag;
        if (loginFlag) {
          this.selectArea = "";
          this.selectSortId = 0;
          this.lightTitleFlag = false;
          this.$nextTick(() => {
            this.getNewPage([1]);
          });
        } else {
          myToast("请先登录会员", 2000);
        }
      }
    },
    //触发getNewPage事件，父组件翻页 改变props；this.lightTitleFlag再获取数据时区分是全国还是我的。true是全国，false是我的
    getNewPage(args) {
      this.$emit("getNewPage", this.lightTitleFlag, args);
    },
    toFirstPage() {
      if (this.currentPage != 1) {
        this.getNewPage([1, this.selectArea]);
      }
    },
    toPreviousPage() {
      if (this.currentPage > 1) {
        this.$nextTick().then(() => {
          this.getNewPage([this.currentPage - 1, this.selectArea]);
        });
      }
    },
    toNextPage() {
      if (this.currentPage < this.pageCount) {
        this.$nextTick().then(() => {
          this.getNewPage([this.currentPage + 1, this.selectArea]);
        });
      }
    },
    toLasttPage() {
      if (this.currentPage < this.pageCount) {
        this.$nextTick().then(() => {
          this.getNewPage([this.pageCount, this.selectArea]);
        });
      }
    },
    //关闭跳转翻页窗口
    closeAll() {
      this.showInputPageNumFlag = false;
    },
    //跳转翻页窗口
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
          myToast("加载出错", 2000);
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
      if (this.inputNum && parseInt(this.inputNum) < this.pageCount) {
        this.showInputPageNumFlag = false;
        this.getNewPage([parseInt(this.inputNum), this.selectArea]);
        this.inputNum = null;
        window.scrollTo(0, 0);
      } else if (parseInt(this.inputNum) > this.pageCount) {
        myToast("请输入小于总页数的值", 1500);
      } else {
        myToast("请输入跳转页数", 1500);
      }
    },
    //选择查询
    querySearch() {
      this.getNewPage([1, this.selectArea, this.selectSortId]);
    },
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
};
</script>
<style lang="css" scoped>
.agent-infor-title {
  border-bottom: 1px solid #df3031;
  display: flex;
}
.agent-infor-title-h2 {
  text-align: center;
  padding: 0 2%;
  color: black;
  flex: 1;
}
.agent-infor-title-h2-active {
  color: #df3031;
}
.agent-infor-content {
  text-align: left;
  width: 100%;
}
.agent-infor-sertch {
  display: flex;
  flex-wrap: nowrap;
  padding: 1% 1%;
  border-bottom: 1px solid gray;
  justify-content: space-between;
}
.agent-infor-sertch li:nth-child(1),
.agent-infor-sertch li:nth-child(3) {
  align-self: center;
  font-size: 120%;
}
/* .agent-infor-sertch li{

} */
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
  justify-content: center;
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
  color: rgb(0, 0, 0);
  font-size: 120%;
}
</style>