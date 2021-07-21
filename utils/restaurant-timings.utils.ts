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

    const initialDifference = deliveryType ? interval.delivery_time : interval.pickup_time;

    const weekDay = moment(new Date(date.value)).format('dddd').toUpperCase();
    const day = timingsData[weekDay] as ITimingsDay;

    const processPayload = deliveryType ? day.delivery : day.shop;

    if (!processPayload.availability) return [];

    let now = moment(new Date('07/21/2021, 3:46:00 PM'));
    const isToday = weekDay === now.format('dddd').toUpperCase();

    processPayload?.timings?.forEach((t, i) => {
      const open = moment(t.open, 'h:mm a');
      const close = moment(t.close, 'h:mm a');

      if (isToday) {
        //   TODO: Only process if current time not exceed closed time of break
        if (now > close || close.diff(now, 'minutes') <= tillAccept) return;

        if (close.diff(now, 'minutes') <= lastAsapMinutes)
          return result.push({
            value: now.format('HH:mm'),
            label: `${now.format('HH:mm')} - ${now.add(adjacentPeriodIntervel, 'm').format('HH:mm')}`,
            break: false,
          });

        console.log(open.diff(now, 'minutes'));
        // TODO:  Only round if the now inbetween period
        if (open.diff(now, 'minutes') < 0) {
          const tmp = Math.ceil(now.minutes() / nearestTopRound) * nearestTopRound;

          now.set({
            hours: now.hours(),
            minutes: tmp + initialDifference,
          });
        } else
          now.set({
            hours: open.hours(),
            minutes: i === 1 ? open.minutes() + initialDifference : open.minutes(), // ? Add initial difference if it's last break time
          });
      } else now = open; // Set now to open if not today

      // TODO: generate till closing time
      while (now < close)
        result.push({
          value: now.format('HH:mm'),
          label: `${now.format('HH:mm')} - ${now.add(adjacentPeriodIntervel, 'm').format('HH:mm')}`,
          break: false,
        });

      result = ([] as Array<{ value: string; label: string; break?: boolean }>).concat(...result);
    });

    if (isToday && result.length) result[0].label = language === 'english' ? 'As soon as possible' : 'So schnell wie möglich';

    return result;
  }
}

/**
 * @param timings Array of timings object
 * @returns boolean
 */
export function isShopOpened(timings: ITimings | null) {
  let availability = {
    available: false,
    next: {
      day: '',
      time: '',
    },
  };

  if (!timings) return availability;

  const currentDay = moment();
  const weekDay = currentDay.format('dddd').toUpperCase();
  const currentDayTimings = timings[weekDay] as ITimingsDay;

  if (!currentDayTimings?.shop.availability || !currentDayTimings.shop.timings) return goNextDay(timings, currentDay);

  // TODO: Check currently before the open time
  if (currentDay.diff(moment(currentDayTimings.shop?.timings[0]?.open, 'h:mm a'), 'minutes') <= 0) {
    return {
      ...availability,
      next: {
        day: moment(currentDayTimings?.shop?.timings[currentDayTimings.shop?.timings.length - 1]?.open, 'h:mm a').format('dddd'),
        time: moment(currentDayTimings?.shop?.timings[currentDayTimings.shop?.timings.length - 1]?.open, 'h:mm a').format('HH:mm'),
      },
    };
  }
  // TODO: Check currently after the close time
  else if (currentDay.diff(moment(currentDayTimings.shop?.timings[currentDayTimings.shop?.timings.length - 1]?.close, 'h:mm a'), 'minutes') >= 0) {
    return goNextDay(timings, currentDay);
  }
  // TODO: Check currently between the break times
  else if (
    currentDay.isBetween(moment(currentDayTimings.shop?.timings[0]?.close, 'h:mm a'), moment(currentDayTimings.shop?.timings[1]?.open, 'h:mm a')) &&
    !!currentDayTimings.shop?.timings.length
  ) {
    return {
      ...availability,
      next: {
        day: moment(currentDayTimings?.shop?.timings[1]?.open, 'h:mm a').add(0, 'days').calendar().split(' at ')[0],
        time: moment(currentDayTimings?.shop?.timings[1]?.open, 'h:mm a').format('HH:mm'),
      },
    };
  } else {
    return {
      available: true,
    };
  }
}

const goNextDay = (timings: ITimings, currentDay: moment.Moment) => {
  const nextDay = currentDay.add(1, 'days');
  let day = nextDay.format('dddd').toUpperCase();

  while (true) {
    const processDay = timings[day] as ITimingsDay;

    if (!processDay?.shop.timings || !processDay?.shop.availability) {
      day = nextDay.add(1, 'days').format('dddd').toUpperCase();

      continue;
    } else
      return {
        available: false,
        next: {
          day: nextDay.add(0, 'days').calendar().split(' at ')[0],
          time: moment(processDay?.shop?.timings[0]?.open, 'h:mm a').format('HH:mm'),
        },
      };
  }
};
