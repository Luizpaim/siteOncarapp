<script lang="ts" setup>
import HeaderDefault from './HeaderDefault.vue'
import FooterDefault from './FooterDefault.vue'
</script>
<template>
  <div class="container-default">
    <header>
      <HeaderDefault />
    </header>
    <main class="main-default">
      <RouterView />
    </main>
    <footer class="footer-default">
      <FooterDefault />
    </footer>
  </div>
</template>
<style scoped lang="scss">
.main-default {
  background: var(--default-bg);
  width: 100%;
  padding: 100px 0 100px 0;
}
</style>
não