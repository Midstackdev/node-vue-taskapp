<template>
    <div>
        <h1>Register Route</h1>
        <form class="custom-form" @submit="onSubmit">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" class="form-control" id="username" v-model="username">
          </div>
          <div class="form-group">
            <label for="firstname">Firstname</label>
            <input type="text" class="form-control" id="firstname" v-model="firstname">
          </div>
          <div class="form-group">
            <label for="lastname">Lastname</label>
            <input type="text" class="form-control" id="lastname" v-model="lastname">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" v-model="password">
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Register</button>
          </div>
        </form>
    </div>
</template>


<script>
    import * as auth from '../../services/AuthService'

    export default {
        name: 'Register',
        data () {
            return {
                username: '',
                password: '',
                firstname: '',
                lastname: ''
            }
        },
        methods: {
            async onSubmit (event) {
                event.preventDefault()
                const user = {
                    username: this.username,
                    password: this.password,
                    first: this.firstname,
                    last: this.lastname
                }

                const registerPromise = auth.registerUser(user)
                const loginPromise = auth.login(user)

                await Promise.all([registerPromise, loginPromise])
                this.$router.push({ name: 'home' })
            }
        }
    }
</script>