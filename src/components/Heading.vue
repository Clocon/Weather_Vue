<template>
  <h1 class="heading" @click="titleClicked">{{text}}</h1>
</template>

<script>
  export default{
    name: 'Heading',
    props: {
      text:{
        type: String,
        required: true
      }
    },
    methods:{
      titleClicked(){
        this.$emit('clicked')
      }
    }
  }
</script>

<style scoped>
  .heading{
    font-size: 24px;
    font-weight: 800;
  }
</style>