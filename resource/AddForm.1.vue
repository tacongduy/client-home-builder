<template>
    <el-dialog
            title="Thêm Khảo Sát"
            :visible.sync="centerDialogVisible"
            :fullscreen="true"
            center
            :before-close="beforeClose"
            >
            <el-form  ref="addForm" class="add-form">
            <div class="input-form border shadow p-3 m-2 rounded" v-for ="i in instances.length" :key="i-1">
                <el-form-item prop="contentSurvey" label="Hạng Mục Khảo Sát">
                    <el-input v-model="instances[i-1].contentSurvey"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-upload
                        :ref="'upload'+ (i-1).toString()"
                        :on-error= "onError"
                        :class="'upload'+(i-1).toString()"
                        list-type="picture"
                        :file-list="instances[i-1].fileList"
                        :action="`${urlPostImg}?index=${i-1}`"
                        :on-success= "onSuccess"
                        :on-remove= "onRemove">
                        <el-button size="small" type="primary">Click to upload</el-button>
                        <div slot="tip" class="text-info">jpg/png files with a size less than 500kb</div>
                    </el-upload>
                <el-button type="danger" @click="remove(i)" class="float-right mt-2" icon="el-icon-delete" circle></el-button>
                </el-form-item>
            </div>
            <el-form-item>
                <el-button type="success" @click="createSurvey" round>Submit</el-button>
                <el-button type="warning" @click="add"  round>Thêm</el-button>
            </el-form-item>
            </el-form>
    </el-dialog>
</template>
<script>
import setting from "../../api/setting.js";
import api from "../../api/requestApi.js";

export default {
  props: ["centerDialogVisible", "projectId"],
  data: function() {
    return {
      urlPostImg: `${setting.baseApiUrl}${setting.urlPostSurveyImg}`,
      urlRemoveImg: `${setting.baseApiUrl}${setting.urlDelSurveyImg}`,
      urlCreateSurvey: `${setting.baseApiUrl}${setting.urlCreateSurvey}`,
      instances: [
        {
          contentSurvey: "",
          imgs: [],
          fileList: []
        }
      ]

      // rules: {
      //   contentSurvey: [
      //     {
      //       required: true,
      //       message: "Vui lòng điền hạng muc khảo sát",
      //       trigger: "blur"
      //     }
      //   ]
      // }
    };
  },
  methods: {
    createSurvey() {
      let _instances = this.instances;
      //check value is invalid?
      let check = _instances.filter(record => record.contentSurvey == "");
      if (check.length > 0) {
        this.$notify.error({
          title: "Error",
          message: "Vui lòng điền đầy đủ thông tin"
        });
        return;
      }

      _instances.forEach(record => {
        let _dataToPost = {
          content: record.contentSurvey,
          projectId: this.$route.params.id,
          byWhom: api.getCookie("user_id"),
          image: record.imgs
        };
        // post data to survey
        api.postData(this.urlCreateSurvey, _dataToPost).then(res => {
          let _idSurvey = res.id;
          console.log(res);
        });
      });
    },

    add() {
      this.instances.push({
        contentSurvey: "",
        imgs: [],
        fileList: []
      });
    },

    remove(i) {
      this.instances.splice(i - 1, 1);
    },

    beforeClose() {
      this.$emit("close-dialog");
    },

    onError(err) {
      this.uploadError = true;
      console.log(err)
    },

    onSuccess: function(res, file, fileList) {
      //get name of file, then get index abc_0.jpg ==> 0
      let fileName= res.result.files.file[0].name;
      let afterSplit = fileName.split('_');
      afterSplit = afterSplit[afterSplit.length-1];
      let index = afterSplit.split('.')[0];

      //update imgs of instances
      this.instances[parseInt(index)].imgs.push(fileName)

      //set file name to show on browser
      file.name = fileName
    },

    onRemove: function(file, fileList) {
      let _url = `${this.urlRemoveImg}/${file.name}`;
      api.sendDelete(_url);
      // update instance
      let afterSplit = file.name.split('_');
      afterSplit = afterSplit[afterSplit.length-1];
      let index = afterSplit.split('.')[0];
      index = parseInt(index);
      //update imgs of instances
      let _instance = this.instances[index].imgs;
      let _indexOfEl = _instance.indexOf(file.name);
      this.instances[index].imgs.splice(_indexOfEl, 1);

    }
  }
};
</script>
