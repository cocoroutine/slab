import Vue from 'vue'
import Router from 'vue-router'
import About from './views/About.vue'
import SlabPage from './views/SlabPage.vue'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/slab'
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/slab',
      name: 'SlabDefault',
      component: SlabPage,
      props: { pageComponent: "SlabContent" }
    },
    {
      path: '/slab/:id',
      name: 'SlabPage',
      component: SlabPage,
      props: { pageComponent: "SlabContent" }
    },
    {
      path: '/table/:id',
      name: 'TablePage',
      component: SlabPage,
      props: { pageComponent: "TableContent" }
    },
  ]
})
