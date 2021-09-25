/**
 * Determine type of page for seo
 */
export const getPageType = async (type: string, shop_id: number): Promise<string> => {
  switch (type) {
    case '/contact-us':
      return 'contact';
    case '/':
      return 'index';
    case `/menu/${shop_id}`:
      return 'menu';
    default:
      return type;
  }
};
