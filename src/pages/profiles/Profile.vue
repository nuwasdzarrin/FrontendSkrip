<template>
  <div class="card">
    <div class="card-title">Your profile</div>
    <div class="card-body">
      <div class="info">
        <div class="title">
          <a target="_blank" href="https://scripteden.com/">{{ username }}</a>
        </div>
        <div class="desc">{{ firstname }}</div>
        <div class="desc">{{ lastname }}</div>
        <div class="desc">{{ email }}</div>
        <button @click="getProfile" >Get Profile</button>
      </div>
    </div>
  </div>
</template>

<script>
import { APIENDPOINT, getHeader } from "../../config/app.config";
import axios from "axios";

export default {
    data() {
        return {
            username:'',
            email:'',
            firstname:'',
            lastname:''
        }
    },
    methods: {
        getProfile(){
            axios.get(APIENDPOINT + "/getuserclaims", getHeader())
            .then (res=>{
                this.username = res.data.UserName
                this.email = res.data.Email
                this.firstname = res.data.FirstName
                this.lastname = res.data.LastName
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }
}
</script>

