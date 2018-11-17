<template>
    <el-dialog
        title="Login"
        :visible.sync="dialogVisible"
        width="30%"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form> 
            <el-form-item label="Email">
                <el-input v-model="user.email" placeholder="email"></el-input>
            </el-form-item>
            <el-form-item label="Password">
                <el-input v-model="user.password" placeholder="password"></el-input>
            </el-form-item>
            <el-form-item class="text-right" >
                  <el-button @click="onSubmit" type="success" icon= "el-icon-upload">Login</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
import api from './api/requestApi.js'
import setting from './api/setting.js'

export default {
    data: function() {
        return {
            dialogVisible: true,
            user: {
                    email:'',
                    password: ''
                }
        }
    },
    methods:{
        onSubmit: function() {
            let _user = this.user
            // check email and password
            if (_user.email == '' || _user.password == '') {
                this.$notify.error({
                title: 'Error',
                message: 'Vui  lòng Điền Đầy Đủ Thông Tin'
                });
                return;
            }

            
            api.postData(`${setting.baseApiUrl}/api/staffs/login`, {email: _user.email, password: _user.password})
                .then(data => {
                    let _id = data.id;
                    let _userId = data.userId;
                    let ckStt=  _id && _userId ? true : false;
                    //check request whether is sucess?
                    if( ckStt === false){
                        this.$notify.error({
                            title: 'Error',
                            message: 'Email or Password is incorrect'
                            });
                        return;
                    }
                    
                    // request is sucess, so emit login-sucess event
                    this.$router.replace(this.$route.query.from);
                    // this.$emit('login-sucess',{id: _id, userId: _userId});
                    // this.dialogVisible = false;
                }) // JSON-string from `response.json()` call
                .catch(error => {
                    console.error(error);
                    this.$notify.error({
                        title: 'Error',
                        message: 'Email or Password is incorrect'
                        });
                    });

        },
        
    }
}
</script>
