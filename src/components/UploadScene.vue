<template>
  <div class="container">
    <div class="upload-scene-wrapper">
      <i class="el-icon-plus"></i>
      <span class="text">添加场景</span>
      <input class="file" type="file" accept="image/*" @change="fileChange" />
    </div>
  </div>
</template>
<script>
export default {
  setup() {
    const fileChange = e => {
      console.log(e)
    }
    return {
      fileChange,
    }
  },
}
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  float: left;
  // background-color: red;
  display: flex;
  align-items: center;
  margin-left: 20px;
  color: rgb(170, 170, 170);
}
.upload-scene-wrapper {
  width: 70px;
  height: 70px;
  border-radius: 3px;
  border: 1px dotted rgb(119, 119, 119);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  i {
    font-size: 26px;
  }
  .text {
    margin-top: 10px;
    font-size: 12px;
  }

  .file {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
</style>
