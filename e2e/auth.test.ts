import {device, element, by, expect} from 'detox';

describe('E2E Tests - Login and Registration Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should successfully register a new user with valid CPF and password', async () => {
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

  it('should display an error message if CPF is invalid during registration', async () => {
    const cpfInput = element(by.id('cpf.input'));
    const passwordInput = element(by.id('password.input'));
    const submitButton = element(by.id('submit.button'));
    const error = element(by.id('cpf.input.error'));
    const errorMessage = element(by.id('cpf.input.error.message'));
    await expect(cpfInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitButton).toBeVisible();
    await cpfInput.replaceText('140.861.090-68');
    await passwordInput.replaceText('12345678');
    await submitButton.tap();
    await expect(error).toBeVisible();
    await expect(errorMessage).toHaveText('CPF inválido');
  });

  it('should display an error message if the password during registration is less than 8 characters', async () => {
    const cpfInput = element(by.id('cpf.input'));
    const passwordInput = element(by.id('password.input'));
    const submitButton = element(by.id('submit.button'));
    const error = element(by.id('password.input.error'));
    const errorMessage = element(by.id('password.input.error.message'));
    await expect(cpfInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitButton).toBeVisible();
    await cpfInput.replaceText('635.884.390-72');
    await passwordInput.replaceText('123');
    await submitButton.tap();
    await expect(error).toBeVisible();
    await expect(errorMessage).toHaveText(
      'A senha precisa ter no mínimo 8 dígitos',
    );
  });

  it('should successfully log in with valid credentials after registration', async () => {
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

  it('should display an error message if login is attempted with an incorrect password', async () => {
    const cpfInput = element(by.id('cpf.input'));
    const passwordInput = element(by.id('password.input'));
    const submitButton = element(by.id('submit.button'));
    const toast = element(by.id('toast'));
    const toastMessage = element(by.id('toast.message'));
    await expect(cpfInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitButton).toBeVisible();
    await cpfInput.replaceText('140.861.090-69');
    await passwordInput.replaceText('12345679');
    await submitButton.tap();
    await expect(toast).toBeVisible();
    await expect(toastMessage).toHaveText('Credenciais inválidas');
  });
});
