<template>
  <div class="user-dropdown">

    <!--Profile-->
    <div class="user-button">
      <span class="d-none d-sm-block">{{user.name}}</span>
      <div class="user-dropdown-img">
        <Gravatar :email="user.email" alt="User" />
      </div>
      <i class="fa fa-angle-down" />
    </div>

    <!-- Dropdown -->
    <div class="user-dropdown-content">
      <!-- Attention here, it will use the router link -->
      <!--Here will check if use is admin-->
      <router-link to="/admin" v-if="user.admin">
        <i class="fa fa-cogs"></i> Administracao
      </router-link>
      <a href @click.prevent="logout">
        <i class="fa fa-sign-out"></i> Sair
      </a>
    </div>

  </div>
</template>

<script>

//Get key from localStorage
import {userKey} from '@/global'

//Acces state data and methods
import { mapState } from "vuex";

//This is and Image for Profile
import Gravatar from "vue-gravatar";

export default {
  name: "UserDropdown",
  components: { Gravatar },
  //Get user from state manager
  computed: mapState(["user"]),
  methods: {
    logout() {
      localStorage.removeItem(userKey)
      this.$store.commit('setUser', null)
      this.$router.push({name: 'auth'})
    }
  }
};
</script>

<style>
.user-dropdown {
  position: relative;
  height: 100%;
}

.user-button {
  display: flex;
  align-items: center;
  color: #fff;
  height: 100%;

  padding: 0px 20px;
}

.user-dropdown:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.user-dropdown-img {
  margin: 0px 10px;
}

.user-dropdown-img > img {
  max-height: 37px;
  border-radius: 5px;
}

.user-dropdown-content {
  right: 0px;
  background-color: #f9f9f9;
  min-width: 180px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 1;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s linear;
}

/* When "hover" keep the original style and overwrite these ones */
.user-dropdown:hover .user-dropdown-content {
  visibility: visible;
  opacity: 1;
}

.user-dropdown-content a {
  text-decoration: none;
  color: #000;
  padding: 10px;
}

.user-dropdown-content a:hover {
  background-color: #ededed;
  color: #000;
  text-decoration: none;
}
</style>