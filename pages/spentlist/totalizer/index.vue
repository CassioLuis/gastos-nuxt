<template>
  <div>
    <div class="flex flex-col justify-between h-full">
      <p class="text-center border-b border-gray-500 text-lg">Resumo</p>
      <div class="grow pt-4">
        <TotalizerCard :totalizer="totalizerSpents" />
      </div>
      <div>
        <p class="text-center border-b border-gray-500 mb-4">Totais</p>
        <div class="flex justify-between">
          <span>Meus Debitos (-)</span>
          <span>{{ sumDebits(false) }}</span>
        </div>
        <div class="flex justify-between">
          <span>Debitos Outros (-)</span>
          <span>{{ sumDebits(true) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TotalizerCard from '../../../components/TotalizerCard.vue';
import { mapGetters } from 'vuex'

export default {
  components: { TotalizerCard },
  // layout: 'default',
  props: {
    month: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      menuItens: [
        {
          name: 'Resumo',
          route: '/spentlist/totalizer',
        },
        {
          name: 'Grafico',
          route: '/spentlist/grafico',
        }
      ]
    }
  },
  methods: {
    convertToCurrency(value) {
      return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },
    isCategoryOfOthers(param) {
      return this.getCategories.filter(item => item.otherPeople === param).map(item => item.name)
    },
    sumDebits(param) {
      const debits = this.totalizerSpents.reduce((acc, item) => {
        if (item.category.toLowerCase().includes('dividir')) return acc + item.spentValue / 2;
        if (this.isCategoryOfOthers(param).includes(item.category)) return acc + item.spentValue
        return acc
      }, 0)
      return this.convertToCurrency(debits)
    },
  },
  computed: {
    spents() {
      return this.$store.state.spents.spentList.filter(spent => spent.date.substring(0, 7) === this.month)
    },
    sumTotal() {
      return this.spents.filter(spent => spent.creditCard).reduce((acc, spent) => acc + this.convertToNumber(spent.spentValue), 0)
    },
    totalizerSpents() {
      return Object.entries(
        this.spents.reduce((acc, spent) => {
          const category = spent.category;
          const spentValue = Number(spent.spentValue);
          acc[category] = (acc[category] || 0) + spentValue;
          return acc;
        }, {})
      ).map(([category, spentValue]) => ({ category, spentValue }));
    },
    ...mapGetters({
      getCategories: 'categories/getCategories'
    })
  }
}


</script>