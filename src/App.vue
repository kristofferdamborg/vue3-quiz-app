<template>
  <FadeTransition>
    <NavBar v-if="authStore.isLoggedIn" />
  </FadeTransition>
  <UIContainer class="pt-28 pb-12">
    <RouterView v-slot="{ Component }">
      <Transition
        enter-active-class="duration-100 ease-out"
        enter-from-class="transform opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="transform opacity-0"
        mode="out-in"
      >
        <component :is="Component" />
      </Transition>
    </RouterView>
  </UIContainer>
</template>

<script lang="ts" setup>
import NavBar from '@/components/NavBar.vue'
import UIContainer from './components/ui/UIContainer.vue'
import { useAuthStore } from '@/stores/auth'
import FadeTransition from './components/transitions/FadeTransition.vue'

const authStore = useAuthStore()
</script>
