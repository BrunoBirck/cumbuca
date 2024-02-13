import {device, element, by, expect} from 'detox'

describe('E2E Tests - Create New Product Flow', () => {
  beforeAll(async () => {
    await device.launchApp()
  })

  beforeEach(async () => {
    await device.reloadReactNative()
    const cpfInput = element(by.id('cpf.input'))
    const passwordInput = element(by.id('password.input'))
    const submitButton = element(by.id('submit.button'))
    await expect(cpfInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(submitButton).toBeVisible()
    await cpfInput.replaceText('140.861.090-69')
    await passwordInput.replaceText('12345678')
    await submitButton.tap()
    await expect(element(by.id('product-list.page'))).toBeVisible()
    const createProductButton = element(
      by.id('product-list.add-product-button'),
    )
    await createProductButton.tap()
    await expect(element(by.id('product-put.page'))).toBeVisible()
    await expect(element(by.id('product-put.name.input'))).toBeVisible()
    await expect(element(by.id('product-put.quantity.input'))).toBeVisible()
    await expect(element(by.id('product-put.unity-price.input'))).toBeVisible()
    await expect(element(by.id('product-put.submit.button'))).toBeVisible()
  })

  it('should display an error message if the inputs is not filled', async () => {
    const submitButton = element(by.id('product-put.submit.button'))
    await expect(submitButton).toBeVisible()
    await submitButton.tap()
    const nameErrorMessage = element(
      by.id('product-put.name.input.error.message'),
    )
    const quantityErrorMessage = element(
      by.id('product-put.quantity.input.error.message'),
    )
    const priceErrorMessage = element(
      by.id('product-put.unity-price.input.error.message'),
    )
    await expect(nameErrorMessage).toBeVisible()
    await expect(nameErrorMessage).toHaveText('Campo obrigatório')
    await expect(quantityErrorMessage).toBeVisible()
    await expect(quantityErrorMessage).toHaveText('Campo obrigatório')
    await expect(priceErrorMessage).toBeVisible()
    await expect(priceErrorMessage).toHaveText('Campo obrigatório')
  })

  it('should display an error message if the price is invalid', async () => {
    await element(by.id('product-put.name.input')).replaceText('Product Test')
    await element(by.id('product-put.quantity.input')).replaceText('10')
    await element(by.id('product-put.unity-price.input')).replaceText('0')
    await element(by.id('product-put.submit.button')).tap()
    const priceErrorMessage = element(
      by.id('product-put.unity-price.input.error.message'),
    )
    await expect(priceErrorMessage).toBeVisible()
    await expect(priceErrorMessage).toHaveText('O valor mínimo é R$ 0,01')
  })

  it('should display an error message if the price is a text', async () => {
    await element(by.id('product-put.name.input')).replaceText('Product Test')
    await element(by.id('product-put.quantity.input')).replaceText('10')
    await element(by.id('product-put.unity-price.input')).replaceText('text')
    await element(by.id('product-put.submit.button')).tap()
    const priceErrorMessage = element(
      by.id('product-put.unity-price.input.error.message'),
    )
    await expect(priceErrorMessage).toBeVisible()
    await expect(priceErrorMessage).toHaveText('O campo precisa ser um número')
  })

  it('should display an error message if the name is invalid', async () => {
    await element(by.id('product-put.name.input')).replaceText('')
    await element(by.id('product-put.quantity.input')).replaceText('10')
    await element(by.id('product-put.unity-price.input')).replaceText('10')
    await element(by.id('product-put.submit.button')).tap()
    const nameErrorMessage = element(
      by.id('product-put.name.input.error.message'),
    )
    await expect(nameErrorMessage).toBeVisible()
    await expect(nameErrorMessage).toHaveText('Campo obrigatório')
  })

  it('should display an error message if the quantity is invalid', async () => {
    await element(by.id('product-put.name.input')).replaceText('Product Test')
    await element(by.id('product-put.quantity.input')).replaceText('0')
    await element(by.id('product-put.unity-price.input')).replaceText('10')
    await element(by.id('product-put.submit.button')).tap()
    const quantityErrorMessage = element(
      by.id('product-put.quantity.input.error.message'),
    )
    await expect(quantityErrorMessage).toBeVisible()
    await expect(quantityErrorMessage).toHaveText(
      'Precisa ter pelo menos 1 unidade',
    )
  })

  it('should display an error message if the quantity is a text', async () => {
    await element(by.id('product-put.name.input')).replaceText('Product Test')
    await element(by.id('product-put.quantity.input')).replaceText('text')
    await element(by.id('product-put.unity-price.input')).replaceText('10')
    await element(by.id('product-put.submit.button')).tap()
    const quantityErrorMessage = element(
      by.id('product-put.quantity.input.error.message'),
    )
    await expect(quantityErrorMessage).toBeVisible()
    await expect(quantityErrorMessage).toHaveText(
      'O campo precisa ser um número',
    )
  })

  it('should create a new product', async () => {
    await element(by.id('product-put.name.input')).replaceText('Product Test')
    await element(by.id('product-put.quantity.input')).replaceText('10')
    await element(by.id('product-put.unity-price.input')).replaceText('10')
    await element(by.id('product-put.submit.button')).tap()
    await expect(element(by.id('product-list.page'))).toBeVisible()
  })
})
