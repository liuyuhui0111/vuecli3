<template>
  <div id="app">
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>


export default {
    name: 'app',
    watch: {
        isShowLoading() {
            if (this.isShowLoading) {
                this.$loading();
            } else {
                this.$loading().close();
            }
        },
    },
    mounted() {
        console.log(this.$route.meta.keepAlive);
    },

};
</script>

<style>
#app {

}
</style>
