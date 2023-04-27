<template>
  <div class="w-full font-semibold">
    <div class="flex flex-col gap-2 border-t border-gray-500 pt-4" v-show="showForm">
      <div class="flex gap-2 text-gray-300 text-sm border-gray-600">
        <div class="flex flex-col grow basis-1">
          <label for="date">Data:</label>
          <date-picker id="date" v-model="spent.date" valueType="format"
            class="w-full text-center mb-2 h-8 border-gray-600"></date-picker>
          <label for="description">Descrição:</label>
          <input id="description" type="text" v-model="spent.description" v-focus
            class="mb-2 h-8 px-2 bg-gray-800 text-white border rounded border-gray-600">
        </div>
        <div class="flex flex-col grow basis-1">
          <label for="categories">Categoria:</label>
          <selector :options="categories" v-model="spent.category"
            class="mb-2 h-8 px-2 bg-gray-800 text-white border rounded border-gray-600 cursor-pointer" />
          <label for="spentValue">Valor:</label>
          <input id="spentValue" type="number" min="1" step="any" v-model="spent.spentValue" @keyup.enter="addSpent"
            class="mb-2 h-8 px-2 bg-gray-800 text-white border rounded border-gray-600">
        </div>
      </div>
      <div class="w-full flex justify-end gap-1 items-baseline">
        <button @click="showAddSpentForm" class="border border-gray-500 rounded px-4 hover:bg-gray-700 bg-gray-800 transition-all h-8">Cancelar</button>
        <button @click="addSpent" class="border border-gray-500 rounded px-4 hover:bg-gray-700 bg-gray-800 transition-all h-8">Salvar</button>
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
      shouldFocus: true,
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
  directives: {
    focus: {
      inserted (el) {
        el.focus()
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
      this.$store.commit('spents/addSpent', this.spent);
      this.spent = {
        date: new Date().toISOString().substring(0, 10),
        description: '',
        category: this.spent.category,
        spentValue: '',
        creditCard: true
      }
      console.log(this.shouldFocus);
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories.categoryList
    }
  }
}
</script>