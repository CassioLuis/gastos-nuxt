const convertToCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
export {
  convertToCurrency
}