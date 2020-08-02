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
            <li class="nav-item">
              <router-link class="nav-link" to="/tasks">Tasks</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/register">Register</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Logout</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Midstackdev</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
</template>