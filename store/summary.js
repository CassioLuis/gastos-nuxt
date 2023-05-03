export const state = () => ({
  summaryList: []
})

export const mutations = {
  addSummary(state, payload) {
    state.summaryList = payload;
    console.log(payload);
  },
  expand(_,totalize) {
    totalize.expanded = !totalize.expanded
  }
}