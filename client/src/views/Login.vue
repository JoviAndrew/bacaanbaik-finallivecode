<template>
<div id="loginPage">
  <div class="row">
    <div class="mainBody col-12">
      <div class="col-lg-4 col-xs-12"></div>
      <div class="login col-lg-4 col-xs-12">
        <h4 class="headerLogin"><strong>Login</strong></h4>
        <input type="text" class="form-control" placeholder="email@mail.com" v-model="username">
        <input type="password" class="form-control mt-3" placeholder="Password"  v-model="password">
        <div>
          <button class="btnLogin btn btn-primary mt-3" @click="doLogin">Log in</button>
        </div>
        <button class="btn btn-link" @click="goToRegister">Don't have an account? Register</button>
      </div>
      <div class="col-lg-4 col-xs-12"></div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    goToRegister () {
      this.$router.push('/register')
    },
    doLogin () {
      let loginData = {
        username: this.username,
        password: this.password
      }
      this.$store.dispatch('doLogin', loginData)
    }
  }
}
</script>

<style scoped>
input{
  margin: 2%
}

.headerLogin{
  margin: 3%;
  margin-bottom: 5%
}

.login{
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 25px;
  margin: 3%
}

.mainBody{
  display: flex;
  justify-content: center
}

.btn{
  margin: 2%
}
</style>
