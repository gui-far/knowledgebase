import Vue from 'vue'

export const baseApiUrl = 'http://localhost:3000'

//The ideia here is to detect backend error and show the "toast message"
export function showError(e) {
    
    if(e && e.resposne && e.response.data) {
        //When error comes inside data
        Vue.toasted.global.defaultError({msg: e.response.data})
    } else if (typeof e === "string") {
        //"When error comes"
        Vue.toasted.global.defaultError({msg: e})
    } else {
        //When nothing happens, use default message
        Vue.toasted.global.defaultError()
    }
}

//There is no problem exporting the same "objects"
export default { baseApiUrl, showError }