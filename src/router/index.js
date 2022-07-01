import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
import Login from '@/views/Login'
const Home = () => import('@/views/Home')
const Video = () => import('@/views/Video')
const Question = () => import('@/views/Question')
const My = () => import('@/views/My')
const Search = () => import('@/views/Search')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: 'home', component: Home },
      { path: 'video', component: Video },
      { path: 'question', component: Question },
      { path: 'my', component: My, name: 'my' }
    ]
  },
  { path: '/login', component: Login, name: 'login' },
  { path: '/search', component: Search }

]

const router = new VueRouter({
  routes
})

export default router
