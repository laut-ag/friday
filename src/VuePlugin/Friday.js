const FridayVue = {}

FridayVue.install = function ( Vue, { friday } ) {
  Vue.prototype.$friday = friday
}

export default FridayVue
