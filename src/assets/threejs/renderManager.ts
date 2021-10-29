type Render = (detail: number | undefined) => void

const renders: Render[] = []

export const addRender = (func: Render) => {
  renders.push(func)
}

export const removeRender = (func: Render) => {
  for (let s = renders.length - 1; s >= 0; s--) {
    const render = renders[s]
    if (render === func) {
      renders.splice(s, 1)
    }
  }
}

export const updateRender = (delta: number | undefined) => {
  for (let i = 0; i < renders.length; i++) {
    const render = renders[i]
    render(delta)
  }
}
