import {MMKV} from 'react-native-mmkv'
import {IUser} from 'src/types/User'
import {IProduct} from 'src/types/Product'
import {APP_SIGNED_USER} from './keys'

export const storage = new MMKV()

const isEmpty = (value: string) =>
  value === undefined || value === null || value === ''

export const setItem = (key: string, value: any) => {
  try {
    if (isEmpty(key)) {
      storage.delete(key)
    }
    storage.set(key, JSON.stringify(value))
  } catch (error) {
    throw new Error(`[Error saving ${key}]: ${error}`)
  }
}

export const getItem = (key: string) => {
  if (!isEmpty(key)) {
    try {
      const result = storage.getString(key)
      return result ? JSON.parse(result) : null
    } catch (error) {
      throw new Error(`[Error getting ${key}]: ${error}`)
    }
  }
  return null
}

export const removeItem = (key: string) => {
  if (!isEmpty(key)) {
    try {
      storage.delete(key)
    } catch (error) {
      throw new Error(`[Error removing ${key}]: ${error}`)
    }
  }
}

export const getAllKeys = () => {
  try {
    return storage.getAllKeys()
  } catch (error) {
    throw new Error(`[Error getting all keys]: ${error}`)
  }
}

export const getCurrentDate = () => {
  const today = new Date()
  const day = String(today.getDate()).padStart(2, '0')
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const year = today.getFullYear()
  return `${day}/${month}/${year}`
}

export const verifyUserCredentials = (
  cpf: string,
  password: string,
): IUser | Error => {
  try {
    let user = getItem(cpf)
    if (user) {
      if (user.password !== password) {
        throw new Error('Credenciais inválidas')
      }
      user.lastAccess = getCurrentDate()
      setItem(cpf, user)
      setItem(APP_SIGNED_USER, cpf)
      return user
    } else {
      user = {
        cpf,
        password,
        lastAccess: getCurrentDate(),
      }
      setItem(cpf, user)
      setItem(APP_SIGNED_USER, cpf)
      return user
    }
  } catch (error) {
    throw new Error(`[Error verifying user credentials]: ${error}`)
  }
}

export const getUser = (cpf: string): IUser => {
  return getItem(cpf)
}

export const productsByUser = (): IProduct[] => {
  try {
    const cpf = getItem(APP_SIGNED_USER)
    const user = getUser(cpf)
    if (user?.products?.length > 0) {
      return user.products
    }
    return []
  } catch (error) {
    throw new Error(`[Error getting products by user]: ${error}`)
  }
}

export const getNextAvailableProductId = (): number => {
  try {
    const products = productsByUser()
    if (products.length > 0) {
      const existingIds = products.map(product => product.id)
      for (let id = 1; id <= existingIds.length; id++) {
        if (!existingIds.includes(id)) {
          return id
        }
      }
      return existingIds.length + 1
    }
    return 1
  } catch (error) {
    throw new Error(`[Error getting next available product id]: ${error}`)
  }
}

export const createNewProduct = (product: {
  name: string
  quantity: number
  unityPrice: number
}): IProduct => {
  try {
    const cpf = getItem(APP_SIGNED_USER)
    const user = getUser(cpf)
    const id = getNextAvailableProductId()
    const newProduct = {
      id,
      ...product,
      total: product.quantity * product.unityPrice,
    }
    let products = user.products || []
    products.push(newProduct)
    setItem(cpf, {...user, products})
    return newProduct
  } catch (error) {
    throw new Error(`[Error creating new product]: ${error}`)
  }
}

export const updateProductQuantity = (
  productId: number,
  action: 'sum' | 'less',
) => {
  try {
    const cpf = getItem(APP_SIGNED_USER)
    const user = getUser(cpf)
    const productIndex = user.products.findIndex(
      product => product.id === productId,
    )
    if (productIndex > -1) {
      const product = user.products[productIndex]
      if (action === 'sum') {
        product.quantity += 1
      } else {
        product.quantity -= 1
        if (product.quantity === 0) {
          user.products.splice(productIndex, 1)
          setItem(cpf, user)
          return null
        }
      }
      product.total = product.quantity * product.unityPrice
      user.products[productIndex] = product
      setItem(cpf, user)
      return product
    }
    return null
  } catch (error) {
    throw new Error(`[Error updating product quantity]: ${error}`)
  }
}

export const verifyProductExistsByName = (name: string): boolean => {
  try {
    const products = productsByUser()
    return products.some(product => product.name === name)
  } catch (error) {
    throw new Error(`[Error verifying product exists by name]: ${error}`)
  }
}

export const removeProduct = (productId: number) => {
  try {
    const cpf = getItem(APP_SIGNED_USER)
    const user = getUser(cpf)
    const productIndex = user.products.findIndex(
      product => product.id === productId,
    )
    if (productIndex > -1) {
      user.products.splice(productIndex, 1)
      setItem(cpf, user)
      return true
    }
    return false
  } catch (error) {
    throw new Error(`[Error removing product]: ${error}`)
  }
}
