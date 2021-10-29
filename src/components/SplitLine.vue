<template>
  <div :class="className"></div>
</template>
<script lang="ts">
import { PropType } from 'vue'
type Horizontal = 'top' | 'bottom' | 'left' | 'right'
export default {
  props: {
    option: {
      type: String as PropType<Horizontal>,
      default: 'top',
      required: true,
    },
  },
  computed: {
    className() {
      const self = this as any
      const option = self.option
      switch (option) {
        case 'top':
          return 'line-top'
        case 'bottom':
          return 'line-bottom'
        case 'left':
          return 'line-left'
        case 'right':
          return 'line-right'
        default:
          return ''
      }
    },
  },
}
</script>
<style lang="scss" scoped>
$dark: 1px solid #000;
$light: 1px solid rgb(75, 75, 75);
.line-bottom {
  width: 100%;
  height: 0px;
  border-top: $dark;
  border-bottom: $light;
}
.line-top {
  width: 100%;
  height: 0px;
  border-bottom: $dark;
  border-top: $light;
}
.line-left {
  width: 0%;
  height: 100%;
  border-left: $light;
  border-right: $dark;
}
.line-right {
  width: 0%;
  height: 100%;
  border-left: $dark;
  border-right: $light;
}
</style>
