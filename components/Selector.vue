<template>
  <select v-model="selectedOption">
    <option v-for="option in options" :value="option.name || option" class="space-y-4 text-lg p-20">{{ option.name || option }}</option>
  </select>
</template>
<script>
export default {
  props: {
    options: Array,
    value: String
  },
  data() {
    return {
      selectedOption: this.value
    }
  },
  watch: {
    selectedOption(newValue) {
      this.$emit('input', newValue)
    },
    value(newValue) {
      this.selectedOption = newValue
    }
  }
}
</script>