<template>
  <router-view/>
</template>

<script>
// import Signup from './components/Signup'
export default {
  name: 'App',
  components: {
    // Signup
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.logo {
    width: 100px
}
body{
  margin:0;
  padding:0;
}

.register input, .login input, .add input{
    width: 300px;
    height: 30px;
    padding-left: 20px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15px;
    border: 1px solid cadetblue;
}

.register button,.login button, .add button {
    width: 325px;
    height: 30px;
    background-color: darkgrey;
    border: 1px solid cadetblue;
    color: revert;
    cursor: pointer;
}

</style>
