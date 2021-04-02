<template>
  <div class="login">
    <form action class="form" @submit.prevent="login">
      <label class="form-label" for="#email">Email:</label>
      <input
        v-model="email"
        class="form-input"
        type="email"
        id="email"
        required
        placeholder="Email"
      >
      <label class="form-label" for="#password">Password:</label>
      <input
        v-model="password"
        class="form-input"
        type="password"
        id="password"
        placeholder="Password"
      >
      <p v-if="error" class="error">Has introducido mal el email o la contraseña.</p>
      <input class="form-submit" type="submit" value="Login">
    </form>

    <p class="msg">¿No tienes cuenta?
      <router-link to="/signin">Regístrate</router-link>
    </p>
  </div>
</template>

<script>
import AuthService from '../services/auth';
export default {
  data: () => ({
    email: "",
    password: "",
    error: false,
    errorMessage: ""
  }),
  methods: {
    login() {
      AuthService.login({
            email: this.email, 
            password: this.password
        }).then(response => {
            if(response.data.isAuth){
                AuthService.setUserLogged(response.data.token);
                this.$router.push('/');
            }else{
                this.error = true;
                this.errorMessage = response.data.message;
            }
        }).catch(error => {
            console.error(error);
        });
    }
  }
};
</script>

<style scoped>
.register {
  padding: 2rem;
}
.title {
  text-align: center;
}
.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-width: 350px;
  max-width: 100%;
  background: rgba(19, 35, 47, 0.9);
  border-radius: 5px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
.form-label {
  margin-top: 2rem;
  color: white;
  margin-bottom: 0.5rem;
}
.form-label:first-of-type {
    margin-top: 0rem;
}
.form-input {
  padding: 10px 15px;
  background: none;
  background-image: none;
  border: 1px solid white;
  color: white;
}
.form-input:focus {
outline: 0;
border-color: #1ab188;
}
.form-submit {
  background: #1ab188;
  border: none;
  color: white;
  margin-top: 3rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;
}
.form-submit:hover {
background: #0b9185;
}
.error {
  margin: 1rem 0 0;
  color: #ff4a96;
}
.msg {
  margin-top: 3rem;
  text-align: center;
}
</style>