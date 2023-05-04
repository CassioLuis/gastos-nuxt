<template>
  <div class="flex w-full gap-3">
    <div class="flex flex-col grow basis-1 gap-3">
      <div class="flex h-16 border rounded border-gray-500 p-1 items-center">
        <font-awesome-icon :icon="['fas', 'chevron-right']" @click="previosMonth"
          class="rotate-180 cursor-pointer text-xl hover:text-gray-100 transition-all px-2 py-4 h-full rounded-r" />
        <DatePicker v-model="month" type="month" value-type class="flex-grow basis-1 h-full text-center cursor-pointer" />
        <font-awesome-icon :icon="['fas', 'chevron-right']" @click="nextMonth"
          class="cursor-pointer text-xl hover:text-gray-100 transition-all px-2 py-4 h-full rounded-r" />
        <div class="flex items-center justify-center flex-grow basis-1 h-full font-semibold">{{
          convertToCurrency(sumTotal) }}</div>
      </div>
      <div class="flex flex-col gap-4 p-4 border rounded border-gray-500">
        <transition>
          <div class="flex flex-col overflow-y-auto h-[500px]">
            <Spent :spent-list="spents" />
          </div>
        </transition>
        <div>
          <SpentAdd />
        </div>
      </div>
    </div>
    <div class="flex flex-col justify-between border-gray-500 flex-grow basis-1 border rounded p-4 font-semibold">
      <div class="pb-2 flex gap-1">
        <NuxtLink v-for="{ name, route, id } in menuItens" :key="id" :to="route" class="btn">
          {{ name }}
        </NuxtLink>
      </div>
      <NuxtChild :month="month" class="grow" />
    </div>
  </div>
</template>
<script>
import SpentAdd from '../components/SpentAdd.vue'
import Spent from '../components/Spent.vue'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/pt-br';
import { mapGetters } from 'vuex'

export default {
  components: { SpentAdd, Spent, DatePicker },
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
    convertDateStringToUTCDate(param) {
      return new Date(
        Date.UTC(
          Number(param.substring(0, 4)),
          Number(param.substring(5, 7)) - 1,
          Number(param.substring(8, 10)),
          12, // hora do dia em UTC (meio-dia)
          0, // minutos em UTC
          0 // segundos em UTC
        ))
    },
    previosMonth() {
      const date = this.convertDateStringToUTCDate(this.month + '-01')
      const getMonth = date.getMonth()
      const previosMonth = date.setMonth(getMonth - 1)
      const previosMonthToDate = new Date(previosMonth)
      const previosMonthToString = previosMonthToDate.toISOString().substring(0, 7)
      this.month = previosMonthToString
    },
    nextMonth() {
      const date = this.convertDateStringToUTCDate(this.month + '-01')
      const getMonth = date.getMonth()
      const nextMonth = date.setMonth(getMonth + 1)
      const nextMonthToDate = new Date(nextMonth)
      const nextMonthToString = nextMonthToDate.toISOString().substring(0, 7)
      this.month = nextMonthToString
    }
  },
  computed: {
    spents() {
      return this.$store.state.spents.spentList.filter(spent => spent.date.substring(0, 7) === this.month)
    },
    sumTotal() {
      return this.spents.filter(spent => spent.creditCard).reduce((acc, spent) => acc + this.convertToNumber(spent.spentValue), 0)
    },
    // totalizerSpents() {
    //   return Object.entries(
    //     this.spents.reduce((acc, spent) => {
    //       const category = spent.category;
    //       const spentValue = Number(spent.spentValue);
    //       acc[category] = (acc[category] || 0) + spentValue;
    //       return acc;
    //     }, {})
    //   ).map(([category, spentValue]) => ({ category, spentValue }));
    // },
    ...mapGetters({
      getCategories: 'categories/getCategories'
    })
  }
}
</script>
<style>
.mx-input {
  @apply h-full w-full cursor-pointer text-center font-semibold text-sm bg-gray-800 text-white rounded border border-gray-600
}

.mx-input-wrapper {
  @apply h-full bg-gray-800
}

.mx-icon-calendar,
.mx-icon-clear {
  @apply text-white
}

.mx-calendar-header,
.mx-calendar {
  @apply bg-gray-800 text-white rounded
}

.mx-calendar-content .cell.active {
  @apply bg-gray-600
}

.cell:hover {
  @apply bg-gray-300
}
</style>