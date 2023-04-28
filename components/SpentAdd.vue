<template>
  <div class="w-full font-semibold">
    <div class="flex flex-col gap-2 border-t border-gray-700 pt-4" v-show="showForm">
      <div class="flex gap-2 text-gray-300 text-sm">
        <div class="flex flex-col grow">
          <label for="date">Data:</label>
          <DatePicker id="date" v-model="spent.date" valueType="format"
            class="w-full text-center mb-2 h-8" />
          <label for="description">Descrição:</label>
          <input id="description" type="text" v-model="spent.description" v-focus class="input">
        </div>
        <div class="flex flex-col grow">
          <div class="flex flex-col grow">
            <label for="categories">Categoria:</label>
            <Selector :options="categories" v-model="spent.category" class="input" />
          </div>
          <div class="flex grow gap-2">
            <div class="flex flex-col grow justify-between">
              <label for="spentValue">Parc:</label>
              <Selector :options="generateQuota" v-model="spent.quota" class="input" @keyup.enter="addSpent" />
            </div>
            <div class="flex flex-col grow">
              <label for="spentValue">Valor:</label>
              <input id="spentValue" type="number" v-model="spent.spentValue" @keyup.enter="addSpent"
                class="input">
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex justify-end gap-1 items-baseline">
        <button @click="showAddSpentForm" class="btn">Cancelar</button>
        <button @click="addSpent" class="btn">Salvar</button>
      </div>
    </div>
    <button v-show="showForm ? false : true" @click="showAddSpentForm"
      class="p-1 text-center align-middle text-4xl cursor-pointer hover:text-white hover:rounded-sm hover:bg-green-300 transition-all w-full rounded bg-green-400">
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
        creditCard: true,
        quota: ''
      }
    }
  },
  directives: {
    focus: {
      inserted(el) {
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
        creditCard: true,
        quota: ''
      }
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories.categoryList
    },
    generateQuota() {
      return Array.from({ length: 24 }, (_, i) => String(i + 1));
    }
  }
}
</script>