<template>
    <!-- With this v-show, the menu will hide -->
    <!-- But the content will not "fill" the blank space -->
    <!-- So inside App.js, we need to aply a class (that will "fill" the blank space) to the Content component according to isMenuVisible -->
    <aside class="menu" v-show="isMenuVisible">
        
    </aside>
</template>

<script>

//This will enable the access to the app state directly
import { mapState } from 'vuex'

export default {
    name: 'Menu',
    //Here we can define wich functions will be accessed
    computed: mapState(['isMenuVisible'])
}
</script>

<style>
    .menu {
        grid-area: menu;
        background: linear-gradient(to right, #232526, #414345);
        
        display: flex;
        flex-direction: column; /*Default value for display: flex is row, but here we need column*/
        flex-wrap: wrap;    /*Will break the line if the element reachs minimun width (make sens when using "flex-grow" and "min-width")*/

    }
</style>