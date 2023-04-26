<template>
  <div class="font-semibold text-sm">
    <div v-for="item in spentList" :key="item.id" 
      class="flex py-3 px-1 border-b border-gray-600 justify-between items-center">
      <input class="cursor-pointer" type="checkbox" :checked="item.creditCard" @change="isACreditCardSpent(item)">
      <span class="pl-2 text-center text-xs text-gray-400">{{ item.presentationDate }}</span>
      <span class="grow basis-1 px-4 text-left flex flex-wrap whitespace-pre-wrap">{{ item.description }}</span>
      <span class="grow basis-1 p-1 flex items-center justify-center align-baseline rounded bg-red-400 text-xs font-semibold text-gray-200">{{ item.category }}</span>
      <span class="grow basis-1 pl-4 text-right">{{ convertToCurrency(item.spentValue) }}</span>
      <font-awesome-icon class="px-2 cursor-pointer text-red-400" :icon="['fas', 'trash-can']" @click="remove(item)" />
    </div>
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