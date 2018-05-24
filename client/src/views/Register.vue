<template>
    <div class="register">
    <div class="title">
        <h2>REGISTER!</h2>
    </div>
    <div class="form-group formBody">
      <label>First name</label>
      <input id="firstname" class="form-control" type="text" placeholder="Budi" v-model="firstname"><br>
      <label>Last name</label>
      <input id="lastname" class="form-control" type="text" placeholder="Budiman" v-model="lastname"><br>
      <label>Username</label>
      <input id="username" class="form-control" type="text" placeholder="budiman@mail.com" v-model="username"><br>
      <label>Password</label>
      <input type="password" class="form-control" placeholder="Minimum 6 alphanumeric characters" v-model="password"><br>
      <label>Confirm Password</label>
      <input type="password" class="form-control" placeholder="Minimum 6 alphanumeric characters" v-model="confirm"><br>
      <button class="btn btn-success" v-on:click="register">Register</button>
      <button class="btn btn-warning" @click="goToLogin">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      confirm: '',
      firstname: '',
      lastname: ''
    }
  },
  methods: {
    register () {
      let registerPayload = {
        username: this.username,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname
      }
      if (this.firstname === '') {
        swal('First name must be filled!', {icon: 'warning'})
      } else if (this.lastname === '') {
        swal('Last name must be filled!', {icon: 'warning'})
      } else if (this.username === '') {
        swal('Username must be filled!', {icon: 'warning'})
      } else if (this.password === '') {
        swal('Password must be filled!', {icon: 'warning'})
      } else if (this.password !== this.confirm) {
        swal('Password and confirm password is not the same!', {icon: 'warning'})
      } else {
        this.$store.dispatch('registerNewUser', registerPayload)
      }
    },
    goToLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.register{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3%;
}

div.title {
  align-self: center;
  margin-top: 3%;
  margin-bottom: 2%
}

.formBody {
  padding: 3%;
  width: 50%;
  background-color: rgb(0, 38, 95);
  color: white;
}
</style>
