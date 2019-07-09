// App.vue

<template>
  <div id="app">
    <router-view v-if="$router.currentRoute.name=='Login'"></router-view>
    <template v-else>
      <app-header></app-header>
      <div class="row">
        <app-sidebar></app-sidebar>
        <div class="col">
          <transition name="fade">
            <div class="gap">
              <router-view></router-view>
            </div>
          </transition>
        </div>
      </div>
      <app-footer></app-footer>
    </template>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.gap {
  margin-top: 50px;
}

#body-row {
  margin-left: 0;
  margin-right: 0;
}
#sidebar-container {
  min-height: 100vh;
  background-color: #333;
  padding: 0;
}

.sidebar-expanded {
  width: 230px;
}
.sidebar-collapsed {
  width: 60px;
}

#sidebar-container .list-group a {
  height: 50px;
  color: white;
}

#sidebar-container .list-group .sidebar-submenu a {
  height: 45px;
  padding-left: 30px;
}
.sidebar-submenu {
  font-size: 0.9rem;
}

.sidebar-separator-title {
  background-color: #333;
  height: 35px;
}
.sidebar-separator {
  background-color: #333;
  height: 25px;
}
.logo-separator {
  background-color: #333;
  height: 60px;
}

#sidebar-container
  .list-group
  .list-group-item[aria-expanded="false"]
  .submenu-icon::after {
  content: " \f0d7";
  font-family: FontAwesome;
  display: inline;
  text-align: right;
  padding-left: 10px;
}

#sidebar-container
  .list-group
  .list-group-item[aria-expanded="true"]
  .submenu-icon::after {
  content: " \f0da";
  font-family: FontAwesome;
  display: inline;
  text-align: right;
  padding-left: 10px;
}

.nav-link {
  color: white;
}

.main-menu {
  color: white;
}
</style>