<script setup lang="ts"></script>
<template>
  <div class="header-default">
    <div class="logo-default">
      <img src="@/assets/images/logo-default.png" alt="logo-default" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.header-default {
  background-color: var(--bg);
  height: 70px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 3;
  background: var(--bg);
}
.logo-default {
  width: 100%;
  max-width: 1182px;
  img {
    width: 200px;
  }
}
</style>
