<template>
    <header>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top custom-bg-dark">
        <router-link class="navbar-brand" to="/">
            <img src="../assets/logo.png" alt="logo" style="max-height: 25px;">
            Task Manager
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/" exact>Home</router-link>
            </li>
            <template v-if="!$store.state.isLoggedIn">
              <li class="nav-item">
                <router-link class="nav-link" to="/register">Register</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/login">Login</router-link>
              </li>
            </template>
            <template v-else>
              <li class="nav-item">
                <router-link class="nav-link" to="/tasks">Tasks</router-link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  {{ $store.state.username  ?  $store.state.username : 'User'}}
                </a>
              </li>
            </template>
          </ul>
        </div>
      </nav>
    </header>
</template>

<script>
  import * as auth from '../services/AuthService'
  export default {
    name: 'Navbar',
    methods: {
      logout () {
        auth.logout()
        this.$router.push({ name: 'home' })
      }
    }
  }
</script>