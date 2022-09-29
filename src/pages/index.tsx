import { format } from 'date-fns';
import ja from 'date-fns/locale/ja';
import Head from 'next/head';
import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { AiFillCalendar } from 'react-icons/ai';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { ImArrowDown } from 'react-icons/im';

import Layout from '../components/layouts/Layout';
import { getCompletionDate } from '../lib/days';

import type { NextPageWithLayout } from 'next';

const CustomInput = forwardRef((props, ref: ForwardedRef<HTMLInputElement>) => (
  <div className="relative">
    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <AiFillCalendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
    </div>
    <input
      {...props}
      ref={ref}
      type="text"
      className="form-input pl-10"
      placeholder="Select date"
      readOnly
    />
  </div>
));
CustomInput.displayName = 'CustomInput';

const Home: NextPageWithLayout = () => {
  const [eventDay, setEventDay] = useState(new Date(Date.now()));
  const [howManyDays, setHowManyDays] = useState('3');
  const [resultDay, setResultDay] = useState(eventDay);

  useEffect(() => {
    const completionDate = getCompletionDate(eventDay, parseInt(howManyDays));
    setResultDay(new Date(completionDate));
  }, [eventDay, howManyDays]);

  return (
    <>
      <Head>
        <title>○営業日後はいつ？</title>
        <meta
          name="description"
          content="基準日から○営業日後の日付を算出します。"
        />
      </Head>
      <main className="grow px-6 py-2">
        <div className="mx-auto max-w-2xl">
          <h1 className="pb-8 text-xl">○営業日後はいつ？</h1>

          <form className="space-y-4">
            <label className="form-label">
              基準日
              <DatePicker
                locale={ja}
                selected={eventDay}
                onChange={day => day && setEventDay(day)}
                dateFormat="yyyy/MM/dd (EEE)"
                previousMonthButtonLabel={
                  <HiChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-200" />
                }
                nextMonthButtonLabel={
                  <HiChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-200" />
                }
                customInput={<CustomInput />}
              />
            </label>

            <label className="form-label">
              何営業日後？
              <div className="relative">
                <input
                  type="number"
                  value={howManyDays}
                  min="1"
                  max="10000"
                  onChange={e => {
                    const value = e.target.valueAsNumber;
                    const next = value ? (value < 10_000 ? value : 10_000) : 1;
                    setHowManyDays(next.toFixed(0));
                  }}
                  className="form-input pl-4 pr-32"
                />
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center pl-3">
                  営業日後
                </div>
              </div>
            </label>
          </form>

          <div className="my-6 flex w-full justify-center">
            <ImArrowDown className="text-4xl" />
          </div>

          <div className="text-center">
            <p>
              <span>{format(eventDay, 'yyyy/MM/dd')}</span> から
              <span> {howManyDays}</span> 営業日後は...
            </p>
            <p className="py-2 text-2xl font-bold">
              {format(resultDay, 'yyyy/MM/dd (EEE)', { locale: ja })}
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

Home.getLayout = page => <Layout>{page}</Layout>;

export default Home;
