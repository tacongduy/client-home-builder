<template>
<div class="container-fluid" style="height:100%">
    <div class="row" style="height:100%">
        <div class="col-md-3">
            <div class=" dash-board border-right shadow-sm rounded text-left">
                <div class="nav-menu rounded"> 

                    <el-menu default-active="1" class="el-menu-vertical-demo">
                        <el-menu-item index="1" @click="clickEvent('over-view')">
                            <i class="el-icon-menu"></i>
                            <span slot="title" class="text-monospace">TỔNG QUAN</span>
                        </el-menu-item>
                        <el-menu-item index="2" @click="clickEvent('survey')">
                            <i class="el-icon-document"></i>
                            <span slot="title" class="text-monospace">KHẢO SÁT</span>
                        </el-menu-item>
                        <el-menu-item index="3" @click="clickEvent('design')">
                            <i class="el-icon-edit"></i>
                            <span slot="title" class="text-monospace">THIẾT KẾ</span>
                        </el-menu-item>
                         <el-menu-item index="4" @click="clickEvent('quotation')">
                            <i class="el-icon-mobile-phone" ></i>
                            <span slot="title" class="text-monospace">BÁO GIÁ</span>
                        </el-menu-item>
                        <el-menu-item index="5" @click="clickEvent('contract')">
                            <i class="el-icon-tickets"></i>
                            <span slot="title" class="text-monospace">HỢP ĐỒNG</span>
                        </el-menu-item>
                        <el-menu-item index="6" @click="clickEvent('construction')">
                            <i class="el-icon-view"></i>
                            <span slot="title" class="text-monospace">XÂY DỰNG</span>
                        </el-menu-item>
                        <el-menu-item index="7" @click="clickEvent('install')">
                            <i class="el-icon-setting"></i>
                            <span slot="title" class="text-monospace">LẮP ĐẶT</span>
                        </el-menu-item>
                        <el-menu-item index="8" @click="clickEvent('maintaince')">
                            <i class="el-icon-phone-outline"></i>
                        <span slot="title" class="text-monospace">BẢO TRÌ</span>
                        </el-menu-item>
                    </el-menu>
                <!-- <div @click="clickEvent('over-view')"><a><span>Tổng Quan</span></a></div>
                <div @click="clickEvent('survey')"><span>Khảo Sát</span></div>
                <div @click="clickEvent('design')"><span>Thiết Kế</span></div>
                <div @click="clickEvent('quotation')"><span>Báo Giá 14 %</span></div>
                <div @click="clickEvent('contract')"><span>Hợp Đồng</span></div>
                <div @click="clickEvent('construction')"><span>Xây Dựng</span></div>
                <div @click="clickEvent('install')"><span>Lắp Đặt</span></div>
                <div @click="clickEvent('maintaince')"><span>Bảo Trì</span></div> -->
                
            </div>
            </div>
        </div>
        <div class="col-md-7">
            <div class="db-content">
            <OverView :text= "text" :image= "image"></OverView>
            <router-view></router-view>
            </div>
        </div>
        <div class="col-md-2">

        </div>
    </div>
</div>
</template>
<script>
import OverView from './dashBoardComponent/BaseDashBoard/BaseOverView.vue';
import setting from './api/setting.js'

export default {
    data: function() {
        return {
            // dataParam: this.router.get
            image :  `${setting.baseApiUrl}/api/attachments/image/download/image%204.png`,
            text: "panel text",
            projectId: ''
        }
    },
    methods: {
        clickEvent: function(param) {this.$router.push({name:param})}
    },
    mounted() {
        this.projectId = this.$route.params.id || '';
        
        
    },
    components: {OverView},
}
</script>
<style>

.dash-board {
    background-color: #ffffff;
    height:100%
}

.nav-menu {
    font-size: 15px;
    font-family: Averta-Semibold
}

.nav-menu .el-menu {
    border-right: none;
}

.db-content {
    background-color: #ffffff !important;
    height:100%
}
</style>