const MVVM = (() => {
  const _h = (tagName, attributes, eventListeners, children) => {
    const el = document.createElement(tagName)
    for (const [qualifiedName, value] of attributes)
      el.setAttribute(qualifiedName, value)
    for (const [event, listener] of eventListeners)
      el[event] = listener
    el.append(...children)
    return el
  }
  const _debounce = (fn, delay) => {
    let timer = NaN
    return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => fn.apply(this, args), delay)
    }
  }
  class MVVM {
    constructor(options) {
      this.$el = options.el
      this.$options = options.options || {}
      this.$render = options.render
      this.$mounted = options.mounted || (() => { })
      const _nextTicks = []
      this.$nextTick = (fn) => _nextTicks.push(fn)
      const _processTicks = () => {
        while (_nextTicks.length !== 0) {
          const nextTick = _nextTicks.shift()
          nextTick()
        }
      }
      const _refresh = _debounce(() => {
        new Promise((resolve) => {
          this.$el.replaceChildren(this.$render.call(this, _h))
          resolve()
        }).then(() => _processTicks())
      }, 0)
      this.$data = new Proxy(options.data, {
        set(target, p, newValue) {
          target[p] = newValue
          _refresh()
          return true
        }
      })
      _refresh()
      this.$mounted()
    }
  }
  return MVVM
})()
