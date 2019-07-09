<template>
  <div id="sidebar-container" class="sidebar-expanded d-none d-md-block">
    <ul class="list-group">
      <li
        class="bg-dark list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed"
        v-if="checkLogin"
      >
        <small class="main-menu">MAIN MENU</small>
      </li>
      <!-- below for landing issuer -->
      <router-link
        :to="{ name: (role =='Issuer' ? 'LandingIssuer' : role=='Validator' ? 'LandingValidator' : role=='Requestor' ? 'LandingRequestor' : null) }"
        data-toggle="collapse"
        aria-expanded="false"
        class="bg-dark list-group-item list-group-item-action flex-column align-items-start"
      >
        <div class="d-flex w-100 justify-content-start align-items-center">
          <span class="fa fa-dashboard fa-fw mr-3"></span>
          <span class="menu-collapsed">Dashboard</span>
          <span class="submenu-icon ml-auto"></span>
        </div>
      </router-link>
      <!-- below to add cert issuer -->
      <router-link
        :to="{ name: 'CertIssuer' }"
        v-if="role=='Issuer'"
        data-toggle="collapse"
        aria-expanded="false"
        class="bg-dark list-group-item list-group-item-action flex-column align-items-start"
      >
        <div class="d-flex w-100 justify-content-start align-items-center">
          <span class="fa fa-certificate fa-fw mr-3"></span>
          <span class="menu-collapsed">Cert</span>
          <span class="submenu-icon ml-auto"></span>
        </div>
      </router-link>
      
      <!-- below for sign issuer -->
      <router-link
        :to="{ name: 'SignIssuer' }"
        v-if="role=='Issuer'"
        data-toggle="collapse"
        aria-expanded="false"
        class="bg-dark list-group-item list-group-item-action flex-column align-items-start"
      >
        <div class="d-flex w-100 justify-content-start align-items-center">
          <span class="fa fa-edit fa-fw mr-3"></span>
          <span class="menu-collapsed">Sign</span>
          <span class="submenu-icon ml-auto"></span>
        </div>
      </router-link>
      <!-- below for sign validator -->
      <router-link
        :to="{ name: 'SignValidator' }"
        v-if="role=='Validator'"
        data-toggle="collapse"
        aria-expanded="false"
        class="bg-dark list-group-item list-group-item-action flex-column align-items-start"
      >
        <div class="d-flex w-100 justify-content-start align-items-center">
          <span class="fa fa-edit fa-fw mr-3"></span>
          <span class="menu-collapsed">Sign</span>
          <span class="submenu-icon ml-auto"></span>
        </div>
      </router-link>
      <!-- below for Request Sign -->
      <router-link
        :to="{ name: 'ReqSign' }"
        v-if="role=='Requestor'"
        data-toggle="collapse"
        aria-expanded="false"
        class="bg-dark list-group-item list-group-item-action flex-column align-items-start"
      >
        <div class="d-flex w-100 justify-content-start align-items-center">
          <span class="fa fa-edit fa-fw mr-3"></span>
          <span class="menu-collapsed">Sign</span>
          <span class="submenu-icon ml-auto"></span>
        </div>
      </router-link>
      <!-- below for profile -->
      <router-link
        :to="{ name: 'Profile' }"
        v-if="checkLogin"
        data-toggle="collapse"
        aria-expanded="false"
        class="bg-dark list-group-item list-group-item-action flex-column align-items-start"
      >
        <div class="d-flex w-100 justify-content-start align-items-center">
          <span class="fa fa-user fa-fw mr-3"></span>
          <span class="menu-collapsed">Profile</span>
          <span class="submenu-icon ml-auto"></span>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
    computed: {
    checkLogin() {
      return this.$store.state.isLoggedIn;
    },
    role() {
      var rolee = JSON.parse(
        JSON.parse(window.localStorage.getItem("lbUser")).data.role
      );
      return rolee[0];
    }
  }
}
</script>


    