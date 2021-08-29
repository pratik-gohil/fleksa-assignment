import { IMakeOrderProducts } from '../interfaces/http/nodeapi/order/post.order.nodeapi.http';
import { ICartSliceState } from '../redux/slices/cart.slices.redux';

export function getPrductsFromCartData(cartData: ICartSliceState): Array<IMakeOrderProducts> {
  return Object.values(cartData.items)
    .filter((product) => product.isAvailable) // ? only available products
    .map((product) => {
      const hasChoice = product.choice ? product.choice?.length > 0 : false;
      const choice = product.choice
        ? product.choice.map((choice) => ({
            top_index: choice.top_index,
            product_index: choice.product_index,
          }))
        : null;
      const hasSides = product.sideProducts ? product.sideProducts.length > 0 : false;
      const sideProducts = product.sideProducts ? product.sideProducts.map((side) => ({ id: side.id })) : null;

      return {
        id: product.id,
        quantity: product.quantity,
        main_name: product.mainName,
        has_choice: hasChoice,
        choice: hasChoice ? choice : null,
        has_sides: hasSides,
        side_product_json: hasSides ? sideProducts : null,
        type: product.type === 'SINGLE' ? 'SINGLE' : 'PART',
        main_id: product.topProductId,
      };
    });
}
