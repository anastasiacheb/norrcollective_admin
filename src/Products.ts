import products from "./products.json"

export async function getProducts() {
  return products
}

export async function getProductById(id: number) {
  return products.find((product) => product.id === id)
}
