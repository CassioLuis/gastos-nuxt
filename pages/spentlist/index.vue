<template>
  <div class="flex w-full gap-3">
    <div class="flex flex-col flex-grow basis-1 gap-3">
      <div class="flex h-16 border rounded p-1">
        <date-picker v-model="month" type="month" value-type
          class="flex-grow basis-1 h-full text-center cursor-pointer" />
        <div class="flex items-center justify-center flex-grow basis-1 h-full font-semibold">{{
          convertToCurrency(sumTotal) }}</div>
      </div>
      <div class="flex flex-col gap-1 p-2 flex-grow basis-1 border rounded">
        <div class="flex flex-col gap-1 box-border overflow-y-auto h-[600px]">
          <Spent :spent-list="spents" />
        </div>
        <SpentAdd />
      </div>
    </div>
    <div class="flex flex-col justify-between flex-grow basis-1 border rounded p-4">
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
import SpentAdd from '../../components/SpentAdd.vue'
import Spent from '../../components/Spent.vue'
import DatePicker from 'vue2-datepicker';
import TotalizerCard from '../../components/TotalizerCard.vue';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/pt-br';
import { mapGetters } from 'vuex'

export default {
  components: { SpentAdd, Spent, DatePicker, TotalizerCard },
  name: 'spentlist',
  layout: 'default',
  data() {
    return {
      month: new Date().toISOString().substring(0, 7),
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
    convertToNumber(value) {
      return parseFloat(value)
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
<style>
.mx-input-wrapper,
.mx-input {
  height: 100%;
  width: 100%;
  cursor: pointer;
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
  background-color: rgb(31 41 55);
  color: white;
}

.mx-icon-calendar {
  color: white;
}

.mx-calendar-header,
.mx-calendar {
  background-color: rgb(31 41 55);
  color: white;
}

.mx-calendar-content .cell.active {
  background-color: rgb(75 85 99);
}

.cell:hover {
  background-color: rgb(209 213 219) !important;
}
</style>