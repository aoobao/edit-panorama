<template>
  <div class="footer">
    <SplitLine option="top" />
    <div class="contents">
      <UploadScene />
    </div>
  </div>
</template>
<script lang="ts">
import SplitLine from '@/components/SplitLine/SplitLine'
import UploadScene from '@/components/UploadScene.vue'
export default {
  components: { SplitLine, UploadScene },
  setup() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 120px;

  display: flex;
  flex-direction: column;

  .contents {
    width: 100%;
    height: 1px;
    flex-grow: 1;
  }
}
</style>
