<template>
  <transition mode="out-in" @beforeEnter='beforeEnter' @enter='enter' @leave='leave' @beforeLeave="beforeLeave">
    <slot />
  </transition>
</template>
<script>
export default {
	props:{
		//有的定位需要fixed  有的需要absolute
		position:String,
	},
	methods:{
		beforeEnter(el){
			el.style.transform = 'scaleX(0) scaleY(0)'
			el.style.transition='all 0.5s'
			el.style.position = this.position
		},
		enter(el,done){
			el.offsetHeight
			el.style.transform = 'scaleX(1) scaleY(1)'
			done
		},
		beforeLeave(el){
			el.style.position = this.position
			el.style.transition='all 0.5s'
			el.style.transform = 'scaleX(1) scaleY(1)'
		},
		leave(el,done){
			el.offsetHeight
			el.style.transform = 'scaleX(0) scaleY(0)'
			done
		}
	}
}
</script>
<style scoped>
	/* .nav-enter,
	.nav-leave-to {
		transform: scale(0, 0);
	}
	
	.nav-enter-to,
	.nav-leave {
		transform: scale(1, 1);
	}
	
	.nav-enter-active,
	.nav-leave-active {
		transition: all 10s;
		position: absolute;
	} */
</style>