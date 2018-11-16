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
                        :on-error= "print"
                        :class="'upload'+(i-1).toString()"
                        list-type="picture"
                        :file-list="instances[i-1].fileList"
                        :action="urlPostImg"
                        :on-preview="handlePreview"
                        :on-index="i-1"
                        :on-progress="onProgress">
                        <el-button size="small" type="primary">Click to upload</el-button>
                        <div slot="tip" class="text-info">jpg/png files with a size less than 500kb</div>
                    </el-upload>
                <el-button type="danger" @click="remove(i)" class="float-right mt-2" icon="el-icon-delete" circle></el-button>
                </el-form-item>
            </div>
            <el-form-item>
                <el-button type="success" @click="submitForm" round>Submit</el-button>
                <el-button type="warning" @click="add"  round>Thêm</el-button>
            </el-form-item>
            </el-form>
    </el-dialog>
</template>
<script>
import setting from "../../api/setting.js";
import sha256 from "js-sha256";
import api from "../../api/requestApi.js"

export default {
  props: ['centerDialogVisible', 'projectId'],
  data: function() {
    return {
			urlPostImg: `${setting.baseApiUrl}${setting.urlPostImg}`,
			urlCreateSurvey : `${setting.baseApiUrl}${setting.urlCreateSurvey}`,
      instances: [
        {
          contentSurvey: "",
					imgs: [],
					fileList: []
        }
      ]

      // rules: {
      //     contentSurvey : [
      //         { required: true, message: 'Vui lòng điền hạng muc khảo sát', trigger: 'blur' }
      //     ]
      // }
    };
  },
  methods: {
    submitForm() {
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

			_instances.forEach( record => {
				let _dataToPost = {
						"content": record.contentSurvey,
						"projectId": this.$route.params.id,
						"byWhom": api.getCookie('user_id')
					}
				// post data to survey
				api.postData(this.urlCreateSurvey,_dataToPost).then(
					res=> {
						let _idSurvey = res.id;
						//create container to save image !! container is  a folder on server 
						api.postData(`${setting.baseApiUrl}${setting.urlCreateContainer}`,{name});

					}
				)
			})
		},

    add() {
      this.instances.push({
				contentSurvey: "",
				imgs:[],
				fileList: []
      });
    },

    remove(i) {
      this.instances.splice(i - 1, 1);
    },

    beforeClose() {
      this.$emit("close-dialog");
    },

    print(err) {
      console.log(err);
    },

    handlePreview(file) {
      console.log(file);
    },
		// add name file to img[]
    onProgress: function(event, file, fileList,i) {
      console.log(i)
      console.log(file)
      console.log(fileList)
      // console.log(this.$refs['upload0']._props.fileList)

			let time = new Date();
			//format name of image = sha256 + time. This is for secure, when hacker upload shell via img,he cant call shell with image name before
			let extendTail = file.name.split('.')
			extendTail = '.' + extendTail[extendTail.length-1]
			file.name = sha256(file.name) + time.getTime().toString() + extendTail;
			
			// // get this change belong to what index of this.instances?
			// console.log(this.$refs)
			// let i= this.findChangeOfInstance(this.$refs)
			// console.log(i)
			// this.instances[i].imgs.push(`api/attachments/image/download/${file.name}`)

		},

		// onRemove: function(file, fileList) {
		// 	let _imgname = file.name;
		// 	let i = this.findChangeOfInstance(this.$refs)// get this change belong to what index of this.instances?
		// 	let _lstImg = this.instances[i].imgs
		// 	// find index of name
		// 	let _indexNeedDel= '';
		// 	for ( let _indexNeedDel  in _lstImg) {
		// 		if(_lstImg[_indexNeedDel] === _imgname) {break};
		// 	}
		// 	this.instances[i].imgs.splice(_indexNeedDel, 1)
			
		// },

		// findChangeOfInstance : function (ref) {
		// 	let i= 0;
		// 	for (i in this.instances) {
		// 		if (typeof i === 'undefined') {continue}
		// 		let stt = ref.hasOwnProperty('upload' + i.toString())
		// 		if(stt===true) { break;}
		// 	}
		// 	return i
		// }
  }
};
</script>
