<template>
<div class="col-4">
    <figure class="figure">
        <div class="img"><img :src="urlImg" class="figure-img img-fluid rounded" alt="file not found."></div>
    <figcaption class="figure-caption m-2 px-2">
        <p class="text-left text-info text-truncate"> {{description}} </p>
    </figcaption>
    </figure>
    <!-- <div class="img-card text-center">
        <div class="area-image">
            <img alt="file not found" class="img-fluid rounded" :src="urlImg">
        </div>
        <div class="area-description text-info p-2">
            <p>{{description}}</p>
        </div>

    </div> -->
</div>
</template>
<script>
export default {
    props:['urlImg','description']
}
</script>
<style scope>
.figure img {
    height:200px;
    max-width: 100%;
}
.figure {
    max-width:100%
}

</style>

