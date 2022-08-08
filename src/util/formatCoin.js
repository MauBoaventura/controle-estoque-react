export const formatToReal = (value) => {
    return new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(value)
  }

  export const formatToDollar = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol'}).format(value)
  }

  