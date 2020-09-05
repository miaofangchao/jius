<template>
    <div class="main">
        <TopSwipe/>
        <TopNav/>
        <HotNews/>
        <AreaHuobao/>
        <AreaJinbao/>
        <AreaTangjiuhui/>
        <AreaZhizun/>
        <AreaTuijian/>
        <AreaHuangjin/>
        <AreaKefu/>
        <Footer/>
    </div>
</template>
<script>
import TopSwipe from './TopSwipe'
import TopNav from './TopNav'
import HotNews from './HotNews'
import AreaHuobao from './AreaHuobao'
import AreaJinbao from './AreaJinbao'
import AreaTangjiuhui from './AreaTangjiuhui'
import AreaZhizun from './AreaZhizun'
import AreaTuijian from './AreaTuijian'
import AreaHuangjin from './AreaHuangjin'
import AreaKefu from './AreaKefu'
import Footer from '../Footer'
export default {
    data() {
        return {
        }
    },
    components:{
        TopSwipe,
        TopNav,
        HotNews,
        AreaHuobao,
        AreaJinbao,
        AreaTangjiuhui,
        AreaZhizun,
        AreaTuijian,
        AreaHuangjin,
        AreaKefu,
        Footer
    },
    methods:{
    },
}
</script>
<style lang="css" scoped>
    .main{
        background: #f6f6f6;
    }
    .main>div{
        background: white;
    }
</style>