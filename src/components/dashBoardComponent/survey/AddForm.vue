<template>
    <el-dialog
            title="Thêm Khảo Sát"
            :visible.sync="centerDialogVisible"
            :fullscreen="true"
            center
            :before-close="beforeClose"
            >
            <el-form  ref="addForm" class="add-form">
            <div class="input-form border shadow p-3 m-2 rounded">
                <el-form-item prop="contentSurvey" label="Hạng Mục Khảo Sát">
                    <el-input v-model="instance.contentSurvey"></el-input>
                </el-form-item>
                <el-form-item class="border p-4"  v-for="n in instance.imgs.length" :key= "'img' + n.toString()">
                    <el-button type="success" @click="addImg" class="float-right mr-2" icon="el-icon-plus" circle></el-button>
                    <el-button type="danger" @click="remove(n)" class="float-right mr-2" icon="el-icon-delete" circle></el-button>
                      <el-upload
                        ref="upload"
                        class="avatar-uploader"
                        :show-file-list="false"
                        :action="`${urlPostImg}?indexImg=${n-1}`"
                        :on-success= "onSuccess"
                        :on-remove= "onRemove">
                        <img v-if="instance.imgs[n-1].url" :src="instance.imgs[n-1].url" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
               
                      <el-input v-model= "instance.imgs[n-1].comment"></el-input>
        
       
                </el-form-item>
            </div>
            <el-form-item>
                <el-button class= "mr-3 float-right" icon="el-icon-upload" type="success" @click="createSurvey" round>Submit</el-button>
            </el-form-item>
            </el-form>
    </el-dialog>
</template>
<script>
import setting from "../../api/setting.js";
import api from "../../api/requestApi.js";

export default {
  props: ["centerDialogVisible"],
  data: function() {
    return {
      urlPostImg: `${setting.baseApiUrl}${setting.urlPostSurveyImg}`,
      urlRemoveImg: `${setting.baseApiUrl}${setting.urlDelSurveyImg}`,
      urlCreateSurvey: `${setting.baseApiUrl}${setting.urlCreateSurvey}`,
      instance: {
        contentSurvey: "",
        imgs: [
          {
            url: "",
            name: "",
            comment: ""
          }
        ]
      }
    };
  },
  methods: {

    warningNotify: function() {
      this.$notify.error({
        title: "Error",
        message: "Vui lòng điền đầy đủ thông tin"
      });
    },

    createSurvey() {
      let _instance = this.instance;
      //check value is invalid?
      if (_instance.contentSurvey === "") {
        this.warningNotify();
        return;
      }
      let _imgs = _instance.imgs;
      let check = _imgs.filter(
        record => record.url === "" || record.comment === ""
      );
      if (check.length > 0) {
        this.warningNotify();
        return;
      }

      let _dataToPost = {
        content: this.instance.contentSurvey,
        projectId: this.$route.params.id,
        byWhom: api.getCookie("user_id"),
        image: this.instance.imgs
      };
      // post data to survey
      api.postData(this.urlCreateSurvey, _dataToPost).then(res => {
        let _idSurvey = res.id;
        console.log(res);
      });
    },

    remove(n) {
      //delete correspond img on server
      let fileName = this.instance.imgs[n - 1].url;
      let _url = `${this.urlRemoveImg}/${fileName}`;
      api.sendDelete(_url);
      this.instance.imgs.splice(n - 1, 1);
    },

    beforeClose() {
      this.$emit("close-dialog");
    },

    addImg() {
      this.instance.imgs.push({
        url: "",
        comment: ""
      });
    },

    onSuccess: function(res, file) {
      //get name of file, then get index abc_0.jpg ==> 0
      let fileName = res.result.files.file[0].name;
      let afterSplit = fileName.split("_");
      afterSplit = afterSplit[afterSplit.length - 1];
      let index = afterSplit.split(".")[0];
      index = parseInt(index);
      //update imgs of instance
      this.instance.imgs[index].url = URL.createObjectURL(file.raw);
      this.instance.imgs[index].name = fileName;
      //set file name to show on browser
      file.name = fileName;
    },

    onRemove: function(file) {
      let _url = `${this.urlRemoveImg}/${file.name}`;
      api.sendDelete(_url);
      // update instance
      let afterSplit = file.name.split("_");
      afterSplit = afterSplit[afterSplit.length - 1];
      let index = afterSplit.split(".")[0];
      index = parseInt(index);

      this.instance.imgs.splice(index, 1);
    }
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

