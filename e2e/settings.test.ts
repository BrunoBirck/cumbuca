import {device, element, by, expect} from 'detox'

// ativar biometria, fazer login e conferir se a biometria foi ativada

describe('E2E Tests - Settings Flow', () => {
  beforeAll(async () => {
    await device.launchApp({permissions: {faceid: 'YES'}})
  })

  beforeEach(async () => {
    await device.reloadReactNative()
    await device.setBiometricEnrollment(true)
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
    const settingsButton = element(
      by.id('settings-button'),
    )
    await settingsButton.tap()
    await expect(element(by.id('settings.page'))).toBeVisible()
    await expect(element(by.id('settings.theme'))).toBeVisible()
    await expect(element(by.id('settings.biometric'))).toBeVisible()
  })

  it('should toggle dark mode', async () => {
    const darkModeSwitch = element(by.id('theme.switch.light'))
    await darkModeSwitch.tap()
    await expect(element(by.id('theme.switch.dark'))).toBeVisible()
  })

  it('should toggle biometric login', async () => {
    const biometricSwitch = element(by.id('biometric.switch.inactive'))
    await biometricSwitch.tap()
    await device.matchFace()
    await expect(element(by.id('biometric.switch.active'))).toBeVisible()
    await element(by.id('signout.button')).tap()
    const cpfInput = element(by.id('cpf.input'))
    const passwordInput = element(by.id('password.input'))
    const submitButton = element(by.id('submit.button'))
    await expect(cpfInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(submitButton).toBeVisible()
    await cpfInput.replaceText('140.861.090-69')
      .then(() => cpfInput.tapReturnKey()
        .then(() => device.matchFace())
    )
    await expect(element(by.id('product-list.page'))).toBeVisible()
  })
})
