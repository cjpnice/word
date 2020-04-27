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
    {path:'/',redirect:'/reciteWords'},
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
  //除了登陆，注册，忘记密码不需要登陆，其他界面必须登陆后才能进入
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