import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    params: {
      detail: {
        title: 'aa',
        description: 'aa',
        author: {
          username: 'aa'
        },
        answer: [{
          author: {
            username: 'aa'
          },
          description: 'aa',
          created: 'aa'
        }]
      }
    }
  }
})
