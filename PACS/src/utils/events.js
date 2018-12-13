class Events {
  constructor () {
    this.list = {}
  }
  // 订阅方法
  listen (key, fn) {
    if (!this.list[key]) {
      this.list[key] = []
    }
    this.list[key].push(fn)
  }
  // 触发方法
  trigger () {
    let key = [].shift.call(arguments)
    let fns = this.list[key]
    console.log(this.list)
    fns.forEach(item => {
      item.apply(this, arguments)
    })
  }
  // 移除订阅事件
  remove (key, fn) {
    // 移除所有事件
    if (!key) {
      this.list = []
    }
    let fns = this.list[key]
    if (!fns) {
      return false
    }
    if (!fn) {
      fns && (fns.length = 0)
    }
    fns = fns.filter(item => item !== fn)
  }
}

export default new Events()
