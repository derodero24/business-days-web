import * as holiday_jp from '@holiday-jp/holiday_jp';
import * as fns from 'date-fns';

export interface HolidaysOption {
  mon: boolean;
  tue: boolean;
  wed: boolean;
  thu: boolean;
  fri: boolean;
  sat: boolean;
  sun: boolean;
  jp: boolean;
}

/**
 * 祝日を考慮して◯営業日後の日付を返す
 * @param date
 * @param businessDaysLater
 * @returns
 */
export function getCompletionDate(
  date: Date,
  businessDaysLater: number,
  holidays: HolidaysOption,
): Date {
  // 全て休日はNG
  if (isAllDayOff(holidays)) {
    throw new Error('Do not set every day as a holiday.');
  }

  // 休日はスキップ
  if (
    (holidays.mon && fns.isMonday(date)) ||
    (holidays.tue && fns.isTuesday(date)) ||
    (holidays.wed && fns.isWednesday(date)) ||
    (holidays.thu && fns.isThursday(date)) ||
    (holidays.fri && fns.isFriday(date)) ||
    (holidays.sat && fns.isSaturday(date)) ||
    (holidays.sun && fns.isSunday(date)) ||
    (holidays.jp && holiday_jp.isHoliday(date))
  ) {
    date = fns.addDays(date, 1);
    return getCompletionDate(date, businessDaysLater, holidays);
  }

  // 終了条件
  if (businessDaysLater === 0) {
    return date;
  }

  date = fns.addDays(date, 1);
  return getCompletionDate(date, businessDaysLater - 1, holidays);
}

/**
 * 毎日が休日になっているか
 */
export function isAllDayOff(holidays: HolidaysOption) {
  return Object.entries(holidays).every(([key, val]) =>
    key === 'jp' ? true : val,
  );
}
