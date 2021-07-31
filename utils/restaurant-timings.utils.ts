import moment from 'moment';
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
  language: string;
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
  public generateTimeList({ date, timingsData, type, interval, isReservation, language }: IPropsGenerateTimeList) {
    let result: Array<{ value: string; label: string; break?: boolean }> = [];

    const deliveryType = type === 'DELIVERY';

    const adjacentPeriodIntervel = isReservation ? 30 : 10;
    const nearestTopRound = isReservation ? 10 : 10;
    const tillAccept = deliveryType ? 30 : 15;
    const lastAsapMinutes = deliveryType ? 60 : 30;
    let currentlyOpened = false;

    const initialDifference = deliveryType ? interval.delivery_time : interval.pickup_time;

    const weekDay = moment(new Date(date.value)).format('dddd').toUpperCase();
    const day = timingsData[weekDay] as ITimingsDay;

    const processPayload = deliveryType ? day.delivery : day.shop;

    if (!processPayload.availability) return [];

    let now = moment();
    const isToday = weekDay === now.format('dddd').toUpperCase();

    // console.log(now.format('HH:mm'));

    processPayload?.timings?.forEach((t, _i) => {
      const open = moment(t.open, 'h:mm a');
      const close = moment(t.close, 'h:mm a');

      // console.log('diff => ', close.diff(now, 'minutes'), ' asap ', lastAsapMinutes);
      if (isToday) {
        //   TODO: Only process if current time not exceed closed time of break
        if (now > close || close.diff(now, 'minutes') + 1 < tillAccept) return;

        if (close.diff(now, 'minutes') <= lastAsapMinutes) {
          currentlyOpened = true;
          return result.push({
            value: now.format('HH:mm'),
            label: `${now.format('HH:mm')} - ${now.add(adjacentPeriodIntervel, 'm').format('HH:mm')}`,
            break: false,
          });
        }

        // TODO:  Only round if the now inbetween period
        if (open.diff(now, 'minutes') < 0) {
          const tmp = Math.ceil(now.minutes() / nearestTopRound) * nearestTopRound;

          now.set({
            hours: now.hours(),
            minutes: tmp + initialDifference,
          });

          currentlyOpened = true;
        } else
          now.set({
            hours: open.hours(),
            minutes: open.minutes() + initialDifference, // ? Add initial difference if it's last break time
          });
      } else now = open; // Set now to open if not today

      // TODO: generate till closing time
      while (now < close || close.diff(now, 'minutes') === 0) {
        result.push({
          value: now.format('HH:mm'),
          label: `${now.format('HH:mm')} - ${now.add(adjacentPeriodIntervel, 'm').format('HH:mm')}`,
          break: false,
        });

        // ? To prevent exceeded interval issue
        if (now > close) break;
      }

      result = ([] as Array<{ value: string; label: string; break?: boolean }>).concat(...result);
    });

    if (isToday && currentlyOpened && result.length) result[0].label = language === 'english' ? 'As soon as possible' : 'So schnell wie möglich';

    // console.log('result => ', result);

    return result;
  }
}

/**
 * @param timings Array of timings object
 * @returns boolean
 */
export const isShopOpened: any = (timings: ITimings, currentDay: moment.Moment, currentCount?: number) => {
  const dayName = currentDay.format('dddd').toUpperCase();
  const payload = (timings[dayName] as ITimingsDay).shop;
  const count = currentCount || 0;
  const isToday = count === 0;

  // TODO: Return after checked all the days
  if (count === 7)
    return {
      availability: false,
      isClosed: true,
    };

  if (!payload.availability) return isShopOpened(timings, moment(currentDay).add(1, 'days'), count + 1);

  // TODO: Check different conditions for today only
  if (isToday && payload.timings) {
    // TODO: Check currently before the open time
    if (currentDay.diff(moment(payload?.timings[0]?.open, 'h:mm a'), 'minutes') <= 0) {
      return {
        availability: false,
        next: {
          day: moment(payload?.timings[0]?.open, 'h:mm a').add(0, 'days').calendar().split(' at ')[0],
          time: moment(payload?.timings[0]?.open, 'h:mm a').format('HH:mm'),
        },
        isClosed: false,
      };
    }

    // TODO: Check currently between the break times
    else if (
      !!payload?.timings.length &&
      currentDay.isBetween(moment(payload?.timings[0]?.close, 'h:mm a'), moment(payload?.timings[1]?.open, 'h:mm a'))
    )
      return {
        availability: false,
        next: {
          day: moment(payload?.timings[1]?.open, 'h:mm a').add(0, 'days').calendar().split(' at ')[0],
          time: moment(payload?.timings[1]?.open, 'h:mm a').format('HH:mm'),
        },
        isClosed: false,
      };
    // TODO: Check currently after the close time
    else if (currentDay.diff(moment(payload?.timings[payload?.timings.length - 1]?.close, 'h:mm a'), 'minutes') >= 0)
      return isShopOpened(timings, moment(currentDay).add(1, 'days'), count + 1);
    else
      return {
        availability: true,
        isClosed: false,
      };
  } else if (payload.timings) {
    // TODO: Just simply return the next day payload
    return {
      availability: false,
      isClosed: false,
      next: {
        day: currentDay.add(0, 'days').calendar().split(' at ')[0],
        time: moment(payload?.timings[0]?.open, 'h:mm a').format('HH:mm'),
        dayNumber: count > 1 ? currentDay.add(0, 'days').format('D') : undefined,
      },
    };
  }
};
