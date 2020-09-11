import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../components/Main'
// import fl from '../components/fl'
// import AgentInfor from '../components/AgentInfor'
// import Member from '../components/Member'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path:'/fl/:id',
    component: ()=> import(/*webpackChunkName:"router"*/'../components/fl'),
  },
  {
    path:'/AgentInfor',
    component:()=> import(/*webpackChunkName:"router"*/'../components/AgentInfor')
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if(savedPosition){
      return new Promise((resolve)=>{
        setTimeout(()=>{
          resolve(false)
        },350)
      })
    }else{
      return new Promise((resolve)=>{
        setTimeout(()=>{
          resolve({x:0,y:0})
        },350)
      })
    }
  }
})

export default router
