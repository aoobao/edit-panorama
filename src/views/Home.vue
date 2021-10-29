<template>
  <div :class="className.home">
    <Header />
    <SplitLine option="bottom" />
    <div :class="className.body">
      <Tools />
      <div :class="className.contents">
        <div :class="className.wrapper">
          <HomeView />
        </div>
        <FooterView />
      </div>
      <RightView />
    </div>
  </div>
</template>

<script lang="ts">
// import { Options, Vue } from 'vue-class-component'
import Header from './header/Header.vue'
import SplitLine from '@/components/SplitLine/SplitLine'
import Tools from '@/views/tools/Tools.vue'
import { useCssModule } from 'vue'
import RightView from './rightview/RightView.vue'
import FooterView from './footerview/FooterView.vue'
import HomeView from './homeview/HomeView.vue'
export default {
  components: { Header, SplitLine, Tools, RightView, FooterView, HomeView },
  setup() {
    const className = useCssModule()
    return {
      className,
    }
  },
}
</script>
<style lang="scss" module>
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #333333;
  .body {
    flex-grow: 1;
    height: 1px;
    width: 100%;

    display: flex;
  }
  .contents {
    width: 1px;
    flex-grow: 1;
    height: 100%;

    display: flex;
    flex-direction: column;

    .wrapper {
      width: 100%;
      height: 1px;
      flex-grow: 1;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
