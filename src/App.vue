<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';


export default  {
  data: function(){
    return {
    }
  },
  methods: {
  },
  components: {NavBar},
  name: 'app',
  mounted(){
  }
}
</script>

<style>
#app {
  height:100%
}
</style>
