<template>
  <h1 class="heading">{{text}}</h1>
</template>

<script>
  export default{
    name: 'Heading',
    props: {
      text:{
        type: String,
        required: true
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