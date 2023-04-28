export const state = () => ({
  categoryList: [
    {
      name: "Lanche",
      otherPeople: false
    },
    {
      name: "Lazer",
      otherPeople: false
    },
    {
      name: "Transporte",
      otherPeople: false
    },
    {
      name: "Vestuario",
      otherPeople: false
    },
    {
      name: "Farmacia",
      otherPeople: false
    },
    {
      name: "Mercado",
      otherPeople: false
    },
    {
      name: "Viagem",
      otherPeople: false
    },
    {
      name: "Robby",
      otherPeople: false
    },
    {
      name: "Cursos",
      otherPeople: false
    },
    {
      name: "Casa",
      otherPeople: false
    },
    {
      name: "Uso Pessoal",
      otherPeople: false
    },
    {
      name: "Carro",
      otherPeople: false
    },
    {
      name: "Trabalho",
      otherPeople: false
    },
    {
      name: "Pet",
      otherPeople: false
    },
    {
      name: "Outras",
      otherPeople: false
    },
    {
      name: "Medico",
      otherPeople: false
    },
    {
      name: "Presente",
      otherPeople: false
    },
    {
      name: "Comp .de Terceiros",
      otherPeople: false
    },
    {
      name: "Energia",
      otherPeople: false
    },
    {
      name: "Internet",
      otherPeople: false
    },
    {
      name: "Pai",
      otherPeople: true
    },
    {
      name: "Água e Esgoto",
      otherPeople: false
    },
    {
      name: "Mercado Dividir",
      otherPeople: false
    },
    {
      name: "Farmacia Meu",
      otherPeople: false
    },
    {
      name: "Farmacia Pai",
      otherPeople: true
    },
    {
      name: "Streaming",
      otherPeople: false
    },
    {
      name: "Alimentação",
      otherPeople: false,
    },
    {
      name: "Casa Dividir",
      otherPeople: false
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

