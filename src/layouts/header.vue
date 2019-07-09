<template>
  <section class="header">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="#">
        <!-- <img
          src="https://v4-alpha.getbootstrap.com/assets/brand/bootstrap-solid.svg"
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt
        /> -->
        <span class="menu-collapsed">Digital Signature</span>
      </a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <!-- <li class="nav-item active">
            <router-link :to="{ name: 'Create' }" class="nav-link">Add Item</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Index' }" class="nav-link">All Items</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'ViewPDF' }" class="nav-link">View PDF</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'UploadPDF' }" class="nav-link">Upload PDF</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'UploadIssuer' }" class="nav-link">Upload Issuer</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'LandingIssuer' }" class="nav-link">Issuer</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'LandingValidator' }" class="nav-link">Validator</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'LandingRequestor' }" class="nav-link">Requestor</router-link>
          </li> -->
        </ul>
          <button class="btn btn-outline-danger my-2 my-sm-0" v-on:click="logout()" v-if="checkLogin">Logout</button>
          <router-link class="btn btn-outline-success my-2 my-sm-0" :to="{ name: 'Login' }" v-if="!checkLogin">Login</router-link>
      </div>
    </nav>
  </section>
</template>

<script>
  import VueRouter from 'vue-router'
  export default {
    data() {
      return {
        message:'Header'
      }
    },
    methods: {
        logout:function() {
           var app = this;
         localStorage.removeItem("lbUser");
         app.$router.push({ name: 'Login'});
         app.$store.state.isLoggedIn = false;
        }
    },
    computed: {
      checkLogin() {
        return this.$store.state.isLoggedIn;
      }
    }
  }
</script>
