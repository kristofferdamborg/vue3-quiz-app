<template>
  <main>
    <h1 class="text-2xl text-gray-500 font-semibold">Choose difficulty</h1>
    <div class="space-y-4 mt-6">
      <RouterLink
        v-for="diff in difficultyNavItems"
        :key="diff.name"
        :to="{ name: 'quiz', params: { difficulty: diff.route } }"
        class="flex cursor-pointer rounded-lg border bg-white px-6 p-4 shadow-sm text-gray-500 font-medium hover:bg-indigo-50 hover:border-indigo-300"
      >
        {{ diff.name }}
      </RouterLink>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { difficultyNavItems } from '@/utils/navigation'
</script>
