import products from "./products.json"

let productsData = [...products]

export async function getProducts() {
  return productsData
}

export async function getProductById(id: number) {
  return productsData.find((product) => product.id === id)
}

export async function deleteProduct(id: number) {
  productsData = productsData.filter((product) => product.id !== id)
}

export async function addProduct(
  product: Omit<(typeof products)[number], "id">
) {
  const newProduct = {
    id: Math.max(...productsData.map((item) => item.id)) + 1,
    ...product,
  }

  productsData.push(newProduct)

  return newProduct
}

export async function updateProduct(updatedProduct: (typeof products)[number]) {
  productsData = productsData.map((product) =>
    product.id === updatedProduct.id ? updatedProduct : product
  )
}
