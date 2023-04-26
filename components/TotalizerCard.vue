<template>
  <div>
    <div v-for="totalize in totalizer" class="flex justify-between py-2 px-4 border rounded border-gray-600 mb-2">
      <span>{{ totalize.category }}</span>
      <span>{{ convertToCurrency(totalize.spentValue) }}</span>
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
  }
}
</script>