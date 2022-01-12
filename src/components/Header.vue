<template>
<div class = 'nav'>
<router-link to= '/'>Home</router-link>
<router-link to= '/add'>Add Restaurants</router-link>
<a v-on:click='logOut' href = #>Log Out</a>
</div>
</template>

<script>
import axios from '../helpers/network.js'
export default{
    name:'Header',
    methods:{
        logOut(){
            localStorage.clear()
            
            axios.defaults.headers.common.Authorization = undefined
            this.$router.push({name: 'Login'})
        }
    }
}
</script>

<style>
.nav{
    background-color:#333;
    overflow:hidden;
}
.nav a{
    color: papayawhip;
    padding: 16px 16px;
    float: left;
    font-size: 20px;
    text-align: center;
    text-decoration: none;
    margin-right: 10px;
}
.nav a:hover{
    background-color:#ddd;
    color:black;
}
</style>