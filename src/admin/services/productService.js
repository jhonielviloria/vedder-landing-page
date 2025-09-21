import { mysql } from '../../lib/mysql';

export async function fetchAllProducts() {
  return mysql.getProducts();
}

export async function createProductSvc(data) {
  return mysql.createProduct(data);
}

export async function updateProductSvc(id, data) {
  return mysql.updateProduct(id, data);
}

export async function deleteProductSvc(id) {
  return mysql.deleteProduct(id);
}
