export const state = () => ({
  spentList: [
    {
      id: 1,
      presentationDate: '4 JAN.',
      date: '2023-01-04',
      description: 'Mercado',
      category: 'Alimentação',
      spentValue: 500,
      creditCard: true
    },
    {
      id: 2,
      presentationDate: '4 JAN.',
      date: '2023-01-04',
      description: 'You Tube',
      category: 'Streaming',
      spentValue: 39,
      creditCard: true
    },
    {
      id: 3,
      presentationDate: '4 FEV.',
      date: '2023-02-04',
      description: 'Machado Supermercado',
      category: 'Alimentação',
      spentValue: 390,
      creditCard: true
    },
    {
      id: 4,
      presentationDate: '4 MAR.',
      date: '2023-03-04',
      description: 'Hiper Machado',
      category: 'Alimentação',
      spentValue: 180,
      creditCard: true
    },
    {
      id: 5,
      presentationDate: '4 ABR.',
      date: '2023-04-04',
      description: 'Mercado',
      category: 'Alimentação',
      spentValue: 500,
      creditCard: true
    },
    {
      id: 6,
      presentationDate: '4 ABR.',
      date: '2023-04-04',
      description: 'You Tube',
      category: 'Streaming',
      spentValue: 39,
      creditCard: true
    }
  ]
})

export const mutations = {
  convertDateStringToUTCDate (param) {
    return new Date(Date.UTC(
      Number(param.substring(0, 4)),
      Number(param.substring(5, 7)) - 1,
      Number(param.substring(8, 10)),
      12, // hora do dia em UTC (meio-dia)
      0, // minutos em UTC
      0 // segundos em UTC
    ))
  },

  convertDateToStringDate(param) {
    const newStringDate = mutations.convertDateStringToUTCDate(param)
    const dateStringFormat = { month: 'short', day: 'numeric' }
    const presentationDateToString = newStringDate.toLocaleDateString('pt-BR', dateStringFormat)
    const regex = /(\d{1,2}) de (\w+)/i;
    const [_, day, month] = regex.exec(presentationDateToString);
    return `${day} ${month.toUpperCase()}.`
  },

  addSpent(state, payload) {
    if (!payload.quota) return state.spentList.push({ ...payload, presentationDate: mutations.convertDateToStringDate(payload.date) })

    const parc = payload.quota.match(/\d+/g)
    const quantityOfParc = parseInt(parc[0])

    for (let i = 1; i <= quantityOfParc; i++) {
      const date = mutations.convertDateStringToUTCDate(payload.date)
      let month = date.getMonth();
      const nextMonth = date.setMonth(month + i - 1)
      const newDate = new Date(nextMonth)
      const converted = newDate.toISOString().substring(0,10)
      const newPayload = {
        ...payload,
        date: converted,
        presentationQuota: `${i}/${quantityOfParc}`,
        presentationDate: mutations.convertDateToStringDate(converted)
      }
      state.spentList.push(newPayload)
    }
  },

  remove(state, spent) {
    if (!confirm('Tem certeza que deseja excluir este item ?')) return
    state.spentList.splice(state.spentList.indexOf(spent), 1)
  },
  isACreditCardSpent(state, spent) {
    spent.creditCard = !spent.creditCard
  }
}

export const getters = {
  getSpents(state) {
    return state.spentList
  },
}