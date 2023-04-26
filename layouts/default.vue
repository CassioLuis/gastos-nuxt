<template>
  <div class="flex justify-center pt-4 bg-gray-800 h-screen text-white overflow-auto font-roboto antialiased">
    <div class="flex flex-col justify-start box-border w-[1000px]">
      <div class="pb-2 flex gap-1 w-full">
        <NuxtLink v-for="{ name, route, id } in menuItens" :key="id" :to="route"
          class="cursor-pointer border rounded px-2">
          {{ name }}
        </NuxtLink>
      </div>
      <Nuxt />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuItens: [
        {
          name: 'Gastos',
          route: '/spentlist',
        },
        {
          name: 'Categorias',
          route: '/categories',
        }
      ]
    }
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Domine&family=Roboto&display=swap');

/* width */
::-webkit-scrollbar {
  @apply w-2 rounded
}

/* Track */
::-webkit-scrollbar-track {
  @apply bg-gray-800
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  @apply bg-gray-500 rounded-sm
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-600
}
</style>