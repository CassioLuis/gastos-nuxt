<template>
  <div class="flex justify-center pt-4 bg-gray-800 h-screen text-gray-300 font-roboto antialiased">
    <div class="flex flex-col justify-start w-[1200px]">
      <div class="pb-2 flex gap-1 w-full">
        <NuxtLink v-for="{ name, route, id } in menuItens" :key="id" :to="route" class="btn">
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
          route: '/spentlist/totalizer',
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

.mx-datepicker {
  width: 100% !important;
}

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
  @apply bg-gray-500 rounded-sm box-border
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-600
}

.btn {
  @apply cursor-pointer flex items-center rounded px-4 border border-gray-500 hover:border-gray-400 hover:rounded-sm bg-gray-800 hover:bg-gray-700 hover:text-gray-100 transition-all h-8
}

.input {
  @apply mb-2 h-8 px-2 bg-gray-800 text-white border rounded border-gray-600 cursor-pointer
}
</style>
