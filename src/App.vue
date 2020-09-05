<template>
  <div id="app">
    <Head />
    <TransitionFade mode="out-in">
      <keep-alive :max="10">
        <router-view></router-view>
      </keep-alive>
    </TransitionFade>
    <transition name="float-nav-button">
      <FloatNavButton
        v-show="showFloatNavButtonFlag"
        :showFloatNavButtonFlag="showFloatNavButtonFlag"
        :showFloatNavButtonMenuFlag="showFloatNavButtonMenuFlag"
        :showWebNavFlag="showWebNavFlag"
        @toggleFloatNavButtonMenuFlag="toggleFloatNavButtonMenuFlag"
        @toggleWebNavFlag="toggleWebNavFlag"
        ref="floatNavButton"
      />
    </transition>
    <TransitionScale>
      <WebNav v-show="showWebNavFlag" @closeWebNav="closeAll"/>
    </TransitionScale>
    <TransitionFade>
      <CoverFullPage v-show="showCoverFlag" @closeAll="closeAll" />
    </TransitionFade>
  </div>
</template>
<script>
import Head from "./components/Head";
import FloatNavButton from './components/FloatNavButton';
import WebNav from './components/WebNav'
import CoverFullPage from "./views/CoverFullPage";
import TransitionFade from "./views/TransitionFade";
import TransitionScale from './views/TransitionScale'
export default {
  data() {
    return {
      showCoverFlag: false,
      showFloatNavButtonFlag: false,
      showFloatNavButtonMenuFlag: false,
      showWebNavFlag:false
    };
  },
  components: {
    Head,
    FloatNavButton,
    WebNav,
    TransitionFade,
    CoverFullPage,
    TransitionScale
  },
  methods: {
    toggleFloatNavButtonMenuFlag() {
      this.showFloatNavButtonMenuFlag = true;
    },
    toggleWebNavFlag(){
      this.showWebNavFlag = this.showCoverFlag = true
    },
    closeAll() {
      this.showWebNavFlag = this.showCoverFlag = false;
    },
  },
  mounted() {
    //window.scrollY / document.body.offsetHeight 计算出页面导航栏底部的高度站总页面 0.9左右
    let h = document.body.offsetHeight * 0.09;
    window.addEventListener('scroll', () => {
        if (window.scrollY > h) {
          this.showFloatNavButtonFlag = true; //滚动时，关闭浮动菜单的menu
          if (this.showFloatNavButtonMenuFlag == true)
            this.showFloatNavButtonMenuFlag = false;
        } else {
          this.showFloatNavButtonFlag = false;
        }
      }
    )
    //点击其他地方时，关闭浮动菜单的menu
    document.onclick = (e) => {
      if (this.$refs.floatNavButton.$el.contains(e.target) != true) {
        this.showFloatNavButtonMenuFlag = false;
      }
    };
  },
};
</script>
<style>
body {
  font-family: Microsoft YaHei, Arial, Helvetica, sans-serif;
  text-align: center;
  margin: 0 auto;
  color: #000;
  background: #f6f6f6;
  max-width: 760px;
  min-width: 320px;
}
@media (min-width: 320px) {
  body {
    font-size: 12px;
  }
}
@media (min-width: 340px) {
  body {
    font-size: 13px;
  }
}
@media (min-width: 360px) {
  body {
    font-size: 14px;
  }
}
@media (min-width: 400px) {
  body {
    font-size: 15px;
  }
}
@media (min-width: 720px) {
  body {
    font-size: 28px;
  }
}
a {
  color: #1c1c1c;
  text-decoration: none;
}
ul,
ol,
li {
  list-style: none;
}
img {
  width: 100%;
}
p {
  margin: 0px;
}
/*整个是全局的css，优先级低于scoped，需要加权重，否则冲突时不会过渡 */
.float-nav-button-enter,
.float-nav-button-leave-to {
  right: -10% !important;
  bottom: -10% !important;
}
.float-nav-button-enter-to,
.float-nav-button-leave {
  right: 5% !important;
  bottom: 5% !important;
}
.float-nav-button-enter-active,
.float-nav-button-leave-active {
  transition: all 0.5s;
}
</style>
