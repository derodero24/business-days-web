import { addBusinessDays, format, parseISO } from 'date-fns';

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
  const date = format(addBusinessDays(eventDay, 1), 'yyyy-MM-dd');
  return shiftDate(date, businessDaysLater, 0);
};

/**
 * 祝日を考慮して◯営業日後の日付を返す
 * @param date
 * @param businessDaysLater
 * @param count
 * @returns
 */
const shiftDate = (
  date: string,
  businessDaysLater: number,
  count: number,
): string => {
  if (JapaneseHolidays.includes(date)) {
    date = getNextDate(date);
    return shiftDate(date, businessDaysLater, count);
  }

  count++;
  if (count === businessDaysLater) {
    return date;
  }

  date = getNextDate(date);

  return shiftDate(date, businessDaysLater, count);
};

/**
 * 翌営業日を返す
 * @param date
 * @returns
 */
const getNextDate = (date: string) => {
  return format(
    addBusinessDays(
      new Date(
        parseISO(date).getFullYear(),
        parseISO(date).getMonth(),
        parseISO(date).getDate(),
      ),
      1,
    ),
    'yyyy-MM-dd',
  );
};

// 内閣府から日本の祝日をCSVでダウンロード出来るので、とりあえずその内容を使う
// https://www8.cao.go.jp/chosei/shukujitsu/gaiyou.html
const JapaneseHolidays: string[] = [
  '2022-01-01',
  '2022-01-10',
  '2022-02-11',
  '2022-02-23',
  '2022-03-21',
  '2022-04-29',
  '2022-05-03',
  '2022-05-04',
  '2022-05-05',
  '2022-07-18',
  '2022-08-11',
  '2022-09-19',
  '2022-09-23',
  '2022-10-10',
  '2022-11-03',
  '2022-11-23',
  '2023-01-01',
  '2023-01-02',
  '2023-01-09',
  '2023-02-11',
  '2023-02-23',
  '2023-03-21',
  '2023-04-29',
  '2023-05-03',
  '2023-05-04',
  '2023-05-05',
  '2023-07-17',
  '2023-08-11',
  '2023-09-18',
  '2023-09-23',
  '2023-10-09',
  '2023-11-03',
  '2023-11-23',
];
