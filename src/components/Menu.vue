<template>
<div class="dash-board">
<h3>Dashboard</h3>
<router-link :to="$route.push({name:'over-view'})"><span>Tổng Quan</span></router-link>
<router-link to='/survey'><span>Khảo Sát</span></router-link>
<router-link to="/design"><span>Thiết Kế</span></router-link>
<router-link to="/quotation"><span>Báo Giá 14 %</span></router-link>
<router-link to="/contract"><span>Hợp Đồng</span></router-link>
<router-link to="/construction"><span>Xây Dựng</span></router-link>
<router-link to="/install"><span>Lắp Đặt</span></router-link>
<router-link to="/maintenance"><span>Bảo Trì</span></router-link>
</div>
</template>
<script>
export default {
    data: function() {
        return {

        }
    }
}
</script>
<style>
</style>