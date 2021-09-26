import moment from 'moment';
import { ICategory } from '../interfaces/common/category.common.interfaces';
import { ICheckoutOrderTypes } from '../redux/slices/checkout.slices.redux';

/**
 *
 * @param menuCategories Returning all categories from menu api
 * @param orderType Selected ordertype by customer
 * @returns Filtered categories depends on orderTypes
 */
export const filterViewableCategoriesByOrderType: (categories: Array<ICategory>, orderType: string) => Array<ICategory> = (
  menuCategories,
  orderType,
) => {
  const properOrderType = (orderType === 'DINE_IN' ? 'DINEIN' : orderType) as ICheckoutOrderTypes;

  const alwaysAvailableCategories = menuCategories.filter((category) => category.availability.always);

  const specificCategories: ICategory[] = [];
  const currentDay = moment();

  /**
   * Loop through specificCategories for update the array
   *
   * Category filteration based on day, time and selected order type
   *
   * Priority based list below
   * day -> High
   * time -> Medium
   * ordertype -> Low
   *
   */
  menuCategories
    .filter((category) => !category.availability.always)
    .forEach((category) => {
      /**
       * With moment object
       * dayCount -> [0,1,2,3,4,5,6] -> moment().day() -> 5
       * weekDayStart -> Sunday[0]
       */

      // ?? For current time is applicable for category available
      if (category.availability.time) {
        const start = moment(`${category.availability.time.start.slice(0, 2)}:${category.availability.time.start.slice(2, 4)}`, 'h:mm a');
        const end = moment(`${category.availability.time.end.slice(0, 2)}:${category.availability.time.end.slice(2, 4)}`, 'h:mm a');

        // ?? Checking Time and correspond order type
        if (currentDay.isBetween(start, end) && category.availability.order_type_?.includes(properOrderType))
          specificCategories.push(category);
      }
      // ?? Without time only order type
      else if (!category.availability?.time && category.availability.order_type_?.includes(properOrderType)) {
        specificCategories.push(category);
      }
    });

  return [...specificCategories, ...alwaysAvailableCategories];
};
