export async function getCategories() {
  const api = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(api);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // const api = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  let api;
  if (categoryId) {
    api = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  } else if (query) {
    api = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  }
  console.log(api);
  const response = await fetch(api);
  const data = await response.json();
  return data;
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
