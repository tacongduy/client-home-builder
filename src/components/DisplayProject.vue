<template>
 <div class="col-md-4">
            <el-card class="project" shadow= "hover">
                <img class="img-fluid rounded" v-bind:src="lnkImg" v-on:click="emitSelectionEvent"/>
            <div style="padding: 14px;">
                <span>{{name}}</span>
            </div>
            </el-card>
        </div>
</template>
<script>

export default {
    props: ['id','name','lnkImg'],
    methods : {
        emitSelectionEvent: function() {
            let _id = this.id;
            this.$emit('select-project-step1');
            this.$router.push({name:'projects',params:{id:_id}})
        }
    }
}
</script>
<style>
.project {
    height: 300px;
    max-height:300px;
}

</style>