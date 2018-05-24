<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link class="navbar-brand" :to=" {path: '/'}">Baca Baik</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <button class="btn btn-light" @click="goToHome">Home</button>
          </li>
        </ul>
        <input class="form-control my-2 my-lg-0 ml-2 mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-success my-2 my-sm-0" type="submit">Search</button>
        <button v-if="isLogin" class="btn btn-danger my-2 my-sm-0" @click="doLogout">Log out</button>
        <button v-else class="btn btn-outline-success my-2 my-sm-0" @click="gotoLogin">Log in</button>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
   computed: {
    ...mapState(['isLogin'])
  },
  created () {
    let token = localStorage.getItem('token')
    if (token) {
      this.$store.commit('changeStatusTrue')
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    goToHome () {
      this.$router.push('/')
      this.$store.dispatch('getAllQuestions')
    },
    gotoLogin () {
      this.$router.push('/login')
    },
    doLogout () {
      swal({
        title: 'Logout',
        text: 'Are you sure you want to logout?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((logout) => {
          if (logout) {
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            localStorage.removeItem('firstname')
            localStorage.removeItem('lastname')
            this.$router.push('/')
            this.$store.commit('changeStatusFalse')
            this.$store.dispatch('getAllQuestions')
            swal('You have successfully logged out!', { icon: 'success' })
          }
        })
    }
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
