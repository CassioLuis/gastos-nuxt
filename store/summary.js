export const state = () => ({
  summaryList: []
})

export const mutations = {
  addSummary(state, payload) {
    state.summaryList = payload;
  },
  expand(state, totalize) {
    state.summaryList.forEach(item => {
      if (item !== totalize) item.expanded = false
    })
    totalize.expanded = !totalize.expanded
  }
}