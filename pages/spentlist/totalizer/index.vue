<template>
  <div>
    <div class="flex flex-col justify-between h-full">
      <p class="text-center border-b border-gray-700 text-lg">Resumo</p>
      <div class="grow pt-4">
        <TotalizerCard :totalizer="totalizerSpents" />
      </div>
      <div>
        <p class="text-center border-b border-gray-700 mb-4">Totais</p>
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
import { v4 as uuidv4 } from 'uuid';


export default {
  components: { TotalizerCard },
  props: {
    month: {
      type: String,
      required: true
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
        if (item.category.toLowerCase().includes('dividir')) return acc + item.totalSpent / 2;
        if (this.isCategoryOfOthers(param).includes(item.category)) return acc + item.totalSpent
        return acc
      }, 0)
      return this.convertToCurrency(debits)
    },
  },
  computed: {
    spents() {
      return this.$store.state.spents.spentList.filter(spent => spent.date.substring(0, 7) === this.month)
    },
    totalizerSpents() {
      const categories = [...new Set(this.spents.map(spent => spent.category))];

      const totalizer = categories.map(category => {
        const spentsForCategory = this.spents.filter(spent => spent.category === category);
        const totalSpentForCategory = spentsForCategory.reduce((acc, spent) => acc + Number(spent.spentValue), 0);
        return {
          id: uuidv4(),
          category: category,
          totalSpent: totalSpentForCategory,
          expanded: false,
          spents: spentsForCategory
        };
      });
      return totalizer
    },
    ...mapGetters({
      getCategories: 'categories/getCategories'
    })
  },
  watch: {
    spents() {
      this.$store.commit('summary/addSummary', this.totalizerSpents);
    }
  }
}
</script>