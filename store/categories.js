export const state = () => ({
  list: ["Alimentação", "Streaming", "Transporte"]
})

export const mutations = {
  add(state, text) {
    state.list.push({
      text,
      done: false
    })
  },
  remove(state, categorie) {
    if (!confirm('Tem certeza que deseja excluir este item ?')) return
    state.list.splice(state.list.indexOf(categorie), 1)
  }
}