<template>
  <main class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <h1 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Sign in - Quiz App
      </h1>
      <form class="mt-8 space-y-6 rounded-md shadow-md px-4 py-6 bg-white" @submit.prevent="login">
        <div class="space-y-4">
          <UIInput
            v-model="email"
            type="email"
            name="email"
            label="E-mail"
            autocomplete="email"
            required
            autofocus
          />
          <UIInput
            v-model="password"
            type="password"
            name="password"
            label="Password"
            autocomplete="password"
            required
          />
        </div>
        <FadeTransition>
          <UIAlert v-if="error" type="error">
            {{ error }}
          </UIAlert>
        </FadeTransition>
        <div>
          <UIButton type="submit" :disabled="isLoading" class="w-full">
            {{ isLoading ? 'Signing in...' : 'Sign in' }}
          </UIButton>
        </div>
      </form>
    </div>
  </main>
</template>

<script lang="ts" setup>
import UIInput from '@/components/ui/UIInput.vue'
import UIButton from '@/components/ui/UIButton.vue'
import UIAlert from '@/components/ui/UIAlert.vue'
import FadeTransition from '@/components/transitions/FadeTransition.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter, useRoute } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

const authStore = useAuthStore()

const router = useRouter()
const route = useRoute()

async function login() {
  try {
    error.value = ''
    isLoading.value = true

    await authStore.login()

    const redirectQuery = route.query.redirect as string

    if (redirectQuery) {
      router.push(redirectQuery)
    } else {
      router.push({ name: 'home' })
    }
  } catch {
    error.value = 'Something went wrong. Please try again.'

    isLoading.value = false
  }
}
</script>
