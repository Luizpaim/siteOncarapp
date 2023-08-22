<script setup lang="ts">
import { reactive } from 'vue'
import iconFacebook from '@/assets/images/logo-facebook.svg'
import iconInstagram from '@/assets/images/logo-instagram.svg'
import iconLinkedin from '@/assets/images/logo-linkedin.svg'
import iconTwiter from '@/assets/images/logo-twiter.svg'

const iconsSocial: string[] = reactive([iconFacebook, iconInstagram, iconLinkedin, iconTwiter])
</script>
<template>
  <div class="footer-default">
    <div class="container-footer-default">
      <div class="image-footer">
        <img src="../assets/images/logo-secondary.svg" alt="" />
      </div>
      <div class="socials">
        <img class="image-social" v-for="item of iconsSocial" :src="item" />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.footer-default {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20vh;
  background-color: var(--s2);
  position: absolute;
}
.container-footer-default {
  width: 100%;
  max-width: 1182px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.image-social {
  margin-right: 20px;
  cursor: pointer;
}
</style>
