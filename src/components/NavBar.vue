<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Home Builder</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse ml-3" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item ml-2 active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item ml-2">
        <a class="nav-link" href="#">Khám phá</a>
      </li>
      <li class="nav-item ml-2">
        <a class="nav-link disabled" href="#">Thiết kế</a>
      </li>
      <li class="nav-item ml-2">
        <a class="nav-link" href="#">Nhà của tôi</a>
      </li>
    </ul>
    <a class="mr-2" href="#"><span class="navbar-text"><i class="el-icon-goods"></i>Thư Viện</span></a>
    <!-- <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form> -->
  </div>
</nav>
</template>

<script>
  export default {

  }
</script>

<style>
.navbar-text { color: white !important}
</style>
