<template>
    <div class="survey">
        <h4 class="pl-2 pt-2 font-weight-bold text-secondary">Khảo Sát</h4>
        <el-button class="m-2 float-right" @click="isAddSurvey= true" icon="el-icon-plus" type="primary" circle></el-button>

        <survey-card v-if="surveys" :surveys="surveys">
          
        </survey-card>

        <add-form
         :centerDialogVisible= "isAddSurvey" 
         v-on:close-dialog= " isAddSurvey=false ">
        </add-form>
    </div>
</template>
<script>
import SurveyCard from "./survey/SurveyCard.vue";
import AddForm from "./survey/AddForm.vue";
import api from "./../api/requestApi.js";
import setting from "./../api/setting.js";

export default {
  data: function() {
    return {
      isAddSurvey: false,
      projectId: this.$route.params.id,
      surveys: []
    };
  },
  components: { SurveyCard, AddForm },
  methods: {
    // $modifyData: async function(res) {
      
    //   console.log(res);
    //   res.forEach(record => {
    //     let _idUser = record.byWhom;
    //     let _url = `${setting.baseApiUrl}${setting.urlGetUser}/${_idUser}`;
    //     api.sendRequest(_url).then(res => {

    //       record.name = res.username;
    //     });
    //   });
    //   return res
    // },

    $getSurvey: async function() {
      let rawUrl = setting.urlGetSurveyWithProjectId;
      rawUrl = rawUrl.replace(/<:.*>/g, this.projectId);
      let _url = `${setting.baseApiUrl}${rawUrl}`;

      let res = await api.sendRequest(_url);
      // let dataAfterModify = await this.$modifyData(res);
      // console.log('name:',dataAfterModify[0].name)
      this.surveys = res;
    }
  },
  mounted() {
    this.$getSurvey();
  }
};
</script>