//Vue...
import Vue from 'vue'

//This is that warning messages that app show to users
import Toasted from 'vue-toasted'

//Will se fontAwesome icons
Vue.use(Toasted, {
    iconPack: 'fontawesome',
    duration: 3000
})

//This is the default behaviour when success
Vue.toasted.register(
    'defaultSuccess',
    //With this we'll be able the use a custom message
    //If message (paylod) is not informed, use the default message
    payload => !payload.msg ? 'Operação realizada com Sucesso!' : payload.msg,
    {type: 'success', icon: 'check'}
)

//!!!This ERROR is being used inside global.js

//This is the default behaviour when error
Vue.toasted.register(
    'defaultError',
    //With this we'll be able the use a custom message
    //If message (paylod) is not informed, use the default message
    payload => !payload.msg ? 'Opps...Erro inesperado.' : payload.msg,
    {type: 'error', icon: 'times'}
)