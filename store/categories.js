export const state = () => ({
  categoryList: [
    {
      name: "Alimentação",
      otherPeople: false
    },
    {
      name: "Streaming",
      otherPeople: false
    },
    {
      name: "Transporte",
      otherPeople: false
    },
    {
      name: "Mercado",
      otherPeople: false
    },
    {
      name: "Pai",
      otherPeople: true
    }
  ]
})

export const mutations = {
  addCategory(state, category) {
    state.categoryList.push(category)
  },
  remove(state, category) {
    if (!confirm('Tem certeza que deseja excluir este item ?')) return
    state.categoryList.splice(state.categoryList.indexOf(category), 1)
  },
  isToAnotherPeopleCategory(state, category) {
    category.otherPeople = !category.otherPeople
  }
}

export const getters = {
  getCategories(state) {
    return state.categoryList
  },
}