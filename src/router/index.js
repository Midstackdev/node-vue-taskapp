import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/authentication/Login.vue'
import Register from '../views/authentication/Register.vue'
import TaskAll from '../views/tasks/TasksAll.vue'
import TaskCreate from '../views/tasks/TasksCreate.vue'
import TaskEdit from '../views/tasks/TasksEdit.vue'

Vue.use(VueRouter)

  const isLoggedIn = false

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/tasks',
    name: 'tasks-all',
    component: TaskAll,
    beforeEnter: (to, from, next) => {
      if(isLoggedIn) {
        next()
      } else
        next('/login')
    }
  },
  {
    path: '/tasks/new',
    name: 'tasks-create',
    component: TaskCreate,
    beforeEnter: (to, from, next) => {
      if(isLoggedIn) {
        next()
      } else
        next('/login')
    }
  },
  {
    path: '/tasks/:id',
    name: 'tasks-edit',
    component: TaskEdit,
    beforeEnter: (to, from, next) => {
      if(isLoggedIn) {
        next()
      } else
        next('/login')
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if(!isLoggedIn) {
        next()
      } else
        next('/')
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if(!isLoggedIn) {
        next()
      } else
        next('/')
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active'
})

// routes.beforeEach((to, from, next) => {

// })

export default router
