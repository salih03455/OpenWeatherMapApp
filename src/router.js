import Vue from 'vue'
import Router from 'vue-router'
import List from './views/List.vue'
import Detail from './views/Detail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: List
    },
    {
      path: '/:id',
      name: 'detail',
      component: Detail
    }
  ],
  mode: 'history'
})
