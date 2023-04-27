<template>
  <div class="p-4 border rounded w-full">
    <input @keyup.enter="addCategory" v-model="category.name" placeholder="Digite uma categoria e pressione enter!"
      class="w-full p-2 text-black rounded mb-4">
    <table class="w-full rounded">
      <thead class="text-xl border-b border-gray-600">
        <tr>
          <th>Outros</th>
          <th class="text-left">Descrição</th>
          <th>Remover</th>
        </tr>
      </thead>
      <tbody class="text-sm">
        <tr v-for="item in categories">
          <td class="text-center">
            <input type="checkbox" class="cursor-pointer" :checked="item.otherPeople" @change="isToAnotherPeopleCategory(item)">
          </td>
          <td>{{ item.name }}</td>
          <td class="text-center">
            <font-awesome-icon class="cursor-pointer text-red-400" :icon="['fas', 'trash-can']" @click="remove(item)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  name: 'spentlist',
  layout: 'default',
  data() {
    return {
      category: {
        name: '',
        otherPeople: false
      }
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories.categoryList
    }
  },
  methods: {
    addCategory() {
      this.$store.commit('categories/addCategory', this.category)
      this.category = {
        name: '',
        otherPeople: false
      }
    },
    ...mapMutations({
      remove: 'categories/remove',
      isToAnotherPeopleCategory: 'categories/isToAnotherPeopleCategory'
    })
  }
}
</script>