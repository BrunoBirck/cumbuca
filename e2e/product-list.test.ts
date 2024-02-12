import {device, element, by, expect} from 'detox';

describe('E2E Tests - List Products Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    const cpfInput = element(by.id('cpf.input'));
    const passwordInput = element(by.id('password.input'));
    const submitButton = element(by.id('submit.button'));
    await expect(cpfInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitButton).toBeVisible();
    await cpfInput.replaceText('140.861.090-69');
    await passwordInput.replaceText('12345678');
    await submitButton.tap();
    await expect(element(by.id('product-list.page'))).toBeVisible();
  });

  it('should register three products', async () => {
    const registerNewProduct = async (
      name: string,
      quantity: string,
      price: string,
    ) => {
      const createProductButton = element(
        by.id('product-list.add-product-button'),
      );
      await createProductButton.tap();
      await expect(element(by.id('product-put.page'))).toBeVisible();
      await expect(element(by.id('product-put.name.input'))).toBeVisible();
      await expect(element(by.id('product-put.quantity.input'))).toBeVisible();
      await expect(
        element(by.id('product-put.unity-price.input')),
      ).toBeVisible();
      await expect(element(by.id('product-put.submit.button'))).toBeVisible();
      await element(by.id('product-put.name.input')).replaceText(name);
      await element(by.id('product-put.quantity.input')).replaceText(quantity);
      await element(by.id('product-put.unity-price.input')).replaceText(price);
      await element(by.id('product-put.submit.button')).tap();
      await expect(element(by.id('product-list.page'))).toBeVisible();
    };
    await registerNewProduct('Amora', '1', '1.5');
    await registerNewProduct('Banana', '14', '4');
    await registerNewProduct('Laranja', '23', '3.2');
  });

  it('should display the list with the three products', async () => {
    const productList = element(by.id('product-list'));
    await expect(productList).toBeVisible();
    await expect(element(by.id('product-list.item-1'))).toBeVisible();
    await expect(element(by.id('product-list.item-2'))).toBeVisible();
    await expect(element(by.id('product-list.item-3'))).toBeVisible();
  });

  it('should filter list by product name', async () => {
    const searchInput = element(by.id('product-list.search.input'));
    await searchInput.replaceText('Banana');
    await expect(element(by.id('product-list.item-2'))).toBeVisible();
    await expect(element(by.id('product-list.item-1'))).not.toBeVisible();
    await expect(element(by.id('product-list.item-3'))).not.toBeVisible();
    await searchInput.clearText();
    await expect(element(by.id('product-list.item-1'))).toBeVisible();
    await expect(element(by.id('product-list.item-2'))).toBeVisible();
    await expect(element(by.id('product-list.item-3'))).toBeVisible();
  });

  it('should change the quantity of a product for zero', async () => {
    await expect(element(by.id('product-list.item-1'))).toBeVisible();
    const lessButton = element(by.id('product-list.item-1.less.button'));
    await expect(lessButton).toBeVisible();
    await lessButton.tap();
    await expect(element(by.id('product-list.item-1'))).not.toBeVisible();
  });

  it('should create a new product and check if the total price is correct', async () => {
    const registerNewProduct = async (
      name: string,
      quantity: string,
      price: string,
    ) => {
      const createProductButton = element(
        by.id('product-list.add-product-button'),
      );
      await createProductButton.tap();
      await expect(element(by.id('product-put.page'))).toBeVisible();
      await expect(element(by.id('product-put.name.input'))).toBeVisible();
      await expect(element(by.id('product-put.quantity.input'))).toBeVisible();
      await expect(
        element(by.id('product-put.unity-price.input')),
      ).toBeVisible();
      await expect(element(by.id('product-put.submit.button'))).toBeVisible();
      await element(by.id('product-put.name.input')).replaceText(name);
      await element(by.id('product-put.quantity.input')).replaceText(quantity);
      await element(by.id('product-put.unity-price.input')).replaceText(price);
      await element(by.id('product-put.submit.button')).tap();
      await expect(element(by.id('product-list.page'))).toBeVisible();
    };
    await registerNewProduct('Uva', '10', '15');
    const newProduct = element(by.id('product-list.item-1'));
    const newProductTotalPrice = element(
      by.id('product-list.item-1.total-price'),
    );
    await expect(newProduct).toBeVisible();
    await expect(newProductTotalPrice).toBeVisible();
    await expect(newProductTotalPrice).toHaveText('R$ 150,00');
  });

  it('should change the quantity of a product for more and check if the total price is correct', async () => {
    const moreButton = element(by.id('product-list.item-1.more.button'));
    await expect(moreButton).toBeVisible();
    await moreButton.tap();
    const newProductTotalPrice = element(
      by.id('product-list.item-1.total-price'),
    );
    await expect(newProductTotalPrice).toHaveText('R$ 165,00');
  });

  it('should delete a product and check if the id is correct', async () => {
    const deleteButton = element(by.id('product-list.item-2.delete.button'));
    await expect(deleteButton).toBeVisible();
    await deleteButton.tap();
    await expect(element(by.id('product-list.item-2'))).not.toBeVisible();
    const registerNewProduct = async (
      name: string,
      quantity: string,
      price: string,
    ) => {
      const createProductButton = element(
        by.id('product-list.add-product-button'),
      );
      await createProductButton.tap();
      await expect(element(by.id('product-put.page'))).toBeVisible();
      await expect(element(by.id('product-put.name.input'))).toBeVisible();
      await expect(element(by.id('product-put.quantity.input'))).toBeVisible();
      await expect(
        element(by.id('product-put.unity-price.input')),
      ).toBeVisible();
      await expect(element(by.id('product-put.submit.button'))).toBeVisible();
      await element(by.id('product-put.name.input')).replaceText(name);
      await element(by.id('product-put.quantity.input')).replaceText(quantity);
      await element(by.id('product-put.unity-price.input')).replaceText(price);
      await element(by.id('product-put.submit.button')).tap();
      await expect(element(by.id('product-list.page'))).toBeVisible();
    };
    await registerNewProduct('Pera', '10', '10');
    const newProduct = element(by.id('product-list.item-2'));
    const newProductIdText = element(by.id('product-list.item-2.id'));
    await expect(newProduct).toBeVisible();
    await expect(newProductIdText).toHaveText('2');
  });

  it('should order the list by id', async () => {
    const orderByIdButton = element(by.id('product-list.order-by-id'));
    await expect(orderByIdButton).toBeVisible();
    await orderByIdButton.tap();
    const firstProduct = element(by.id('product-list.item-1'));
    const firstProductIdText = element(by.id('product-list.item-1.id'));
    await expect(firstProduct).toBeVisible();
    await expect(firstProductIdText).toHaveText('1');
  });

  it('should order the list by name', async () => {
    const orderByNameButton = element(by.id('product-list.order-by-name'));
    await expect(orderByNameButton).toBeVisible();
    await orderByNameButton.tap();
    const firstProduct = element(by.id('product-list.item-3'));
    const firstProductNameText = element(by.id('product-list.item-3.name'));
    await expect(firstProduct).toBeVisible();
    await expect(firstProductNameText).toHaveText('Laranja');
  });

  it('should order the list by quantity', async () => {
    const orderByQuantityButton = element(
      by.id('product-list.order-by-quantity'),
    );
    await expect(orderByQuantityButton).toBeVisible();
    await orderByQuantityButton.tap();
    const firstProduct = element(by.id('product-list.item-2'));
    const firstProductQuantityText = element(
      by.id('product-list.item-2.quantity'),
    );
    await expect(firstProduct).toBeVisible();
    await expect(firstProductQuantityText).toHaveText('10');
  });

  it('should order the list by unity price', async () => {
    const orderByUnityPriceButton = element(
      by.id('product-list.order-by-unity-price'),
    );
    await expect(orderByUnityPriceButton).toBeVisible();
    await orderByUnityPriceButton.tap();
    const firstProduct = element(by.id('product-list.item-3'));
    const firstProductUnityPriceText = element(
      by.id('product-list.item-3.unity-price'),
    );
    await expect(firstProduct).toBeVisible();
    await expect(firstProductUnityPriceText).toHaveText('R$ 3,20');
  });

  it('should order the list by total price', async () => {
    const scrollview = element(by.id('product-list.order.scrollview'));
    await scrollview.swipe('left', 'fast', 0.5);
    const orderByTotalPriceButton = element(
      by.id('product-list.order-by-total-price'),
    );
    await expect(orderByTotalPriceButton).toBeVisible();
    await orderByTotalPriceButton.tap();
    const firstProduct = element(by.id('product-list.item-3'));
    const firstProductTotalPriceText = element(
      by.id('product-list.item-3.total-price'),
    );
    await expect(firstProduct).toBeVisible();
    await expect(firstProductTotalPriceText).toHaveText('R$ 73,60');
  });
});
