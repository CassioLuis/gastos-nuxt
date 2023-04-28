<template>
  <div class="font-semibold text-sm">
    <table class="h-full w-full rounded">
      <thead class="text-lg text-left pb-4">
        <tr class="border-b border-gray-600">
          <th class="cursor-pointer w-1"></th>
          <th class="align-middle gap-1 cursor-pointer w-1" @click="sortBy('date')">Data<font-awesome-icon desabled :icon="['fas', 'sort-down']" size="xs"/></th>
          <th class="align-middle gap-1 cursor-pointer w-10" @click="sortBy('description')">Descrição<font-awesome-icon :icon="['fas', 'sort-up']" size="xs"/></th>
          <th class="align-middle gap-1 cursor-pointer w-1" @click="sortBy('category')">Categoria<font-awesome-icon :icon="['fas', 'sort-up']" size="xs"/></th>
          <th class="align-middle gap-1 cursor-pointer w-1 text-center" @click="sortBy('quota')">Parc.<font-awesome-icon :icon="['fas', 'sort-up']" size="xs"/></th>
          <th class="align-middle gap-1 cursor-pointer w-10 text-center" @click="sortBy('spentValue')">Valor<font-awesome-icon :icon="['fas', 'sort-up']" size="xs"/></th>
          <th class="cursor-pointer w-1"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in newSortedSpentList" class="h-12 border-b border-gray-600">
          <td class="text-center">
            <input class="cursor-pointer" type="checkbox" :checked="item.creditCard" @change="isACreditCardSpent(item)">
          </td>
          <td class="text-left text-xs text-gray-400">{{ item.presentationDate }}</td>
          <td>{{ item.description }}</td>
          <td>
            <span
              class="grow basis-1 p-1 flex items-center justify-center align-baseline rounded bg-red-400 text-xs font-semibold text-gray-200">{{
                item.category }}</span>
          </td>
          <td class="text-center">{{ item.presentationQuota }} </td>
          <td class="text-right">{{ convertToCurrency(item.spentValue) }} </td>
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
  name: 'Spent',
  props: {
    spentList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      sortKey: '',
      sortDirection: 'asc'
    }
  },
  methods: {
    convertToCurrency(value) {
      return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },
    ...mapMutations({
      isACreditCardSpent: 'spents/isACreditCardSpent',
      remove: 'spents/remove'
    }),
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortDirection = 'asc';
      }
    },
    removerAcentos(texto) {
      return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
  },
  computed: {
    newSortedSpentList() {
      return this.spentList.sort((a, b) => {
        let modifier = 1;
        if (this.sortDirection === 'desc') modifier = -1;
        let aValue = a[this.sortKey] ? this.removerAcentos(a[this.sortKey].toString().toLowerCase()) : '';
        let bValue = b[this.sortKey] ? this.removerAcentos(b[this.sortKey].toString().toLowerCase()) : '';
        if (aValue < bValue) return -1 * modifier;
        if (aValue > bValue) return 1 * modifier;
        return 0;
      });
    }
  }
  ,
  mounted() {
    console.log(this.newSortedSpentList);
  },
}
</script>