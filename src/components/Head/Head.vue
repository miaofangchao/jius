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
          <select name="Type" class="Top-select" v-show="showSelectFlag" @touchend="touchSelect" @change="focusInput" key="1">
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
      <div class="text" v-scrollClick="closeLogoutFlag">
        <span v-show="testLoginStateFlag" v-tap="{methods:showLogin}" id="LoginTxt"><p>{{loginState}}</p></span>
        <mt-spinner v-show="!testLoginStateFlag" type="fading-circle"></mt-spinner>
        <span v-show="logoutFlag" v-tap="{methods:logout}" id="logoutTxt"><p>退出登录</p></span>
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
import myToast from '@/views/myToast'
import logout from '@/api/logout'
export default {
  data() {
    return {
      inputValue:'',
      sear:sear,
      showLoginFlag:false,
      showRegisterFlag:false,
      showCoverFlag:false,
      showSelectFlag:false,
      touchSeceltFlag:false,//失去焦点，但是点击的是select时，不关闭select
      logoutFlag:false //退出登录按钮
    }
  },
  computed: {
    testLoginStateFlag(){
      let loginFlag = this.$root.$data.sharedStore.state.loginFlag
      if(loginFlag === true || loginFlag === false){
        return true
      }else{
        return false
      }
    },
    loginState(){
      let loginFlag = this.$root.$data.sharedStore.state.loginFlag
      return loginFlag === true ? '管理' : '登录'
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
      //跳转登录窗口或者代理页面
      if(this.loginState == '登录'){
        this.showLoginFlag = true
        this.showCoverFlag = true
        //登录窗口显示时，获取焦点
        setTimeout(()=>{
          this.$refs.login.$refs.loginInput.focus()
        },100)
      }else{
        if(this.$route.path != '/AgentInfor'){
          this.$router.push('/AgentInfor')
        }else{
          this.logoutFlag = !this.logoutFlag
        }
      }
    },
    //退出登录
    logout(){
      logout().then(()=>{
        this.logoutFlag = false
        myToast('退出登录',1500,'icon-duihao')
        // this.$root.$data.sharedStore.logout()
        this.$root.$data.sharedStore.testLoginState()
      },()=>{
        this.logoutFlag = false
        myToast('退出失败',1500)
      }
      )
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
        myToast('请输入搜索关键字',1500)
      }else{
        this.$refs.searchform.submit()
      }
    },
    closeLogoutFlag(){
      this.logoutFlag = false
    }
  },
  directives: {
    divHeight: {
      inserted(el) {
        let appWidth = document.getElementById('app').offsetWidth //窗口宽度 app 的width有最大最小限制，使用body的width会出现值偏大的情况
        let imgWH = 113 / 28; //图片的宽高比
        el.style.height = (appWidth * 0.3) / imgWH + 20 + "px";
      },
    },
    //v-tap有bug，绑定此事件的元素，在点击时，不会取消input的focus，在手机端会一直获取焦点弹出键盘
    blur:{
      componentUpdated(el){
        window.addEventListener('scroll',()=>{
          el.blur()
        })
      }
    },
    //点击 或者 滚动时 隐藏退出登录按钮
    scrollClick:{
      bind:(el,binding)=>{
        window.addEventListener('touchend',(e)=>{
          if(!el.contains(e.target)){
            binding.value()
          }
        })
        window.addEventListener('scroll',()=>{
          binding.value()
        })
      }
    }
  },
  created() {
    //进入页面或者刷新时，先检测cookie状态
    let sharedStore = this.$root.$data.sharedStore
    sharedStore.testLoginState()
  },
};
</script>
<style lang="css" scoped>
/* 过渡有bug */
  /* .list-enter,.list-leave-to{
    opacity: 0;
  }
  .list-enter-active,.list-leave-active{
    position: absolute;
    transition: all 5s;
  }
  .list-move{
    transition: all 5s;
  } */
.Top {
  margin: 0 auto;
  width: 100%;
  max-width: 760px;
  min-width: 310px;
  top: 0;
  position: fixed;
  z-index: 995;
  padding-bottom: 0%;
  background: url('../../assets/beijing-top.jpg') repeat;
  background-size: 100% 100%;
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
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
#logoutTxt{
  top: 150%;
  background-color: #ce0000;
  border: 1px solid white;
  border-radius: 5px;
  width: 200%;
}
</style>