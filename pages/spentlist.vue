<template>
  <div class="flex w-full gap-3">
    <div class="flex flex-col flex-grow basis-1 gap-3">
      <div class="flex h-16 border rounded p-1">
        <date-picker v-model="month" type="month" value-type class="flex-grow basis-1 h-full text-center cursor-pointer" />
        <div class="flex items-center justify-center flex-grow basis-1 h-full font-semibold">{{ convertToCurrency(sumTotal) }}</div>
      </div>
      <div class="flex flex-col gap-1 p-2 flex-grow basis-1 border rounded">
        <div class="flex flex-col gap-1 box-border overflow-y-auto h-[600px]">
          <Spent :spent-list="spents" class="space-y-1" />
        </div>
        <SpentAdd />
      </div>
    </div>
    <div class="flex-grow basis-1">
      <div class="border rounded h-full"></div>
    </div>
  </div>
</template>
<script>
import SpentAdd from '../components/SpentAdd.vue'
import Spent from '../components/Spent.vue'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/pt-br';

export default {
  components: { SpentAdd, Spent, DatePicker },
  name: 'spentlist',
  layout: 'default',
  data() {
    return {
      month: new Date().toISOString().substring(0, 7)
    }
  },
  methods: {
    convertToCurrency(value) {
      return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },
    convertToNumber(value) {
      return parseFloat(value)
    }
  },
  computed: {
    spents() {
      const spents = this.$store.state.spents.spentList.filter(spent => spent.date.substring(0, 7) === this.month)

      // const newSpents = spents.map(element => {
      //   const convertedDate = new Date(Date.UTC(
      //     Number(element.date.substring(0, 4)),
      //     Number(element.date.substring(5, 7)) - 1,
      //     Number(element.date.substring(8, 10)),
      //     12, // hora do dia em UTC (meio-dia)
      //     0, // minutos em UTC
      //     0 // segundos em UTC
      //   ));
      //   const dateToString = convertedDate.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' })
      //   const regex = /(\d{1,2}) de (\w+)/i;
      //   const [_, day, month] = regex.exec(dateToString);

      //   return {...element, date: `${day} ${month.toUpperCase()}.` }
      // });
      // console.log(newSpents);
      return spents
    },
    sumTotal() {
      return this.spents.filter(spent => spent.creditCard).reduce((acc, spent) => acc + this.convertToNumber(spent.spentValue), 0)
    }
  },
  watch: {
    month() {
      console.log(this.month);
    }
  }
}
</script>
<style>
.mx-input-wrapper,
.mx-input{
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
.mx-calendar{
  background-color: rgb(31 41 55);
  color: white;
}
.mx-calendar-content .cell.active {
  background-color: rgb(75 85 99);
}
.cell:hover{
  background-color: rgb(209 213 219) !important;
}
</style>