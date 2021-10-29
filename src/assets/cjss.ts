import jss from 'jss'
import preset from 'jss-preset-default'

jss.setup(preset())

export const createUseStyles = (style: any) => {
  const sheet = jss.createStyleSheet(style)

  const { classes } = sheet.attach()

  return classes
}
