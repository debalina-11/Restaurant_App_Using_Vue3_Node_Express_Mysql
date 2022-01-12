<template>
<img class='logo' src='../assets/resto_logo.jpg'>
<h1>Sign up </h1>
<div class='register'>
    <input type='text' placeholder='Enter Name' v-model='name'>
    <input type='text' placeholder='Enter Email' v-model='email'>
   <!-- <span v-if="invalidEmail">Please provide correct email</span>  -->
    <input type='password' placeholder='Enter Password' v-model='password'>
  <!--  <span v-if="invalidPassword">Password must be at least 6 characters long</span> -->
    <button v-on:click='signup'> Signup </button>

    <p>
        <router-link to='/login'>Login</router-link>
    </p>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Signup',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            invalidEmail: false,
            invalidPassword: false
        }
    },
    methods: {
        validEmail (email){
            return String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        },
        validPassword (password){
            return password.length > 6
        },
        async signup() {
            this.invalidEmail= false
            this.invalidPassword= false
            if(!this.validEmail(this.email)){
                this.invalidEmail= true;
                return alert("Please provide correct email")
            }

            if(!this.validPassword(this.password)){
                this.invalidPassword = true;
                return alert("Password must be at least 6 characters long")
            }
            console.log(this.name, this.email, this.password)

            if (!this.name || !this.email || !this.password)
                return alert("Please Enter The Details")
            await axios.post("http://localhost:2020/users", {
                    name: this.name,
                    email: this.email,
                    password: this.password
                })
                // console.log(result)
                .then((result) => {
                    if (result.status == 200) {
                        const {data, token} = result.data
                        localStorage.setItem("Users Info",JSON.stringify(data))
                        localStorage.setItem("jwt",token)
                        axios.defaults.headers.common.Authorization = `Bearer ${token}`
                        this.$router.push({ name: 'Home'})
                    }
                })
                .catch((error) => {
                    console.log(error)
                    alert("User Already Exist.")
                })
        }
    },
    mounted() {
        const user = localStorage.getItem('Users Info')
        if (user) {
            this.$router.push({name: 'Home'})
        }
    }
}
</script>

<style>

</style>
