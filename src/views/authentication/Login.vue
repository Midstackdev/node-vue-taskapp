<template>
    <div>
        <h1>Login Route</h1>
        <form class="custom-form" @submit="onSubmit">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" class="form-control" id="username" v-model="username">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" v-model="password">
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
    </div>
</template>


<script>
    import * as auth from '../../services/AuthService'

    export default {
        name: 'Login',
        data () {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            async onSubmit (event) {
                event.preventDefault()
                const user = {
                  username: this.username,
                  password: this.password
                }
                await auth.login(user)
                this.$router.push({ name: 'home' })
            }
        }
    }
</script>