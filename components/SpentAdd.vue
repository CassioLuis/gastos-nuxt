<template>
  <div class="w-full">
    <div class="flex flex-col gap-2 border-t pt-4 p-2" v-show="showForm">
      <div class="flex gap-2">
        <div class="flex flex-col grow basis-1">
          <label for="date">Data:</label>
          <!-- <input id="date" type="date" v-model="spent.date" class="border text-center mb-2 h-8 px-2"> -->
          <date-picker id="date" v-model="spent.date" valueType="format"
            class="w-full text-center mb-2 h-8"></date-picker>
          <label for="description">Descrição:</label>
          <input id="description" type="text" v-model="spent.description"
            class="border-white mb-2 h-8 px-2 bg-gray-800 text-white">
        </div>
        <div class="flex flex-col grow basis-1">
          <label for="categories">Categoria:</label>
          <selector :options="categories" v-model="spent.category"
            class="mb-2 h-8 px-2 bg-gray-800 border-white text-white cursor-pointer" />
          <label for="spentValue">Valor:</label>
          <input id="spentValue" type="number" min="1" step="any" v-model="spent.spentValue"
            class="mb-2 h-8 px-2 bg-gray-800 border-white text-white">
        </div>
      </div>
      <div class="w-full flex justify-end gap-1 items-baseline">
        <button @click="showAddSpentForm"
          class="rounded px-4 hover:bg-red-300 bg-red-500 transition-all h-8 font-semibold">Cancelar</button>
        <button @click="addSpent"
          class="rounded px-4 hover:bg-green-300 bg-green-500 transition-all h-8 font-semibold">Salvar</button>
      </div>
    </div>
    <button v-show="showForm ? false : true" @click="showAddSpentForm"
      class="p-1 text-center align-middle text-4xl cursor-pointer hover:bg-green-300 transition-all w-full rounded bg-green-400">
      <font-awesome-icon :icon="['fas', 'plus']" />
    </button>
  </div>
</template>
<script>
import Selector from '../components/Selector.vue'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/pt-br';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'SpentAdd',
  components: { Selector, DatePicker },
  data() {
    return {
      showForm: true,
      spent: {
        id: uuidv4(),
        date: new Date().toISOString().substring(0, 10),
        description: '',
        category: '',
        spentValue: '',
        creditCard: true
      }
    }
  },
  methods: {
    showAddSpentForm() {
      return this.showForm = !this.showForm
    },
    inputValidation(input) {
      let error = []
      if (input['date'] === '' || input['date'] === null) error.push({ campo: 'date', msg: 'Data Inválida' });
      if (input['description'] === '' || input['description'] === null) error.push({ campo: 'description', msg: 'Descrição Inválida' });
      if (input['category'] === '' || input['category'] === null) error.push({ campo: 'category', msg: 'Categoria Inválida' });
      if (input['spentValue'] === '' || input['spentValue'] === null) error.push({ campo: 'spentValue', msg: 'Valor Inválida' });
      const err = error.reduce((acc, item) => {
        return `${acc + item['msg']}!\n`
      }, '')
      if (!(error.length === 0)) return alert(err);
      return true
    },
    addSpent() {
      if (!this.inputValidation(this.spent)) return;
      console.log(this.spent);
      this.$store.commit('spents/addSpent', this.spent);
      this.spent = {
        date: new Date().toISOString().substring(0, 10),
        description: '',
        category: this.spent.category,
        spentValue: '',
        creditCard: true
      }
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories.list
    }
  }
}
</script>
<style>
/* .mx-input-wrapper,
.mx-input{
  height: 100%;
  width: 100%;
  cursor: pointer;
} */</style>