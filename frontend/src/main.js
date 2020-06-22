//Icons
import 'font-awesome/css/font-awesome.css'

import Vue from 'vue'
import App from './App'

//Bootstrap
import './config/bootstrap'

//Toasted
import './config/msgs'

//State manager
import store from './config/store'

//Router (manage navigation)
import router from './config/router'

Vue.config.productionTip = false

// TEMPORARIO
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MywibmFtZSI6Ikd1aSBGIEZhciAiLCJhZG1pbiI6MSwiaWF0IjoxNTkyNjY4OTE1LCJleHAiOjE1OTI5MjgxMTV9.M8GXq8GuUagz77SwtY0iE6YMy4Qrv5DU_jdoUkkjBMk'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')