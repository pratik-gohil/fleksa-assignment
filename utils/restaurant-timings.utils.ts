import moment, { Moment } from 'moment';
import { ITimings, ITimingsDay } from '../interfaces/common/shop.common.interfaces';
import { ICheckoutOrderTypes } from '../redux/slices/checkout.slices.redux';

export interface ILabelValue {
  value: string;
  label: string;
  break?: boolean;
}

export interface IPropsGenerateTimeList {
  date: ILabelValue;
  timingsData: ITimings;
  type: ICheckoutOrderTypes;
  isReservation?: boolean;
  interval: {
    pickup_time: number;
    delivery_time: number;
  };
}

export default class RestaurantTimingUtils {
  /**
   * @param {number} limit - Total length of dates list
   * @returns array of objects { value, label }
   */
  public generateDates(start: number = 0, limit: number = 5) {
    const tempDateList = [];

    while (start !== limit) {
      const date = moment().add(start, 'days');

      tempDateList.push({
        value: date.format('YYYY-MM-DD'),
        label: date.format('dddd, MMMM D'),
      });

      start += 1;
    }

    return tempDateList;
  }

  /**
   *
   * @param {object} time - Restaurant timing object for particular day {shop, delivery, weekDay}
   * @param {string} type - choosen delivery type
   * @param {object} interval - restaurant timing intervals
   * @returns - Array of array timing list for each period
   */
  public generateTimeList({ date, timingsData, type, interval, isReservation }: IPropsGenerateTimeList) {
    const weekDay = moment(date.value).format('dddd').toUpperCase();
    const day = timingsData[weekDay] as ITimingsDay;

    const deliveryType = type === 'DELIVERY';

    // TODO: Set adjacent time interval depends on order type
    const adjacentPeriodIntervel = isReservation ? 30 : 10;
    const initialDifference = deliveryType ? interval.delivery_time : interval.pickup_time;

    let timingList: Array<{ value: string; label: string; break?: boolean }> = [];

    // TODO: If delivery time available of the shop pick delivery object instead of shop object
    const processPayload = deliveryType ? day.delivery : day.shop;

    // ! Check if type is delivery but the delivery not available in the shop then return empty array for delivery timing
    if (!processPayload.availability) return [];

    // TODO: Loop throw each timing object for generating list
    processPayload.timings?.forEach((t, i) => {
      // For adding break intervals
      if (processPayload.timings && processPayload.timings[i - 1] && isReservation && timingList.length) {
        const break_start = moment(processPayload?.timings[i - 1].close, 'h:mm a');
        const break_end = moment(processPayload?.timings[i].open, 'h:mm a');

        while (break_start < break_end) {
          timingList.push({
            value: break_start.format('HH:mm'),
            label: `${break_start.format('HH:mm')} - ${break_start.add(adjacentPeriodIntervel, 'm').format('HH:mm')}`,
            break: true,
          });
        }
      }

      //   TODO: Round current time to the nearest 15 or 45
      const start = moment();
      const open = moment(t.open, 'h:mm a');
      const close = moment(t.close, 'h:mm a');
      const todayDayCheck = weekDay === start.format('dddd').toUpperCase();
      let temp: number | Moment = adjacentPeriodIntervel;

      // TODO: Only for current day
      if (todayDayCheck) {
        const minute = start.minutes();

        // TODO: Set adjacent delivery or pickup initial time
        while (minute >= temp) temp += adjacentPeriodIntervel;

        start.set({
          hours: start.hours(),
          minutes: isReservation ? temp : temp + initialDifference,
        });
      }

      // ? Reset varibale value into starting position and add prepare or delivery for initial tiem
      temp = open.add(initialDifference, 'm');
      let endTimeCheck = moment(open);

      // TODO: Check start time includes shop opening time or not
      if (open <= start && todayDayCheck) {
        temp = start;
        endTimeCheck = moment(start);
      }

      while (temp < close) {
        const endIncrement = endTimeCheck.add(adjacentPeriodIntervel, 'm');

        // ? Prevent unexpected last time showing in the list
        if (endIncrement > close && endIncrement.minutes() !== close.minutes()) break;

        // TODO: Add the time to the list
        timingList.push({ value: temp.format('HH:mm'), label: `${temp.format('HH:mm')} - ${endTimeCheck.format('HH:mm')}` });

        temp.add(adjacentPeriodIntervel, 'm');
      }

      // TODO: Merge all arrya into single array
      // timingList = [].concat(...timingList);

      // TODO: Change asap for current day first time of the time list
      // if (todayDayCheck && timingList.length) timingList[0].label = language === 'de' ? 'SOFORT' : 'ASAP';
    });

    return timingList;
  }
}

/**
 * @param timings Array of timings object
 * @returns boolean
 */
export function isShopOpened(timings: ITimings | null) {
  if (!timings) return false;

  const currentDay = moment();

  const weekDay = currentDay.format('dddd').toUpperCase();

  const currentDayTimings = timings[weekDay] as ITimingsDay;

  if (!currentDayTimings.shop.availability) return false;

  if (!currentDayTimings.shop.timings) return false;

  const open = moment(currentDayTimings.shop.timings[0].open, 'h:mm a');
  const close = moment(currentDayTimings?.shop?.timings[0]?.close, 'h:mm a');

  // ? Only send try if current time inbetween close and open
  return currentDay.isBetween(open, close);
}
