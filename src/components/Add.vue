<template>
<Header/>
<h1>Wellcome to Add Restaurants Page </h1>
<img class='logo' src='../assets/resto_logo.jpg'>
<h1>Add Restaurants</h1>
<form class='add'>
    <input type='text' placeholder='Enter Name' v-model='restaurants.name' name='name' required>
    <input type='text' placeholder='Enter Address' v-model='restaurants.address' name='address' required>
    <input type='tel' placeholder='Enter Contact' v-model='restaurants.contact' size="20" name='contact' minlength="10" maxlength="20" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"  required>
    <button type= 'button' v-on:click='addResto'> Add New Restaurants </button>
</form>
</template>

<script>
import Header from './Header.vue'
import axios from '../helpers/network.js'
export default{
    name:'Add',
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
         regexPhoneNumber(number) {
            return number.length >= 10 
        },
        async addResto(){
            if(!this.restaurants.name || !this.restaurants.address || !this.restaurants.contact)
            return alert('Please Enter the details')
            if(!this.regexPhoneNumber(this.restaurants.contact)){
                return alert("phone No must be 10 charecters")
            }
            let result = await axios.post('http://localhost:2020/users/addResto',{
                name: this.restaurants.name ,
                address: this.restaurants.address,
                contact:  this.restaurants.contact
            })
            console.log(result)
            if(result.status === 200 && this.restaurants.name != '' && this.restaurants.address!= '' && this.restaurants.contact){
                this.$router.push({name:'Home'})
            }
            else{
                alert("Enter Full Details")
            }
        }
    },
    mounted(){
        const user = localStorage.getItem('Users Info')
        if(!user){
            this.$router.push({name:'Signup'})
        }
    }
}
</script>