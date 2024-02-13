import {ProductList} from './ProductList'
import {ProductPut} from './ProductPut'

const stack = [
  {
    component: ProductList,
    name: 'product-list',
  },
  {
    component: ProductPut,
    name: 'product-put',
  },
] as const

export default {stack}
