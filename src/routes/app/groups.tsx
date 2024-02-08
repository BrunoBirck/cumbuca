import productsRoutes from './Products';
import settingsRoutes from './Settings';

const groups = [
  {
    screens: [...productsRoutes.stack, ...settingsRoutes.stack] as const,
  },
];

export default groups;
