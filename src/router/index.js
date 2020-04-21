import Vue from 'vue'
import Router from 'vue-router'
import ReciteWords from "@/components/content/ReciteWords.vue"
import Personal from "@/components/content/Personal.vue"
import NewWords from "@/components/content/NewWords.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:'/reciteWords'},
    {path: '/reciteWords',component: ReciteWords},
    {path: '/newWords',component: NewWords},
    {path: '/personal',component: Personal},
  ]
})
