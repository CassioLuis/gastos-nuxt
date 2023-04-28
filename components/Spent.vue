<template>
  <div class="font-semibold text-sm">
    <table class="h-full w-full rounded">
      <thead class="text-lg text-left pb-4">
        <tr class="border-b border-gray-600">
          <th class="w-1"></th>
          <th class="w-1">Data</th>
          <th class="w-10">Descrição</th>
          <th class="w-1">Categoria</th>
          <th class="w-1 text-center">Parc.</th>
          <th class="w-10 text-center">Valor</th>
          <th class="w-1"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in spentList" class="h-12 border-b border-gray-600">
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
  methods: {
    convertToCurrency(value) {
      return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },
    ...mapMutations({
      isACreditCardSpent: 'spents/isACreditCardSpent',
      remove: 'spents/remove'
    })
  }
}
</script>