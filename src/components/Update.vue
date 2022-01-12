<template>
<Header/>
<h1>Wellcome to Update Restaurants Page </h1>
<form class='add'>
    <input type='text' placeholder='Enter Name' v-model='restaurants.name' name='name'>
    <input type='text' placeholder='Enter Address' v-model='restaurants.address' name='address'>
    <input type='tel' placeholder='Enter Contact' v-model='restaurants.contact' name='contact'>
    <button type= 'button' v-on:click='updateResto'>Update Restaurants </button>
</form>
</template>

<script>
import Header from './Header.vue'
import axios from '../helpers/network.js'
export default{
    name:'Update',
    data(){
        return{
            restaurants:{
                name:'',
                address:'',
                contact:''
            }
        }
    },
    components:{
        Header
    },
    methods:{
        async updateResto(){
            let result = await axios.put('http://localhost:2020/users/updateResto/'+this.$route.params.id,{
                name: this.restaurants.name ,
                address: this.restaurants.address,
                contact:  this.restaurants.contact
            })
            console.log(result)
            if(result.status === 200){
                this.$router.push({name:'Home'})
            }
        }
    },
    async mounted(){
        const user = localStorage.getItem('Users Info')
        if(!user){
            this.$router.push({name:'Signup'})
        }
        let result = await axios.get('http://localhost:2020/users/getResto/'+this.$route.params.id)
        this.restaurants = result.data
    }
}
</script>