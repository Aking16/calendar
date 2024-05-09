"use client";

import { useState } from 'react';
import moment, { Moment } from "moment-jalaali";
import { Button } from './ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

moment.loadPersian({
  usePersianDigits: true,
  dialect: "persian-modern"
});
moment.locale();

export const months = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند"
];

function PersianCalendar() {
  const [selectedDate, setSelectedDate] = useState<Moment>(moment());

  function handleNextMonth() {
    setSelectedDate((prevDate: Moment) => moment(prevDate).add(1, 'jMonth'));
  };

  function handlePrevMonth() {
    setSelectedDate((prevDate: Moment) => moment(prevDate).subtract(1, 'jMonth'));
  };

  function renderCalendar() {
    const daysInMonth = moment.jDaysInMonth(selectedDate.jYear(), selectedDate.jMonth());
    const firstDayOfMonth = (selectedDate.startOf('jMonth').day() + 1) % 7;
    const blanks = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      blanks.push(<td>  </td>);
    }

    const daysInMonthArray = [];
    for (let day = 1; day <= daysInMonth; day++) {
      daysInMonthArray.push(
        <td>{day.toLocaleString("fa-IR")}</td>
      );
    }

    const totalSlots = [...blanks, ...daysInMonthArray];
    let rows: any[] = [];
    let cells: any[] = [];

    totalSlots.map((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        rows.push(cells);
      }
    });

    return rows.map((row, i) => (
      <tr key={i}>{row}</tr>
    ));
  };

  return (
    <div className="w-full flex flex-col h-screen justify-center items-center">
      <div className="flex justify-between">
        <div className="flex gap-5">
          <p>{months[selectedDate.jMonth()]}</p>
          <p>{selectedDate.jYear()}</p>
        </div>
        <div className="flex gap-5">
          <ChevronDown onClick={handlePrevMonth} />
          <ChevronUp onClick={handleNextMonth} />
        </div>
      </div>
      <table className="text-center border-separate border-spacing-x-5">
        <thead>
          <tr>
            <th>ش</th>
            <th>ی</th>
            <th>د</th>
            <th>س</th>
            <th>چ</th>
            <th>پ</th>
            <th>ج</th>
          </tr>
        </thead>
        <tbody>{renderCalendar()}</tbody>
      </table>
    </div>
  );
}

export default PersianCalendar;
