import * as holiday_jp from '@holiday-jp/holiday_jp';
import { addBusinessDays } from 'date-fns';

/**
 * 作業完了予定日を返す
 * @param businessDaysLater
 * @returns
 */
export const getCompletionDate = (
  eventDay: Date,
  businessDaysLater: number,
) => {
  // 基準日から◯営業日以降なので、本日+1日からスタート
  return shiftDate(addBusinessDays(eventDay, 1), businessDaysLater, 0);
};

/**
 * 祝日を考慮して◯営業日後の日付を返す
 * @param date
 * @param businessDaysLater
 * @param count
 * @returns
 */
const shiftDate = (
  date: Date,
  businessDaysLater: number,
  count: number,
): Date => {
  if (holiday_jp.isHoliday(date)) {
    date = addBusinessDays(date, 1);
    return shiftDate(date, businessDaysLater, count);
  }

  count++;
  if (count === businessDaysLater) {
    return date;
  }

  date = addBusinessDays(date, 1);
  return shiftDate(date, businessDaysLater, count);
};
