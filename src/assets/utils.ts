export function createNode(txt: string, className = 'child') {
  const template = `<div class='${className}'>${txt}</div>`
  const tempNode = document.createElement('div')
  tempNode.innerHTML = template
  const body = tempNode.firstChild as HTMLElement
  return body
}

export function getAngle(px: number, py: number, mx: number, my: number) {
  const x = Math.abs(px - mx)
  const y = Math.abs(py - my)
  const z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
  if (z == 0) return 0
  const cos = y / z
  const radian = Math.acos(cos) //用反三角函数求弧度

  let angle = (180 * radian) / Math.PI //将弧度转换成角度
  //因为算出来的值是[0,90),需要转成[0,360)
  if (mx >= px) {
    if (my >= py) {
      angle = 90 - angle
    } else {
      angle = 270 + angle
    }
  } else {
    if (my >= py) {
      angle = 90 + angle
    } else {
      angle = 270 - angle
    }
  }
  return angle
}

export function toRadian(angle: number) {
  return (angle * Math.PI) / 180
}
