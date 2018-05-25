<template>
  <div id="app">
    <!-- <Button @click="login">请求</Button> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      value: false
    };
  },
  methods: {
    login () {
      this.$axios.get('/api/admin').then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
