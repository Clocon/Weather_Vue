<template>
  <select class="border-none" id="selector" :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)">
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
      type: Array,
      required: true
    }
  }
}
</script>