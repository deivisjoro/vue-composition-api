<script setup>
  import { ref, reactive, toRefs, computed, watch, watchEffect, onMounted, onUpdated, onRenderTracked, provide } from 'vue';
  import CardEvent from './components/CardEvent.vue';
  import getInvitado, { empleados } from './myApi';

  //esto es como data en option api
  let name = ref('La fiesta de pepito');
  let capacity = ref(10);
  const guests = ref(empleados);//la lista de los invitados de la primera fiesta
  const empleado = ref(""); //almacena los resultados de la busqueda
  const searchInput = ref("");//referencia para el input de busqueda, esta seteado como un v-model en el elemento

  const invitado = ref(); //referencia del input para agregar invitados, esta seteado con ref en el elemento

  const dato = ref("Dato inicial desde el padre");
  provide('infoExtra', dato);
  setTimeout(()=>{
    dato.value = 'Padre cambiando dato al nieto';
  }, 2000);

  const max1 = ref(20);
  const max2 = ref(25);

  const myData = reactive({
    nombre: 'La rumba',
    capacidad: 15,
    invitados: [{nombre: 'Maria'}, {nombre: 'Jose'}, {nombre: 'Pedro'}, {nombre: 'Luisa'}],
    //puedo tener una funcion dentro del objeto o por fuera tambien
    espaciosDisponibles: computed(()=>{
      return myData.capacidad - myData.invitados.length;
    })
  })

  //por sino quiero utilizar myData.propiedad en la plantialla
  let { nombre, capacidad, invitados, espaciosDisponibles } = toRefs(myData);

  //esto seria methods
  const addCapacity = () => {
    capacity.value++;
    capacidad.value++;
  }

  const addInvitado = () => {
    const dato = { nombre:  invitado.value.value}
    myData.invitados.push(dato);
  }

  //propiedades computadas
  const spacesLeft = computed(()=>{
    return capacity.value - guests.value.length;
  })

  //arriba un ejemplo de una propiedad computada dentro del objeto


  // watch()
  //se puede observar un solo valor o varios
  //para uno solo se recibe solo la variable y los datos new y old serian variables normales, no arrays
  watch([capacity, capacidad], (newVal, oldVal)=>{
    //newVal[0] valor actualizado de capacity
    //newVal[1] valor actualizado de capacidad
    //oldVal[0] valor anterior de capacity
    //oldVal[1] valor anterior de capacidad
    if(newVal[1]>25){
      console.log('No puedes agregar mas de 25 cupos en la segunda fiesta')
      capacidad.value = 25;
    }

    if(newVal[0]>20){
      console.log('No puedes agregar mas de 20 cupos en la primera fiesta')
      capacity.value = 20;
    }
  })

  //watch Effect
  watchEffect(()=>{
    empleado.value = getInvitado(searchInput.value);
  })
  
  setTimeout(()=>{
    name.value = 'otro nombre';
    capacity.value++;
    myData.nombre = 'La fiesta';
    myData.capacidad += 5;
    myData.invitados[1].nombre = 'Josefa';
    myData.invitados.push({nombre: 'Deivis'});
  }, 3000);

  /*
    como se utilizaba en option api y ahora en composition api
    beforeCreate y created es el mismo codigo que se encuentra en setup
    mounted, se ejecuta llamando el metodo onMounted
    beforeUpdate -> onBeforeUpdate
    update -> onUpdate
    beforeDestroy -> onBeforeUnmount
    destroyed -> onUnmounted

    eventos
    activated -> onActivated
    deactivated -> onDeactivated
    errorCaptured -> onErrorCaptured

    nuevos eventos
    onRenderTracked
    onRenderTriggered

  */

  //ciclo de vida, algunos ejemplos
  onMounted(()=>{
    console.log('Elemento montado');
  })

  onUpdated(()=>{
    console.log('Elemento actualizado');
  })

  onRenderTracked((elemento)=>{
    //rastrea todos los elementos que hacen que la ui se renderice
    //console.log(elemento);
  })

  let texto = ref('texto desde el padre app.vue');

</script>

<template>

  <p>
    {{ texto }}
  </p>
  <hr>
  <CardEvent 
    :name="name" 
    :capacity="capacity" 
    :max="max1" 
    :spacesLeft="spacesLeft" 
    :guests="guests"
    @onEventHijo="texto = $event"
  >
  </CardEvent>
  <hr>
  <CardEvent 
    :name="nombre" 
    :capacity="capacidad" 
    :max="max2" 
    :spacesLeft="espaciosDisponibles" 
    :guests="invitados"
  >
  </CardEvent>
  <hr>
  <div>
    <button @click="addCapacity">Add Capacity</button> 
    <input ref="invitado" type="text"> 
    <button @click="addInvitado">Add Invitado</button> 
  </div>
  <hr>
  <div>
    <div>
      Buscar invitado primera fiesta: <input type="text" v-model="searchInput">
    </div>
    <div>
      {{ empleado }}
    </div>
  </div>
  
</template>

<style scoped>
  p, button{
    margin: 10px 0;
  }
</style>
