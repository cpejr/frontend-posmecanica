function orderElements(data, ordemBy) {
  data.sort((a, b) => {
    a = a[ordemBy];
    b = b[ordemBy];

    function sortOrdem(one, two) {
      if (one > two) {
        return 1;
      }
      if (one < two) {
        return -1;
      }
      return 0;
    }// função que ordena itens de um array

    return (
      sortOrdem(a, b)
    );
  });
  return data;
}// logica da ordenação (alfabetica ou inversa)

export default orderElements;
