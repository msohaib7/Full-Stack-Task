<template>
    <div class="vue-tempalte">
        <form @submit.prevent="handleSubmit">
            <h3>Sign In</h3>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" v-model="email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" v-model="password" class="form-control form-control-lg" />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>

            <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/forgot">Forgot password ?</router-link>
            </p>

            <div class="social-icons">
                <ul>
                    <li><a href="#"><i class="fa fa-google"></i></a></li>
                    
                </ul>
            </div>

        </form>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name:'Login',
            data() {
        return {
            email: '',
            password:''
        }
    },
    methods: {
        async handleSubmit(){
            const data = {
                email: this.email,
                password: this.password
            };
            
            const responselogin = await axios.post('https://localhost:8080/login',data);
                console.log(responselogin);
                localStorage.setItem('token',responselogin.data.token)
        }
    }        
    }
</script>

