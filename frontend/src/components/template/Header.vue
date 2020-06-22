<template>
  <header class="header">
    <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
      <i class="fa fa-lg" :class="icon"></i>
    </a>

    <h1 class="title"><router-link to="/">{{title}}</router-link></h1>

    <UserDropdown v-if="!hideUserDropdown" />

  </header>
</template>

<script>

import UserDropdown from './UserDropdown'

export default {
  name: "Header",
  components: {
    UserDropdown
  }, 
  props: {
    title: String,
    hideToggle: Boolean,
    hideUserDropdown: Boolean
  },
  computed: {
    icon() {
      //This is another type of "state access"
      //Will change the 
      return this.$store.state.isMenuVisible ? "fa-angle-left" : "fa-angle-down";
    }
  },
  methods: {
    //This function will be called by the toggle button and wil change the menu visible state
    //The element's "v-if" render according to the state
    toggleMenu() {
      this.$store.commit('toggleMenu')
    }
  }
};
</script>

<style>
.header {
  grid-area: header;
  background: linear-gradient(to right, #1e469a, #49a7c1);

  display: flex;            /*Flexible*/
  justify-content: center;  /* X align*/
  align-items: center;      /* Y align */
}

.title {
  font-size: 1.2rem;    /* Size */
  color: #ffffff;     /* Color*/
  font-weight: 100;     /*"Thickness*/
  flex-grow: 1;         /*This wil make the element "grow" to "Fill" the parent element, other elements will keep their size, or respect the proportion if they also have flex-grow*/
  text-align: center;   /*Since this element will "grow", we want it centered*/
}

.title a {
  color: #fff;                /* Link font color*/
  text-decoration: none;        /* Avoid that "underlive" when link is hovered */
}

.title a:hover {
  color: #fff;                /* Link font color*/
  text-decoration: none;        /* Avoid that "underlive" when link is hovered */
}

header.header > a.toggle {      /* Apply to "a" with toggle class*/
  width: 60px;
  height: 100%;
  color: #fff;                /*justify-self: flex-start; */
  text-decoration: none;        /* Remove underline when hovered*/

  display: flex;                /*Flexible*/
  justify-content: center;      /* X - align */
  align-items: center;          /* Y - align */
}

header.header > a.toggle:hover {
  background-color: rgba(0, 0, 0, 0.2); /* Hovered effect */
}
</style>