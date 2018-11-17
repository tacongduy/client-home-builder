<template>
<div>
<div class="survey-card border shadow rounded m-5 p-2" v-for="survey in surveys" :key="survey.content">
<div class="row" >
    <div class="col-md-9">
    <!-- <div class="header"> -->
        <div class="header-text">
            <p><span class="fa fa-user-circle text-primary mr-2 "></span>
                <span class="text-primary font-weight-bold mr-1">{{survey.name}}</span> 
                    đã khảo sát phần 
                        <span  class="text-primary ml-1">{{survey.content}}</span> </p>
        </div>
    </div>
    <div class="col-md-3">
        <div class="header-time text-right font-italic text-muted pr-1">{{survey.createdTime}}</div>
    </div>
</div>
<div class="row my-2 p-3">
        <image-card 
        v-for="i in survey.image" 
        :key=" 'img' + i.name " 
        :urlImg="`${urlGetSurveyImg}/${i.name}`" 
        :description="i.comment"></image-card>
</div>    
</div>
</div>
</template>
<script>
import ImageCard from "./ImageCard.vue";
import setting from "../../api/setting";
import api from "../../api/requestApi.js";

export default {
  props: {
    surveys: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data: function() {
    return {
      urlGetSurveyImg: `${setting.baseApiUrl}${setting.urlGetSurveyImg}`
    };
  },

  method: {
    $modifyData: function() {
      this.surveys.forEach(record => {
        let _idUser = record.byWhom;
        let _url = `${setting.baseApiUrl}${setting.urlGetUser}/${_idUser}`;
        api.sendRequest(_url).then(res => {
          record["name"] = res.username;
        });
      });
    }
  },
  computed: {

  },
  components: { ImageCard }

};
</script>
<style>
</style>
