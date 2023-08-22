<script setup lang="ts"></script>

<template>
  <RouterView />
  <Toast :breakpoints="{ '920px': { width: '100%', right: '0', left: '0' } }" />
</template>

<style scoped></style>
