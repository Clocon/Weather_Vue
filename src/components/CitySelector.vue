<template>
  <select class="border-none" id="ciudades" :value="value" @change.prevent="$emit('input', $event.target.value)" >
    <option v-for="item in cities" :key="item.id" value="item.id" >{{item.label}}</option>
  </select>
</template>

<script>
  export default{
    name: 'CitySelector',
    props:{
      value:{
        type:String,
        default: 'Málaga'
      }
    },
    data(){
      return{
        cities: [
        {id:"Málaga", label:"Málaga"},
        {id:"Cádiz",  label:"Cádiz"},
        {id: "Córdoba",label:"Córdoba"},
        {id: "Almería",label:"Almería"},
        {id: "Sevilla",label:"Sevilla"},
        {id: "Jaen",label:"Jaen"},
        {id: "Granada",label:"Granada"},
        {id: "Huelva",label:"Huelva"}
        ]
      }
    }
  }
</script>