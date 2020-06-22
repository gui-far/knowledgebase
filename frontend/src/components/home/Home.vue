<template>
    <div class="home">
        <PageTitle icon = "fa fa-home" main="Dashboard"
        sub="Base de Conhecimento" />
        <div class="stats">
            <Stat title="Categorias" :value="stat.categories" icon="fa fa-folder" color="#d54d50" />
            <Stat title="Artigos" :value="stat.categories" icon="fa fa-file" color="#3bc480" />
            <Stat title="Usuário" :value="stat.users" icon="fa fa-user" color="#3282cd" />
        </div>
    </div>
</template>

<script>

//IMport Title and Stat compoennt
import PageTitle from '../template/PageTitle'
import Stat from './Stat'

//Import axios and baseApiUrl to retrieve data from backend
//Remember that this stats use mongoDB
import axios from 'axios'
import { baseApiUrl } from '@/global'


export default {
    name: 'Home',
    components: {PageTitle, Stat},
    data: function() {
        return {
            //Stats data will be hold here
            stat: {}
        }
    },
    methods: {
        getStats() {
         //Get stats data
         axios.get(`${baseApiUrl}/stats`).then(res => this.stat=res.data)
         .catch(err => console.log(err))
        }
    },
    mounted() {
        //Run the getStats when component is mounted
        this.getStats();
    }
}

</script>

<style>
    .stats {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;   
    }
</style>