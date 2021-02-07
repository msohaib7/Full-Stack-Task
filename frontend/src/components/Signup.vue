<template>
    <div class="vue-tempalte">
        <form @submit.prevent="handleSubmit">
            <h3>Sign Up</h3>

            <div class="form-group">
                <label>Full Name</label>
                <input type="text" v-model="username" class="form-control form-control-lg"/>
            </div>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" v-model="email" class="form-control  form-control-lg" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" v-model="password" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Confirm Password</label>
                <input type="password" v-model="password_confirm" class="form-control form-control-lg" />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">Sign Up</button>

            <p class="forgot-password text-right">
                Already registered 
                <router-link :to="{name: 'login'}">sign in?</router-link>
            </p>
        </form>
    </div>
</template>


<script>
import axios from 'axios'
    export default {
        name:'Register',       
    
    data() {
        return {
            username: '',
            email: '',
            password:'',
            password_confirm: ''
        }
    },
    methods: {
        async handleSubmit(){
            const data = {
                username: this.username,
                email: this.email,
                password: this.password,
                password_confirm : this.password_confirm
            };
            
            const response = await axios.post('https://localhost:8080/signup',data)
                console.log(response);
                this.$roouter.push('/login');
        }
    }
    }
</script>