<template>
  <div class="flex justify-center pt-4 bg-gray-800 h-screen text-white overflow-auto">
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
        },
        {
          name: 'Todos',
          route: '/todos',
        }
      ]
    }
  }
}
</script>
<style>
input,
select {
  border: 1px solid black;
  border-radius: 0.25rem;
  padding: 0px, 2px;
  color: black;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
  border-radius: 1px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>