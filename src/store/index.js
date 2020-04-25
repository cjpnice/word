import Vue from 'vue';
import Vuex from 'vuex';
 
Vue.use(Vuex);
 
const store = new Vuex.Store({
    state: {
        // 存储token
        userToken: ''
      },
     
      mutations: {
        // 修改token，并将token存入localStorage
        set_token (state, token) {
          state.userToken = token;
          localStorage.setItem('userToken', token);
        },
        del_token(state) {
            state.token = ''
            localStorage.removeItem('userToken')
            }
            
      }
});
export default store;