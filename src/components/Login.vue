<template>
<img class='logo' src='../assets/resto_logo.jpg'>
<h1>Login</h1>
<div class=login>
    <input type='text' placeholder='Enter Email' v-model='email'>
    <input type='password' placeholder='Enter Password' v-model='password'>

    <button v-on:click= 'login'>Login</button>
    <p>
        <router-link to='/signup'>Sign Up</router-link>
    </p>
</div>
</template>

<script>
import axios from '../helpers/network'
export default {
    name: 'Login',
    data(){
        return{
            email:'',
            password:'',
        }
    },
    methods:{
        async login(){

            await axios.post('http://localhost:2020/users/login',{
                    email: this.email,
                    password: this.password
                })
            .then((result)=> {
                if(result.status == 200 && result.data ){
                console.log(result.data)
                const {data, token} = result.data
                localStorage.setItem("Users Info",JSON.stringify(data))
                localStorage.setItem("jwt",token)
                axios.defaults.headers.common.Authorization = `Bearer ${token}`
                    if(!result.token){
                        this.$router.push({name:'Home'})
                    }
                }
            })
            .catch((error)=>{
                console.log(error)
                alert("Invalid Email Or Password")
            })      
        }
    },
    mounted(){
        const user = localStorage.getItem('Users Info')
        if(user){
            this.$router.push({name:'Home'})
        }
    }
}
</script>
