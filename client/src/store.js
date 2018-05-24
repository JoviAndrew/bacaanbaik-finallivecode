import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: [],
    isLogin: false
  },
  mutations: {
    setBooks (state, bookData) {
      state.books = bookData
    },
    changeStatusTrue (state) {
      state.isLogin = true
    },
    changeStatusFalse (state) {
      state.isLogin = false
    }
  },
  actions: {
    getAllBooks ({commit}) {
      axios.get('http://localhost:3000/book/show')
        .then(function (bookData) {
          commit('setBooks', bookData)
        })
        .catch(function (err) {
          swal(err.response.data.message, {icon: 'warning'})
        })
    },
    doLogin ({commit}, loginData) {
      axios.post('http://localhost:3000/user/login',
        {
          username: loginData.username,
          password: loginData.password
        })
        .then(function (response) {
          swal({
            title: 'Success',
            text: response.data.message,
            icon: 'success',
            buttons: 'OK'
          })
          router.push('/')
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('username', response.data.username)
          localStorage.setItem('firstname', response.data.firstname)
          localStorage.setItem('lastname', response.data.lastname)
          commit('changeStatusTrue')
        })
        .catch(function (err) {
          swal(err.response.data.message, {icon: 'warning'})
        })
    },
  }
})
