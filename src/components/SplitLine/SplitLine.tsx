import { computed, defineComponent, PropType } from 'vue'
import { useStyles } from './SplitLine.scss'

type Horizontal = 'top' | 'bottom' | 'left' | 'right'
export default defineComponent({
  name: 'SplitLine',
  props: {
    option: {
      type: String as PropType<Horizontal>,
      default: 'top',
    },
  },
  setup(props) {
    const className = useStyles().value
    const nameRef = computed(() => {
      switch (props.option) {
        case 'top':
          return className.lineTop
        case 'bottom':
          return className.lineBottom
        case 'left':
          return className.lineLeft
        case 'right':
          return className.lineRight
      }
    })

    return () => {
      return <div class={nameRef.value}></div>
    }
  },
})
