export async function login() {
  const cpfInput = element(by.id('cpf.input'))
  const passwordInput = element(by.id('password.input'))
  const submitButton = element(by.id('submit.button'))
  await cpfInput.replaceText('140.861.090-69')
  await passwordInput.replaceText('12345678')
  await submitButton.tap()
}
