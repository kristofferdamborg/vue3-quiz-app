<template>
  <Disclosure as="nav" class="bg-gray-800 fixed top-0 w-full z-10" v-slot="{ open, close }">
    <UIContainer>
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <RouterLink
              :to="{ name: 'home' }"
              class="font-bold text-lg text-indigo-400"
              @click="close"
            >
              Quiz App
            </RouterLink>
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <RouterLink
                v-for="diff in difficultyNavItems"
                :key="diff.name"
                activeClass="bg-gray-900 text-white"
                class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                :to="{ name: 'quiz', params: { difficulty: diff.route } }"
              >
                {{ diff.name }}
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:block">
          <div class="flex items-center">
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton
                  class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span class="sr-only">Open user menu</span>
                  <EllipsisVerticalIcon class="block h-6 w-6 text-gray-300" aria-hidden="true" />
                </MenuButton>
              </div>
              <Transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem v-slot="{ active }" @click="logout">
                    <button
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block w-full text-left px-4 py-2 text-sm text-gray-700'
                      ]"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </div>
        <div class="-mr-2 flex sm:hidden">
          <DisclosureButton
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </UIContainer>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <RouterLink
          v-for="diff in difficultyNavItems"
          :key="diff.name"
          :to="{ name: 'quiz', params: { difficulty: diff.route } }"
          custom
          v-slot="{ href, navigate, isActive }"
        >
          <DisclosureButton
            as="a"
            :href="href"
            :class="[
              { 'bg-gray-900 px-3 text-white': isActive },
              'block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
            ]"
            @click="navigate"
          >
            {{ diff.name }}
          </DisclosureButton>
        </RouterLink>
      </div>
      <div class="border-t border-gray-700 mt-3 pt-4 pb-3 px-2">
        <DisclosureButton
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
          @click="logout"
        >
          Sign out
        </DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script lang="ts" setup>
import UIContainer from './ui/UIContainer.vue'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/vue'
import { Bars3Icon, EllipsisVerticalIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { difficultyNavItems } from '@/utils/navigation'

const authStore = useAuthStore()

const router = useRouter()

function logout() {
  authStore.logout()

  router.push({ name: 'login' })
}
</script>
