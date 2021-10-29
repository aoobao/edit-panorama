import { createUseStyles } from 'vue-jss'
const dark = '1px solid #000'
const light = '1px solid rgb(75, 75, 75)'

const global = {
  flexShrink: 0,
}

const scss = {
  lineBottom: {
    width: '100%',
    height: 0,
    borderTop: dark,
    borderBottom: light,
    ...global,
  },
  lineTop: {
    width: '100%',
    height: 0,
    borderBottom: light,
    borderTop: dark,
    ...global,
  },
  lineLeft: {
    width: 0,
    height: '100%',
    borderLeft: dark,
    borderRight: light,
    ...global,
  },
  lineRight: {
    width: 0,
    height: '100%',
    borderLeft: dark,
    borderRight: light,
    ...global,
  },
}

export const useStyles = createUseStyles(scss)
