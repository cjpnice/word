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

const router = new Router({
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
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login'||to.path === '/register'||to.path === '/forgetPassword') {
    next();
  } else {
    let token = localStorage.getItem('userToken');
 
    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});
export default router;