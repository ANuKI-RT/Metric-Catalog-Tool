<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
function submit(event) {
  event.preventDefault()
  router.push('tools')
}

const form = {
  name: 'name',
  pwd: 'pwd',
}
</script>

<template>
  <!--Header-->
  <h3 class="headerLoginpage">Welcome to METIYETI</h3>
  <hr/>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <b-form class="row" @submit='submit'>
          <!-- Login name input -->
          <div class="row">
            <label for="loginName">Login name</label>
            <b-input type="text" v-model='form.name' id="loginName" required/>
          </div>
          <!-- Password input -->
          <div class="row">
            <label for="loginPwd">Password</label>
            <b-input type='password' v-model='form.pwd' id="loginPwd" required />
          </div>
          <div class="row loginButton">
            <div class="col-4"></div>
            <div class="col-4">
              <!-- Login button -->
              <b-button variant="primary" type="submit">Login</b-button>
            </div>
            <div class="col-4"></div>
          </div>
        </b-form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<style scoped>
div {
  text-align: center;
}

.headerLoginpage {
  text-align: center;
  margin-top: 10px;
}

.loginButton {
  margin-top: 20px;
}
</style>