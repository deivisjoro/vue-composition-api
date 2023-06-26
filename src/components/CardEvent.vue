<script setup>

  import ExtraInfo from './ExtraInfo.vue';


  defineProps({
    name: String,
    capacity: Number,
    max: Number,
    spacesLeft: Number,
    guests: Array,
  })

  const emisores = defineEmits(['onEventHijo']);

  setTimeout(()=>{
    emisores('onEventHijo', 'Texto desde el hijo CardEvent.vue');
  }, 4000)

</script>

<template>

  <div class="card">
    <h2>Nombre del evento: {{ name }}</h2>
    <p>Capacidad (max {{max}}): {{ capacity }}</p>
    <p>Espacios disponibles: {{ spacesLeft }}</p>
    <ul>
      <li v-for="(guest, i) in guests" :key="i+guest.nombre">{{ guest.nombre }}</li>
    </ul>
    <ExtraInfo />
  </div>
    
</template>

<style scoped>

.card{
    padding: 10px;
    margin: 10px 0;
}

</style>