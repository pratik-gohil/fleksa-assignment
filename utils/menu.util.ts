import moment from 'moment';
import { ICategory } from '../interfaces/common/category.common.interfaces';
import { ICheckoutOrderTypes } from '../redux/slices/checkout.slices.redux';

// ?? Setup default first day of the week[MONDAY]
moment.updateLocale('', {
  week: {
    dow: 1,
  },
});

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
    .filter((category) => !category.availability.always) // ? filter not always present categories
    .forEach((category) => {
      let isAvaialble = false;

      /**
       * With moment object
       * dayCount -> [0,1,2,3,4,5,6] -> moment().day() -> 5
       * weekDayStart -> Sunday[0]
       */
      if (category.availability.days) {
        isAvaialble = category.availability.days.includes(currentDay.weekday());

        if (!isAvaialble) return;

        // ?? For current time is applicable for category available
        if (category.availability.time) {
          const start = moment(`${category.availability.time.start.slice(0, 2)}:${category.availability.time.start.slice(2, 4)}`, 'h:mm a');
          const end = moment(`${category.availability.time.end.slice(0, 2)}:${category.availability.time.end.slice(2, 4)}`, 'h:mm a');

          // ?? Checking Time and correspond order type
          isAvaialble = currentDay.isBetween(start, end);

          if (!isAvaialble) return;
        }
      }

      // ?? For current time is applicable for category available
      if (!category.availability.days && category.availability.time) {
        const start = moment(`${category.availability.time.start.slice(0, 2)}:${category.availability.time.start.slice(2, 4)}`, 'h:mm a');
        const end = moment(`${category.availability.time.end.slice(0, 2)}:${category.availability.time.end.slice(2, 4)}`, 'h:mm a');

        // ?? Checking Time and correspond order type
        isAvaialble = currentDay.isBetween(start, end);

        if (!isAvaialble) return;
      }

      // ?? Without time only order type
      if (!!category.availability.order_type_?.length) {
        isAvaialble = category.availability.order_type_?.includes(properOrderType);

        if (!isAvaialble) return;
      }

      specificCategories.push(category);
    });

  return [...specificCategories, ...alwaysAvailableCategories];
};
