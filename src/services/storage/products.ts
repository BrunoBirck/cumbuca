import {IProduct} from 'src/types/Product';
import {getItem, setItem} from './global';
import {APP_SIGNED_USER} from './keys';
import {getUser} from './user';

export const productsByUser = (): IProduct[] => {
  const cpf = getItem(APP_SIGNED_USER);
  const user = getUser(cpf);
  if (user?.products?.length > 0) {
    return user.products;
  }
  return [];
};

export const getNextAvailableProductId = (): number => {
  const products = productsByUser();
  if (products.length > 0) {
    const existingIds = products.map(product => product.id);
    for (let id = 1; id <= existingIds.length; id++) {
      if (!existingIds.includes(id)) {
        return id;
      }
    }
    return existingIds.length + 1;
  }
  return 1;
};

export const createNewProduct = (product: {
  name: string;
  quantity: number;
  unityPrice: number;
}): IProduct => {
  const cpf = getItem(APP_SIGNED_USER);
  const user = getUser(cpf);
  const id = getNextAvailableProductId();
  const newProduct = {
    id,
    ...product,
    total: product.quantity * product.unityPrice,
  };
  let products = user.products || [];
  products.push(newProduct);
  setItem(cpf, {...user, products});
  return newProduct;
};

export const updateProductQuantity = (
  productId: number,
  action: 'sum' | 'less',
) => {
  const cpf = getItem(APP_SIGNED_USER);
  const user = getUser(cpf);
  const productIndex = user.products.findIndex(
    product => product.id === productId,
  );
  if (productIndex > -1) {
    const product = user.products[productIndex];
    if (action === 'sum') {
      product.quantity += 1;
    } else {
      product.quantity -= 1;
      if (product.quantity === 0) {
        user.products.splice(productIndex, 1);
        setItem(cpf, user);
        return null;
      }
    }
    product.total = product.quantity * product.unityPrice;
    user.products[productIndex] = product;
    setItem(cpf, user);
    return product;
  }
  return null;
};

export const verifyProductExistsByName = (name: string): boolean => {
  const products = productsByUser();
  return products.some(product => product.name === name);
};

export const removeProduct = (productId: number) => {
  const cpf = getItem(APP_SIGNED_USER);
  const user = getUser(cpf);
  const productIndex = user.products.findIndex(
    product => product.id === productId,
  );
  if (productIndex > -1) {
    user.products.splice(productIndex, 1);
    setItem(cpf, user);
    return true;
  }
  return false;
};
