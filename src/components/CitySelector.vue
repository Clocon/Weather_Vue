<template>
  <select class="border-none" id="city" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
    <option v-for="item in options" :key="item.id" :value="item.id">{{item.label}}</option>
  </select>
</template>

<script>
export default {
  name: 'CitySelector',
  props: {
    modelValue: {
      type: String,
      default: 'Málaga'
    },
    options: {
      type: Array
    }
  }
  /*    data(){
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
     } */
}
</script>