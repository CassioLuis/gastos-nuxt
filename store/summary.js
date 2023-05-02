export const state = () => ({
  summaryList: []
})

export const mutations = {
  addSummary(state, payload) {
    console.log(payload, state.summaryList);
    state.summaryList = payload;
  },
  expand(_,totalize) {
    totalize.expanded = !totalize.expanded
  }
}