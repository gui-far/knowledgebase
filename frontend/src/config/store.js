//This Vuex is the state manager

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    //State: Will honde some app states
    state: {
        isMenuVisible: true,
        user: {
            name: 'User Mock',
            email: 'mock@mock.com'
        }
    },
    mutations: {
        //Function to change isMenuVisible between true and false
        toggleMenu(state, isVisible) {
            
            //when isVisible is defined by the function call, alternate
            if(isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else { //when isVisible is defined (true or false), change
                state.isMenuVisible = isVisible
            }
        }
    }
})