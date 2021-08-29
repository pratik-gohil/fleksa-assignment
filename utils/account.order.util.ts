import { ICategoryProduct } from '../interfaces/common/category.common.interfaces';

/**
 * @param
 */
export const isProductAvailable = (cartItem: Record<string, any>, menuItem: ICategoryProduct): boolean => {
  console.log(cartItem, menuItem);

  //   ? If menu item not exist return false
  if (!menuItem) return false;

  return true;
};
