import { defineComponent, inject, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { THREE } from '@three/lib'
import { ThreeJsEnvironment } from '@/assets/threejs/types'
// import { loadModelByPath } from '@three/utils'
export default defineComponent({
  name: 'CameraControl',
  props: {},
  setup(/** props, ctx */) {
    const store = useStore()
    const env = inject('ENV') as ThreeJsEnvironment
    // onBeforeUnmount(() => {})


    
    return () => {
      return null
    }
  },
})