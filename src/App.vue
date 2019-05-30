// App.vue

<template>
  <div id="app" class="container-fluid">
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
        <img
          src="https://v4-alpha.getbootstrap.com/assets/brand/bootstrap-solid.svg"
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt
        >
        <span class="menu-collapsed">Digital Signature</span>
      </a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
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
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Dropdown</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          >
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>

    <div class="row">
      <div id="sidebar-container" class="sidebar-expanded d-none d-md-block">
        <ul class="list-group">
          <li
            class="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed"
          >
            <small>MAIN MENU</small>
          </li>
          <a
            href="#submenu1"
            data-toggle="collapse"
            aria-expanded="false"
            class="bg-dark list-group-item list-group-item-action flex-column align-items-start"
          >
            <div class="d-flex w-100 justify-content-start align-items-center">
              <span class="fa fa-dashboard fa-fw mr-3"></span>
              <span class="menu-collapsed">Dashboard</span>
              <span class="submenu-icon ml-auto"></span>
            </div>
          </a>
          <div id="submenu1" class="collapse sidebar-submenu">
            <a href="#" class="list-group-item list-group-item-action bg-dark text-white">
              <span class="menu-collapsed">Charts</span>
            </a>
            <a href="#" class="list-group-item list-group-item-action bg-dark text-white">
              <span class="menu-collapsed">Reports</span>
            </a>
            <a href="#" class="list-group-item list-group-item-action bg-dark text-white">
              <span class="menu-collapsed">Tables</span>
            </a>
          </div>
          <a
            href="#submenu2"
            data-toggle="collapse"
            aria-expanded="false"
            class="bg-dark list-group-item list-group-item-action flex-column align-items-start"
          >
            <div class="d-flex w-100 justify-content-start align-items-center">
              <span class="fa fa-user fa-fw mr-3"></span>
              <span class="menu-collapsed">Profile</span>
              <span class="submenu-icon ml-auto"></span>
            </div>
          </a>
          <div id="submenu2" class="collapse sidebar-submenu">
            <a href="#" class="list-group-item list-group-item-action bg-dark text-white">
              <span class="menu-collapsed">Settings</span>
            </a>
            <a href="#" class="list-group-item list-group-item-action bg-dark text-white">
              <span class="menu-collapsed">Password</span>
            </a>
          </div>
        </ul>
      </div>
      <div class="col">
        <transition name="fade">
          <div class="gap">
            <router-view></router-view>
          </div>
        </transition>
      </div>
    </div>
    <div class="footer">copyright digital signature 2019</div>
  </div>
</template>

<script>
export default {};
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

.footer {
  background-color: #343a40;
  color: white;
  text-align: center;
}
</style>