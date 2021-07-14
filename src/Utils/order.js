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
    }

    return (
      sortOrdem(a, b)
    );
  });
  return data;
}

export default orderElements;
