import moment, { Moment } from 'moment';
import { ITimings, ITimingsDay } from '../interfaces/common/shop.common.interfaces';
import { ICheckoutOrderTypes } from '../redux/slices/checkout.slices.redux';

export interface ILabelValue {
  value: string
  label: string
}

export interface IPropsGenerateTimeList {
  date: ILabelValue
  timingsData: ITimings
  type: ICheckoutOrderTypes
  interval: {
    pickup_time: number
    delivery_time: number
  }
}

export default class RestaurantTimingUtils {
  /**
   * @param {number} limit - Total length of dates list
   * @returns array of objects { value, label }
   */
  public generateDates(start: number=0, limit: number=5) {
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
  public generateTimeList({ date, timingsData, type, interval }: IPropsGenerateTimeList) {

    const weekDay = moment(date.value).format('dddd').toUpperCase();
    const day = timingsData[weekDay] as ITimingsDay;

    const deliveryType = type === 'DELIVERY';

    // TODO: Set adjacent time interval depends on order type
    const adjacentPeriodIntervel = 10;
    const initialDifference = deliveryType ? interval.delivery_time : interval.pickup_time;

    let timingList: Array<{ value: string; label: string }> = [];

    // TODO: If delivery time available of the shop pick delivery object instead of shop object
    const processPayload = deliveryType ? day.delivery : day.shop;

    // ! Check if type is delivery but the delivery not available in the shop then return empty array for delivery timing
    if (!processPayload.availability) return [];

    // TODO: Loop throw each timing object for generating list
    processPayload.timings?.forEach((t) => {
      //   TODO: Round current time to the nearest 15 or 45
      const start = moment();
      const open = moment(t.open, 'h:mm a');
      const close = moment(t.close, 'h:mm a');
      const todayDayCheck = weekDay === start.format('dddd').toUpperCase();
      let temp: number|Moment = adjacentPeriodIntervel;

      // TODO: Only for current day
      if (todayDayCheck) {
        const minute = start.minutes();

        // TODO: Set adjacent delivery or pickup initial time
        while (minute >= temp) temp += adjacentPeriodIntervel;

        start.set({
          hours: start.hours(),
          minutes: temp + initialDifference,
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