<template>
  <div class="redianrenwen">
    <div class="redianxinwen-z">
      <img src="@/assets/redianxinwen-z.jpg" />
    </div>
    <div class="redianxinwen-r">
      <TransitionFade>
        <a :href="newsList[n].href" v-show="showFlag">{{newsList[n].title}}</a>
      </TransitionFade>
    </div>
  </div>
</template>
<script>
import TransitionFade from '../../views/TransitionFade'
export default {
    data() {
        return {
            newsList:[
                    { id: 1, href: 'http://www.jius.net/Article_45327_1/', title: '葡萄酒代理商该如何选择产品' },
                    { id: 2, href: 'http://www.jius.net/Article_45303_1/', title: '烟台欧亚庄园酒业期待您的加入' },
                    { id: 3, href: 'http://www.jius.net/Article_45301_1/', title: '白酒代理如何在淡季有所作为' },
                    { id: 4, href: 'http://www.jius.net/Article_45326_1/', title: '贵州沃樽酒业诚邀优秀代理商加入' },
                    { id: 5, href: 'http://www.jius.net/Article_45325_1/', title: '东旺大茶缸人参酒欢迎您前来品尝' },
                    { id: 6, href: 'http://www.jius.net/Article_45324_1/', title: '千喜年酒业深受消费者青睐' }
            ],
            n:0,
            showFlag:true
        }
    },
    components:{
      TransitionFade
    },
    mounted(){
      setInterval(()=>{
        if(this.n == this.newsList.length - 1){
          this.showFlag = false
          setTimeout(() => {
            this.n = 0
            this.showFlag = true
          },500);
        }else{
          this.showFlag = false
          setTimeout(() => {
            this.n = this.n + 1
            this.showFlag = true
          },500);
        }
      },4000)
    }
}
</script>
<style lang="css" scoped>
.redianrenwen {
    display: flex;
    margin-top: 10px;
}
.redianxinwen-z {
  flex: 1;
  font-size: 0;
}
.redianxinwen-r {
  flex: 2;
  display: flex;
  justify-content: center;
}
.redianxinwen-r a{
  align-self: center;
  color: #f41515;
  font-size: 110%;
}
</style>