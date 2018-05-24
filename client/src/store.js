import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: [],
    detailBook: '',
    isLogin: false
  },
  mutations: {
    setBooks (state, bookData) {
      bookData.sort(function(a, b) {
        return b.likes.length - a.likes.length
      })
      state.books = bookData
    },
    setBookDetail (state, bookData) {
      bookData.comments.forEach(comment => {
        let date = new Date(comment.createdAt)
        comment.createdAt = date
      })
      state.detailBook = bookData
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
          commit('setBooks', bookData.data.data)
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
    addNewBook ({dispatch}, bookInput) {
      axios.post('http://localhost:3000/book/add-book', bookInput.data,
        {
          headers: {token: bookInput.token}
        })
        .then(function (response) {
          swal(response.data.message, {icon: 'success'})
          dispatch('getAllBooks')
        })
        .catch(function (err) {
          swal(err.response.data.message, {icon: 'warning'})
        })
    },
    getOneBook ({commit}, bookId) {
      axios.get(`http://localhost:3000/book/show/${bookId}`)
        .then(function (bookData) {
          commit('setBookDetail', bookData.data.bookData)
        })
        .catch(function (err) {
          swal(err.response.data.message, {icon: 'warning'})
        })
    },
    likeBook ({dispatch}, payload) {
      axios.put(`http://localhost:3000/book/like/${payload.bookId}`, {},
      {
        headers: { token: payload.token }
      })
      .then(function (response) {
        dispatch('getOneBook', payload.bookId)
      })
      .catch(function (err) {
        swal(err.response.data.message, {icon: 'warning'})
      })
    },
    unlikeBook ({dispatch}, payload) {
      axios.put(`http://localhost:3000/book/unlike/${payload.bookId}`, {},
      {
        headers: { token: payload.token }
      })
      .then(function (response) {
        dispatch('getOneBook', payload.bookId)
      })
      .catch(function (err) {
        swal(err.response.data.message, {icon: 'warning'})
      })
    },
    addComment ({dispatch}, commentPayload) {
      axios.post(`http://localhost:3000/book/add-comment/${commentPayload.bookId}`, 
        {
          comment: commentPayload.comment
        },
        {
          headers: { token: commentPayload.token }
        })
        .then(function (response) {
          swal(response.data.message, {icon: 'success'})
          dispatch('getOneBook', commentPayload.bookId)
        })
        .catch(function (err) {
          swal(err.response.data.message, {icon: 'warning'})
        })
    },
    searchBook ({commit}, searchPayload) {
      axios.post(`http://localhost:3000/book/show/${searchPayload.title}`)
        .then(function (bookData) {
          commit('setBooks', bookData)
        })
        .catch(function (err) {
          swal(err.response.data.message, {icon: 'warning'})
        })
    },
    registerNewUser ({}, registerPayload) {
      axios.post('http://localhost:3000/user/register',
        {
          username: registerPayload.username,
          password: registerPayload.password,
          firstname: registerPayload.firstname,
          lastname: registerPayload.lastname
        })
        .then(function (response) {
          swal(response.data.message, {icon: 'success'})
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('username', response.data.username)
          localStorage.setItem('firstname', response.data.firstname)
          localStorage.setItem('lastname', response.data.lastname)
          router.push('/')
        })
    },
    deleteBook ({dispatch}, bookPayload) {
      
    }
  }
})
