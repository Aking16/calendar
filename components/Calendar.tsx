"use client";

import { useState } from 'react';
import moment, { Moment } from "moment-jalaali";
import { Button } from './ui/button';

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
    console.log((selectedDate.startOf('jMonth').day() + 1) % 7);
    const firstDayOfMonth = (selectedDate.startOf('jMonth').day() + 1) % 7; // Start of the month
    const blanks = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      blanks.push(<td key={i}>  </td>);
    }

    const daysInMonthArray = [];
    for (let d = 1; d <= daysInMonth; d++) {
      daysInMonthArray.push(
        <td key={d} className="day">{d}</td>
      );
    }

    const totalSlots = [...blanks, ...daysInMonthArray];
    let rows: any[] = [];
    let cells: any[] = [];

    totalSlots.forEach((row, i) => {
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
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="flex gap-5">
        <p>{months[selectedDate.jMonth()]}</p>
        <p>{selectedDate.jYear()}</p>
      </div>
      <div className="flex gap-5">
        <Button onClick={handlePrevMonth}>Previous Month</Button>
        <Button onClick={handleNextMonth}>Next Month</Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>شنبه</th>
            <th>یک شنبه</th>
            <th>دوشنبه</th>
            <th>سه شنبه</th>
            <th>چهار شنبه</th>
            <th>پنچ شنبه</th>
            <th>جمعه</th>
          </tr>
        </thead>
        <tbody>{renderCalendar()}</tbody>
      </table>
    </div>
  );
}

export default PersianCalendar;
