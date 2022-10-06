<template>
  <h1 class="heading" @click="titleClicked">{{text}}</h1>
</template>

<script>
export default {
  name: 'Heading',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>