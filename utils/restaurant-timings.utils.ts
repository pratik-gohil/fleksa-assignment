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
    const weekDay = moment(date.value).format('dddd').toUpperCase();
    const day = timingsData[weekDay] as ITimingsDay;

    const deliveryType = type === 'DELIVERY';

    // TODO: Set adjacent time interval depends on order type
    const adjacentPeriodIntervel = isReservation ? 30 : 10;
    const initialDifference = deliveryType ? +interval.delivery_time : +interval.pickup_time;

    let timingList: Array<{ value: string; label: string; break?: boolean }> = [];

    // TODO: If delivery time available of the shop pick delivery object instead of shop object
    const processPayload = deliveryType ? day.delivery : day.shop;

    // ! Check if type is delivery but the delivery not available in the shop then return empty array for delivery timing
    if (!processPayload.availability || !processPayload.timings) return [];

    // TODO: Loop throw each timing object for generating list
    processPayload.timings.forEach((t, i) => {
      // For adding break intervals
      if (processPayload.timings?.[i - 1] && isReservation && timingList.length) {
        console.log('break : ', processPayload.timings[i - 1].close, ' to ', processPayload.timings[i].open);

        const break_start = moment(processPayload.timings[i - 1].close, 'h:mm a');
        const break_end = moment(processPayload.timings[i].open, 'h:mm a');

        while (break_start < break_end) {
          timingList.push({
            value: break_start.format('HH:mm'),
            label: `${break_start.format('HH:mm')} - ${break_start.add(adjacentPeriodIntervel, 'm').format('HH:mm')}`,
            break: true,
          });
        }
      }

      //   TODO: Round current time to the nearest 15 or 45
      let now = moment();
      const open = moment(t.open, 'h:mm a');
      const close = moment(t.close, 'h:mm a');
      const todayDayCheck = weekDay === now.format('dddd').toUpperCase();

      let nearestRound = isReservation ? 10 : 10;
      let temp = nearestRound;
      const skipMinutes = deliveryType ? 30 : 10; // ? want to skip the initial time addition

      // TODO: Only for current day
      if (todayDayCheck) {
        const minute = now.minutes();

        // TODO: Set adjacent delivery or pickup initial time
        temp = Math.ceil(minute / nearestRound) * nearestRound;

        if (close.diff(now, 'minutes') + 1 > skipMinutes + initialDifference)
          now.set({
            hours: now.hours(),
            minutes: isReservation ? temp : temp + initialDifference,
          });
        else
          now.set({
            hours: now.hours(),
            minutes: temp,
          });
      }

      let setStartingDiff = parseInt(`${open.minutes() + initialDifference / 10}`, 10) * 10;

      let trackTime = moment(`${open.hours()}:${setStartingDiff % 60}`, 'h:mm a');

      setStartingDiff = parseInt(`${now.minutes() / 10}`, 10) * 10;

      // TODO: Check now time includes shop opening time or not
      if (trackTime <= now && todayDayCheck) trackTime = moment(`${now.hours()}:${setStartingDiff}`, 'h:mm a');

      while (trackTime < close && close.diff(trackTime, 'minutes') + 1 >= skipMinutes)
        // TODO: Add the time to the list
        timingList.push({
          value: trackTime.format('HH:mm'),
          label: `${trackTime.format('HH:mm')} - ${trackTime.add(adjacentPeriodIntervel, 'm').format('HH:mm')}`,
          break: false,
        });

      // TODO: Merge all arrya into single array
      timingList = timingList.concat(...timingList);

      // TODO: Change asap for current day first time of the time list
      if (todayDayCheck && timingList.length) timingList[0].label = language === 'english' ? 'As soon as possible' : 'So schnell wie möglich';
    });

    return timingList;
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
