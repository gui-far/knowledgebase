<template>
    <div class="page-title">
        <h1><i v-if="icon" :class="icon"></i> {{main}} </h1>
        <h2>{{sub}}</h2>
        <hr>
    </div>
</template>

<script>

//This is the page title compoennt, just the title and subtitle
//These values will be passed trought props from the "father" component

export default {
    name: 'PageTitle',
    props: ['icon','main','sub']
}
</script>

<style>

    .page-title h1 {
        margin: 0px
    }

    .page-title h2 {
        color: #777;
        margin-top: 5px;
        font-size: 1.3rem;
    }

</style>