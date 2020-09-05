<template>
  <transition name="cover" mode="out-in">
    <slot />
  </transition>
</template>

<style scoped>
	.cover-enter,.cover-leave-to{
		opacity: 0;
	}
	.cover-leave-to,.cover-leave{
		position:absolute
	}
	.cover-enter-to,.cover-leave{
		opacity: 1;
	}
	.cover-leave-active,.cover-enter-active{
		transition: all 0.3s;
		position:absolute
	}
</style>