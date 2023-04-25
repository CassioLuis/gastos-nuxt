<template>
  <div class="p-1 border rounded w-1/2">
    <ul class="w-full">
      <li class="">
        <input @keyup.enter="addTodo" placeholder="Digite uma categoria e pressione enter!" class="w-full p-2">
      </li>
      <li v-for="categorie in categories" :key="categorie" class="flex justify-between items-center p-2">
        <span>{{ categorie }}</span>
        <font-awesome-icon class="cursor-pointer text-red-400" :icon="['fas', 'trash-can']" @click="remove(categorie)" />
      </li>
    </ul>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  name: 'spentlist',
  layout: 'default',

  computed: {
    categories() {
      return this.$store.state.categories.list
    }
  },
  methods: {
    addTodo(e) {
      this.$store.commit('categories/add', e.target.value)
      e.target.value = ''
      console.log(this.categories);
    },
    ...mapMutations({
      remove: 'categories/remove'
    })
  }
}
</script>