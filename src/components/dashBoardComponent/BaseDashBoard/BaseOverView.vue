<template>
<div class= "info-project">
    <div class="row">
        <div class="col-md-6">
            <div class="area-text">
                
            </div>
        </div>
        <div class="col-md-6">
            <div class="area-picture">
                <img alt="file not found" class="img-fluid" :src="image" />
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    props: ['text', 'image']
}
</script>
<style>
.info-project {
    background-color: #ECEEE2
}
.area-picture img{
    width: 100%;
}
</style>

