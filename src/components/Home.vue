<template>
<Header />
<h1>Hello {{name}} ! Wellcome to Home Page </h1>
<table border=1px solid black>
    <tr>
        <td>Id</td>
        <td>Name</td>
        <td>Address</td>
        <td>Contact</td>
        <td>Actions</td>
        <td>Upload Image</td>
    </tr>
    <tr v-for='item in restaurants' :key='item.id'>
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.address}}</td>
        <td>{{item.contact}}</td>
        <td>
            <router-link :to="/update/ +item.id">Update</router-link>
            <button v-on:click="deleteResto(item.id)">Delete</button>
        </td>
        <td>
        <input type = "file" @change= "selectFile" >
        <button type = "submit" v-on:click="sendFile"> Upload </button>
        <img src: this.file.path/>
        </td>
    </tr>
</table>
</template>

<script>
import Header from './Header.vue'
// import axios from 'axios'
import axios from '../helpers/network.js'
export default {
    name: 'Home',
    data() {
        return {
            name: '',
            restaurants: [],
            file: null,

        }
    },
    components: {
        Header
    },
    methods: {
        selectFile(event){
            this.file = event.target.files[0]
            console.log(event)
        },
        async sendFile(){
            // console.log("submit")
            const formData = new FormData()
            formData.append('file', this.file,this.file.name)
            await axios.post('http://localhost:2020/users/upload',formData)
            .then((res) => {
                console.log(res)
                this.$router.push({ name: 'Home'})
            })
            .catch(() => {
                alert("Upload only image (png,jpg,jpeg) format")
            })
        },
        async deleteResto(id) {
            let result = await axios.delete('http://localhost:2020/users/deleteResto/'+id)
            if(result.status == 200){
                this.loadData()
            }
        },
        async loadData() {
            const user = localStorage.getItem('Users Info')
            this.name = JSON.parse(user).name
            if (!user) {
                this.$router.push({
                    name: 'Signup'
                })
            }
            let result = await axios.get('http://localhost:2020/users/getResto')
            this.restaurants = result.data
        }
    },
    mounted() {
        const user = localStorage.getItem('Users Info')
        if (!user) {
                this.$router.push({
                    name: 'Signup'
                })
            }
        this.loadData()
    }
}
</script>

<style>
td {
    width: 220px;
    height: 70px
}
</style>
