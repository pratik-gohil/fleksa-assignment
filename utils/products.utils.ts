import { IMakeOrderProducts } from '../interfaces/http/nodeapi/order/post.order.nodeapi.http';
import { ICartSliceState } from '../redux/slices/cart.slices.redux';

export function getPrductsFromCartData(cartData: ICartSliceState): Array<IMakeOrderProducts> {
  return Object.keys(cartData.items).map((key) => {
    const prod = cartData.items[key];
    const hasChoice = prod.choice ? prod.choice?.length > 0 : false;
    const choice = prod.choice
      ? prod.choice.map((choice) => ({
          top_index: choice.top_index,
          product_index: choice.product_index,
        }))
      : null;
    const hasSides = prod.sideProducts ? prod.sideProducts.length > 0 : false;
    const sideProducts = prod.sideProducts ? prod.sideProducts.map((side) => ({ id: side.id })) : null;

    return {
      id: prod.id,
      quantity: prod.quantity,
      main_name: prod.mainName,
      has_choice: hasChoice,
      choice: hasChoice ? choice : null,
      has_sides: hasSides,
      side_product_json: hasSides ? sideProducts : null,
      type: prod.type === 'SINGLE' ? 'SINGLE' : 'PART',
      main_id: prod.topProductId,
    };
  });
}
