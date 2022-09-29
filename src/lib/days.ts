import * as holiday_jp from '@holiday-jp/holiday_jp';
import { addBusinessDays } from 'date-fns';

/**
 * 祝日を考慮して◯営業日後の日付を返す
 * @param date
 * @param businessDaysLater
 * @returns
 */
export const getCompletionDate = (
  date: Date,
  businessDaysLater: number,
): Date => {
  if (holiday_jp.isHoliday(date)) {
    date = addBusinessDays(date, 1);
    return getCompletionDate(date, businessDaysLater);
  }

  if (businessDaysLater === 0) {
    return date;
  }

  date = addBusinessDays(date, 1);
  return getCompletionDate(date, businessDaysLater - 1);
};
