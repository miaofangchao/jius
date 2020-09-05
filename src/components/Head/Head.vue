<template>
  <div v-divHeight>
    <div class="Top transparent">
      <div class="logo9998">
        <a href="/">
          <img src="@/assets/logos.png" class="lazy" />
        </a>
      </div>
      <form action="http://www.jius.net/Search/Search.asp" name="searchform" method="post" accept-charset="gb2312" ref="searchform">
        <transition-group class="search" tag="div" name="list">        
          <select name="Type" class="Top-select list-item" v-show="showSelectFlag" @touchend="touchSelect" @change="focusInput" key="1">
            <option value="Company" selected="selected">企业</option>
            <option value="Product">产品</option>
            <option value="Class">供求</option>
            <option value="Article">展会</option>
            <option value="Article">商情</option>
            <option value="Company">白酒</option>
            <option value="Company">啤酒</option>
          </select>
          <input
            type="text"
            name="Key"
            class="text"
            placeholder="请输入要查询的关键字"
            v-model="inputValue"
            @focus="showSelectFlag=true"
            @blur="toggleSelectFlag"
            v-blur
            ref="input"
            key="2"
          />
          <input type="image" :src="sear" class="buttom" key="3" v-tap="{methods:submitForm}"/>
        </transition-group>
      </form>
      <div class="text" v-tap="{methods:showLogin}">
        <span id="LoginTxt">登录</span>
      </div>
    </div>
    <TransitionScale>
      <Login v-show="showLoginFlag" @closeLogin="closeLogin" @jumpRegister="jumpRegister" ref="login"/>
    </TransitionScale>
    <TransitionScale>
      <Register v-show="showRegisterFlag" @closeRegister="closeRegister" ref="register" />
    </TransitionScale>
    <TransitionFade >
      <CoverFullPage @closeAll="closeAll" v-show="showCoverFlag"/>
    </TransitionFade>
  </div>
</template>
<script>
import sear from '@/assets/sear.png'
import Login from './Login'
import Register from './Register'
import CoverFullPage from '../../views/CoverFullPage'
import TransitionFade from '../../views/TransitionFade'
import TransitionScale from '../../views/TransitionScale'
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      inputValue:'',
      sear:sear,
      showLoginFlag:false,
      showRegisterFlag:false,
      showCoverFlag:false,
      showSelectFlag:false,
      touchSeceltFlag:false//失去焦点，但是点击的是select时，不关闭select
    }
  },
  components:{
    Login,
    Register,
    CoverFullPage,
    TransitionFade,
    TransitionScale
  },
  methods:{
    closeAll(){
      this.showLoginFlag = false
      this.showRegisterFlag = false
      this.showCoverFlag = false
    },
    showLogin(){
      this.showLoginFlag = true
      this.showCoverFlag = true
      //登录窗口显示时，获取焦点
      setTimeout(()=>{
        this.$refs.login.$refs.loginInput.focus()
      },300)
    },
    closeLogin(){
      this.showLoginFlag = false
      this.showCoverFlag = false
      //登录窗口关闭时，失去焦点，否则会有bug
      this.$refs.login.$refs.loginInput.blur()
    },
    jumpRegister(){
      this.showLoginFlag = false
      this.showRegisterFlag = true
      //注册窗口获取焦点
      setTimeout(()=>{
        this.$refs.register.$refs.registerInput.focus()
      },300)
    },
    closeRegister(){
      this.showRegisterFlag = false
      this.showCoverFlag = false
      //关闭注册窗口，失去焦点
      this.$refs.register.$refs.registerInput.blur()
    },
    //input失去焦点，监听select点击状态，如果不是点击的select，隐藏select
    toggleSelectFlag(){
      if(this.touchSeceltFlag){
        this.touchSeceltFlag = false
      }else{
        this.showSelectFlag = false
      }
    },
    //点击select时
    touchSelect(){
      this.touchSeceltFlag = true
    },
    //改变select状态时，input获得焦点
    focusInput(){
      this.$refs.input.focus()
    },
    submitForm(){
      if(this.inputValue == ''){
        let instance = Toast('请输入搜索关键字');
        setTimeout(() => {
            instance.close();
        }, 1500);
      }else{
        this.$refs.searchform.submit()
      }
    }
  },
  directives: {
    divHeight: {
      bind(el) {
        let windowWidth = document.body.offsetWidth; //窗口宽度
        let imgWH = 113 / 28; //图片的宽高比
        el.style.height = (windowWidth * 0.3) / imgWH + 20 + "px";
      },
    },
    //v-tap有bug，绑定此事件的元素，在点击时，不会取消input的focus，在手机端会一直获取焦点弹出键盘
    blur:{
      componentUpdated(el){
        window.addEventListener('scroll',()=>{
          el.blur()
        })
      }
    }
  },
};
</script>
<style lang="css" scoped>
.list-enter-active,.list-leave-active{
    transition: all 0.5s;
    position: absolute;
  }
  .list-enter,.list-leave-to{
    opacity: 0;
  }
  .list-move{
    transition: all 0.5s;
  }
.Top {
  margin: 0 auto;
  width: 100%;
  overflow: hidden;
  max-width: 760px;
  min-width: 310px;
  top: 0;
  position: fixed;
  z-index: 995;
  padding-bottom: 0%;
  background-color: rgb(205, 16, 10);
}
.Top .logo9998 {
  width: 30%;
  float: left;
  font-size: 0;
  padding: 10px 0;
}
.Top .search {
  height: 60%;
  width: 50%;
  background: #fff;
  border-radius: 5px 5px 5px 5px;
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translateY(-50%);
  display: flex;
  overflow: hidden;
}
.Top .search input {
  color: black;
  height: 100%;
  border: 0;
  background: 0;
  position: static;
  font-size: 100%;
  flex: 1;
}
.Top .search .buttom {
  flex: 0;
  height: auto;
  align-self: center;
}
.Top .text {
  color: #fff;
  position: absolute;
  right: 2%;
  height: 100%;
  width: 10%;
}
.Top-select{
  border: none;
  background-color: white;
  border-radius: 5px;
  padding: 2% 0;
  font-size: 100%;
  flex: 0;
}
.Top .text span {
  color: #fff;
  position: absolute;
  top: 50%; 
  transform: translateY(-50%);
  right: 0;
  width: 100%;
  font-size: 120%;
}
</style>