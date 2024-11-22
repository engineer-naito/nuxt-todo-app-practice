<script setup>
const count = ref("0");
</script>

<template>
  <div
    flex="~ col"
    items-center
    justify-center
    h-screen
    text-4xl
    font-bold
    text-green-600
  >
    <div>Hello World!</div>
    <div>{{ count }}</div>
  </div>
</template>
