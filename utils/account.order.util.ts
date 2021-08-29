import { ICategoryProduct } from '../interfaces/common/category.common.interfaces';
import { IMenuPart } from '../interfaces/common/menu-part.common.interfaces';

/**
 * @param cartItem Current cart item
 * @param menuItem Correspond id menu item
 * @param parts Menu all sides
 */
export const isProductAvailable = (
  cartItem: Record<string, any>,
  menuItem: ICategoryProduct,
  parts: Record<number, IMenuPart>,
): boolean => {
  //   ? If menu item not exist return false
  if (!menuItem) return false;

  // ? Checking side product exist or not
  if (cartItem.type === 'MULTIPLE') {
    const existSideProductIds = parts[cartItem.id].side_products_json[0].option_ids;

    const sideChecks: boolean[] = cartItem.sideProducts.map(
      (side: {
        id: number;
        name: {
          english: string;
          german: string;
        };
      }) => {
        if (existSideProductIds.findIndex((id) => id === side.id) === -1) return false;

        return true;
      },
    );

    // * Return outside of the loop to terminate function
    if (sideChecks.filter((v) => v === false).length) return false;
  }

  return true;
};
