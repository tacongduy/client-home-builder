<template>
<div class="container">
    <div class="row" style="margin-top:50px" v-if="projects">

            <DisplayProject 
            v-for="i in projects" 
            :key= "i.name" 
            :id="i.id" 
            :name="i.name" 
            :lnkImg="i.imageDisplay"
            v-on:select-project-step1 = "$selectedProjectStep2"></DisplayProject>
    </div>
</div>
</template>
<script>
import DisplayProject from './DisplayProject.vue';
import setting from './api/setting.js';

import api from './api/requestApi.js';

export default {
    data: function() {
        return {
            projects:[]
        }
    },
    components: {DisplayProject},
    methods: {
        $selectedProjectStep2: function() {
            this.$emit('selected-project')
        },

        $getProjects: function(){
        let _url = `${setting.baseApiUrl}${setting.urlgetProject}`
        api.sendRequest(_url)
            .then( res=> {
            console.log(res);
            this.projects = res;
            // turn on component showproject
            })
        }
    },
    mounted() {
        this.$getProjects();
    }
}

</script>
<style>
</style>