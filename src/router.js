import Vue from 'vue'
import Router from 'vue-router'
import Home from "./components/home/Home.vue"
import Detail from "./components/detail/Detail.vue"

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: "Home",
        keepAlive: true,
      }
    }, {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    // {
    //   // path: '/about',
    //   // name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      // if (from.meta.keepAlive) {
      //   from.meta.savedPosition = document.body.scrollTop;
      // }
      // return {
      //   x: 0,
      //   y: to.meta.savedPosition || 0,
      // }
      return {x: 0, y: 0}
    }
  }
})
