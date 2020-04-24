import Vue from 'vue'
import Router from 'vue-router'
import ReciteWords from "@/components/content/ReciteWords.vue"
import Personal from "@/components/content/Personal.vue"
import NewWords from "@/components/content/NewWords.vue"
import Login from "@/components/content/Login.vue"
import Register from "@/components/content/Register.vue"
import ForgetPassword from "@/components/content/ForgetPassword.vue"
import ReviewSetting from "@/components/personal/ReviewSetting.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:'/login'},
    {path: '/reciteWords',component: ReciteWords},
    {path: '/newWords',component: NewWords},
    {path: '/personal',component: Personal},
    {path: '/login',component: Login},
    {path: '/register',component: Register},
    {path: '/forgetPassword',component: ForgetPassword},
    {path: '/reviewSetting',component: ReviewSetting},
  ]
})
