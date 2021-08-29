import { ICategoryProduct } from '../interfaces/common/category.common.interfaces';
import { IMenuSide } from '../interfaces/common/menu-side.common.interfaces';

/**
 * @param cartItem Current cart item
 * @param menuItem Correspond id menu item
 * @param sides Menu all sides
 */
export const isProductAvailable = (
  cartItem: Record<string, any>,
  menuItem: ICategoryProduct,
  sides: Record<number, IMenuSide>,
): boolean => {
  //   ? If menu item not exist return false
  if (!menuItem) return false;

  cartItem.sideProducts.forEach(
    (side: {
      id: number;
      name: {
        english: string;
        german: string;
      };
    }) => {
      console.log('side product id ', side.id);
      if (!sides[side.id]) return false;
    },
  );

  return true;
};
