<template>
  <div>
    <div v-for="totalize in totalizer" class="flex flex-col justify-between gap-4 p-1 border rounded border-gray-600 mb-2">
      <div class="flex justify-between border rounded border-gray-600 p-2 cursor-pointer">
        <span>{{ totalize.category }}</span>
        <span>{{ convertToCurrency(totalize.totalSpent) }}</span>
      </div>
      <div v-for="item in totalize.spents" class="flex justify-between">
        <span>{{ item.description }}</span>
        <span class="text-xs">{{ convertToCurrency(item.spentValue) }}</span>
      </div>
    </div>
  </div>
</template>
<script>
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
    }
  },
  computed: {
    newTotalizer() {
      return this.totalizer;
    }
  },
  mounted() {
    console.log(this.newTotalizer);
  }
}
</script>