<template>
  <div class="card">
    <div class="card-title">
      <h4>Login Digital Signature</h4>
    </div>
    <div class="card-body">
      <form v-on:submit.prevent="loginUser()">
        <div class="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input
            type="text"
            class="form-control"
            placeholder="username"
            v-model="loginDetails.username"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            v-model="loginDetails.password"
          />
        </div>
        <button type="submit" class="btn btn-primary" value="login">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
// import loginService from './LoginService.js';
import { APIENDPOINT, getHeader } from "../../config/app.config";
import { session } from '../../constants'
import axios from "axios";
export default {
  data() {
    return {
      loginDetails: {
        username: "",
        password: "",
        grant_type: "password"
      }
    };
  },
  methods: {
    loginUser: function() {
      const authUser = {};
      var app = this;
      var reqData =
        "username=" +
        this.loginDetails.username +
        "&password=" +
        this.loginDetails.password +
        "&grant_type=password";
      axios
        .post(APIENDPOINT + "/token", reqData, {
          headers: {
            "Content-Type": "application/x-www-urlencoded"
          }
        })
        .then(function(res) {
          if (res.data.access_token) {
            authUser.data = res.data;
            app.$store.state.isLoggedIn = true;
            window.localStorage.setItem("lbUser", JSON.stringify(authUser));
            axios.get(APIENDPOINT + "/getuserclaims", getHeader()).then((res)=>{
                authUser.userId = res.data.UserId
                window.localStorage.setItem("lbUser", JSON.stringify(authUser))
                var rolee = JSON.parse(authUser.data.role)
                if (rolee[0] == "Issuer") {
                  app.$router.push("/issuer");
                } else if (rolee[0] == "Validator") {
                  app.$router.push("/validator");
                } else if (rolee[0] == "Requestor") {
                  app.$router.push("/requestor");
                }
            }).catch((err)=>{
                console.log(err)
            })
          } else {
            app.$store.state.isLoggedIn = false;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    loginAuth: function() {
      var app = this;
      const status = JSON.parse(session)
      const rolee = JSON.parse(status.data.role)
      if (status == null || status == undefined) {
        app.$router.push("/login");
      } else if (rolee[0] == "Issuer") {
        app.$router.push("/issuer");
      } else if (rolee[0] == "Validator") {
        app.$router.push("/validator");
      } else if (rolee[0] == "Requestor") {
        app.$router.push("/requestor");
      }
    }
  },
  created: function() {
    this.loginAuth();
  }
};
</script>

<style>
</style>