<template>
  <div
    id="cover-full-page"
    @click="coverClick"
  />
</template>
<script>
	export default{
		methods:{
			coverClick(){
				this.$emit("closeAll")
			}
		}
	}
</script>
<style lang="css">
#cover-full-page {
  background-color:rgba(0, 0, 0,0.3);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 997;
  position: fixed;
}
</style>