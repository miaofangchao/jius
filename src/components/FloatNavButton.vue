<template>
  <div class="float-nav-button" ref="floatNabButton">
    <div v-divHeight style="overflow:hidden;height:auto" v-show="showDiv" >
    <transition @before-enter="beforeEnter" @enter="enter" @leave="leave" >
    <div class="float-nav-button-nav" v-show="showButtonNavFlag">
            <ul class="float-nav-button-nav-ul">
                <li>
                <span v-tap="{methods:toggleWebNavState}">网站导航</span>
                </li>
                <li>
                <a href="http://www.jius.net">电脑版</a>
                </li>
                <li>
                <a href="javascript:scroll(0,0);">返回顶部</a>
                </li>
            </ul>
        <span class="triangle"></span>
    </div>
    </transition>
    </div>
    <div class="float-nav-button-img" v-tap="{methods:toggleNavState}">
      <img src="@/assets/aclickIcon.png" />
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            showButtonNavFlag:true,//是否显示漂浮菜单的menu，先设为可见元素，mounted之后再隐藏，否则初始加载，无法获取外层遮盖元素的高度。
            showDiv:false //遮盖层的显示状态，根据showButtonNavFlag该变而改变
        }
    },
    props:{
        showFloatNavButtonFlag:Boolean, //是否显示漂浮菜单
        showFloatNavButtonMenuFlag:Boolean,//是否显示漂浮菜单的menu，只用于通知组件关闭menu，为true时对menu的显示无影响。
        showWebNavFlag:Boolean //是否显示网站导航webNav
    },
    watch:{
        //监听父元素是否显示漂浮菜单的状态，false全部关闭
        showFloatNavButtonFlag(){
            if(this.showFloatNavButtonFlag == false){
                this.showButtonNavFlag = this.showDiv = false
            }
        },
        //监听父元素是否显示漂浮菜单menu的状态，false关闭menu
        showFloatNavButtonMenuFlag(){
            if(this.showFloatNavButtonMenuFlag == false) {
                this.showButtonNavFlag = false
                setTimeout(()=>{
                    this.showDiv = this.showButtonNavFlag
                },500)
            }
        },
        //当子元素显示menu时，触发事件，同步更改父元素的对应flag状态
        showButtonNavFlag(){
            if(this.showButtonNavFlag == true){
                this.$emit('toggleFloatNavButtonMenuFlag')
            }
        }
    },
    methods:{
        //切换webNav页面状态,点击时就显示，这个页面的关闭点击下方空白地方
        toggleWebNavState(){
            this.$emit('toggleWebNavFlag')
        },
        //切换子menu显示状态
        toggleNavState(){
            this.showButtonNavFlag = !this.showButtonNavFlag
            if(this.showButtonNavFlag == false){
                //动画结束后 隐藏遮盖元素
                setTimeout(()=>{
                    this.showDiv = this.showButtonNavFlag
                },500)
            }else{
                this.showDiv = this.showButtonNavFlag
            }
        },
        beforeEnter(el){
            el.style.transition='all 0.5s'
            el.style.transform='translateY(100%)'
        },
        enter(el,done){
            el.offsetWidth
            el.style.transform='translateY(0)'
            done
        },
        leave(el,done){
            el.style.transform='translateY(120%)'
            done
        }
    },
    directives:{
        divHeight:{
            componentUpdated(el){
                //auto的作用是初始化高度，否则会一直+7越来越高。+7是加上absolute元素的高
                el.style.height = 'auto'
                el.style.height = Number(window.getComputedStyle(el).height.replace('px','')) + 7 + 'px'        
            }
        }
    },
    mounted(){
        this.showButtonNavFlag = false
    }
}
</script>
<style lang="css" scoped>
    .float-nav-button{
        position: fixed;
        right: 5%;
        bottom: 5%;
        background-color: transparent !important;
        width: 18%;
    }
    .float-nav-button-img img{
        width: 60%;
        text-align: center;
    }
    .float-nav-button-nav{
        position: relative;
    }
    .float-nav-button-nav-ul{
        color: white;
    }
    .float-nav-button-nav li{
        background: #333;
    }
    .float-nav-button-nav li{
        border-bottom: 1px solid #737373;
        padding: 12% 2%;
    }
    .float-nav-button-nav li,.float-nav-button-nav li a{
        color: white;
    }
    .triangle{
        display: inline-block;
        border-top: 7px solid #333;
        border-bottom: 0 none;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        position: absolute;
        transform: translateX(-50%);
        left: 50%;
    }
</style>