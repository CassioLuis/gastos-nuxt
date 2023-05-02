<template>
  <div>
    <div v-for="totalize in totalizer"
      class="flex flex-col justify-between gap-2 p-1 border rounded border-gray-600 mb-2">
      <div @click="expand(totalize)" class="flex justify-between border rounded border-gray-600 p-2 cursor-pointer">
        <span>{{ totalize.category }}</span>
        <span>{{ convertToCurrency(totalize.totalSpent) }}</span>
      </div>
      <div v-show="totalize.expanded" class="px-2 space-y-2">
        <div v-for="item in totalize.spents" class="flex justify-between">
          <span>{{ item.description }}</span>
          <span class="text-xs">{{ convertToCurrency(item.spentValue) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  name: 'TotalizerCard',
  props: {
    totalizer: {
      type: Array,
      required: true
    }
  },
  methods: {
    convertToCurrency(value) {
      return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },
    ...mapMutations({
      expand: 'summary/expand',
    }),
  }
}
</script>