<script setup>

    import { inject } from 'vue';

    const data = inject('infoExtra');
</script>

<template>
    <p>Info Extra</p>
    <p>{{ data }}</p>
    
</template>

<style scoped>

</style>