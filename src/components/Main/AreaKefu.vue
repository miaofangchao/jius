<template>
    <div class="kefu">
        <div class="kefu-zhaoshang">
			<img src="@/assets/lianxikefu.jpg">
		</div>
        <ul class="kefu-ul">
            <li class="kefu-li" v-for="item in msgList" :key="item.id">
                ┊{{item.name}}:
                <a :href="item.href">{{item.tel}}</a>
                <span>微信：</span>{{item.weixin}}
            </li>
            <li class="kefu-li">
                服务受理、会员服务、展会合作---认领/撤销/删除、客户意见/投诉
            </li>
            <li class="kefu-li">
                ┊售后服务-技术支持：<span></span><a href="tel:13333840256" style="color:#000000;">13333840256(微信同号)</a>
            </li>
        </ul>
        <div class="erweima">
            <div class="erweima-ico">
				<img src="@/assets/erweima1.gif">
			</div>
            <div class="erweima-text">
				<span>【长按指纹】</span>识别图中二维码<br>
				&nbsp; 或搜索公众号<span>酒商网</span>关注
			</div>
        </div>
        <div class="erweima-big">
			<img src="@/assets/erweima.jpg">
		</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            msgList:[
                {id:1,name:'林经理',href:'tel:13333840256',tel:'13333840256',weixin:'2205820789（qq同号）'},
                {id:2,name:'余经理',href:'tel:13333854622',tel:'13333854622',weixin:'3141849414（qq同号）'},
                {id:3,name:'王经理',href:'tel:18300663944',tel:'18300663944',weixin:'3143547268（qq同号）'},
                {id:4,name:'张经理',href:'tel:15237163955',tel:'15237163955',weixin:'2677200759（qq同号）'},
            ]
        }
    },
}
</script>
<style lang="css" scoped>
    .kefu{
        margin-top: 10px;
    }
    .kefu-zhaoshang{
        font-size: 0;
    }
    .kefu-li{
        border-bottom: 1px solid #f0eff5;
        font-size: 85%;
        text-align: left;
        padding: 2%;
    }
    .kefu-li span{
        margin-left: 15%;
    }
    .erweima{
        display: flex;
        padding: 0 3%;
    }
    .erweima-ico{
        flex: 1;
    }
    .erweima-text{
        flex: 1.5;
        align-self: center;
    }
    .erweima-text span{
        color: #df3031;
    }
</style>