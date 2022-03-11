import Vue from 'vue'
import App from './App.vue'
import "@/mobile/flexible.js"//适配
import "@/styles/reset.css"//初始化样式
import router from './router'
import { List,Tabbar, TabbarItem,NavBar,Col, Row ,Image as VanImage,Cell,Icon,Search} from 'vant'

// import {resultListAPI} from '@/api/index.js'

// async function fn(){
//   const res = await resultListAPI()
//   console.log(res);
// }
// fn()

Vue.use(List)
Vue.use(Search)
Vue.use(Icon)
Vue.use(Cell)
Vue.use(VanImage)
Vue.use(Col);
Vue.use(Row);
Vue.use(NavBar);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
