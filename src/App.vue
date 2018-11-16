<template>
  <div id="app">
    <NavBar></NavBar>
    <Login v-if="visibleLogin" v-on:login-sucess="$loginSucess"></Login>
    <router-view></router-view>
  </div>
</template>

<script>
import ShowProject from './components/ShowProjects.vue';
import NavBar from './components/NavBar.vue';
import Login from './components/Login.vue';
import setting from './components/api/setting.js';

import api from './components/api/requestApi.js';


export default  {
  data: function(){
    return {
      visibleLogin: false,
      showProject: false,
      projects: [
      ]
    }
  },
  methods: {
    $loginSucess: function(info) { // can delete in the future
      let _userId = info.userId
      let _token = info.id
      this.userId = _userId
      this.userToken = _token
    },

    $check_login: async function() {
      let _userId = api.getCookie('user_id');
      let _url = `${setting.baseApiUrl}/api/staffs/${_userId}`;
      await api.sendRequest(_url)
        .then(res => {
          if(!res.status === 200 && res.statusText === "OK") {
            this.visibleLogin = true
          }
        })
    },

  },
  components: {NavBar,Login, ShowProject},
  name: 'app',
  mounted(){
    this.$check_login();
  }
}
</script>

<style>
#app {
  height:100%
}
</style>
