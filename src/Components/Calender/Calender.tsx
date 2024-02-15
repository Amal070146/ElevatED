import { useState } from "react";
import styles from "./Calender.module.css";
import { JSX } from "react/jsx-runtime";
import { IoArrowRedoCircleSharp } from "react-icons/io5";
import { IoArrowUndoCircle } from "react-icons/io5";



export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month: number, year: number) =>
    new Date(year, month, 1).getDay();

  const addMonths = (numMonths: number) => {
    const newDate = new Date(
      currentDate.setMonth(currentDate.getMonth() + numMonths)
    );
    setCurrentDate(new Date(newDate));
  };

  //   const addYears = (numYears: number) => {
  //     const newDate = new Date(
  //       currentDate.setFullYear(currentDate.getFullYear() + numYears)
  //     );
  //     setCurrentDate(new Date(newDate));
  //   };

  const renderCalendarDays = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const days = daysInMonth(month, year);
    const firstDay = firstDayOfMonth(month, year);

    let blanks = [];
    for (let i = 0; i < firstDay; i++) {
      blanks.push(<td key={`blank-${i}`} className={styles.calendarDay}></td>);
    }

    let daysArray = [];
    for (let d = 1; d <= days; d++) {
      const isToday =
        d === currentDay && month === currentMonth && year === currentYear;
      daysArray.push(
        <td
          key={`day-${d}`}
          className={`${styles.calendarDay} ${
            isToday ? styles.currentDay : ""
          }`}
        >
          {d}
        </td>
      );
    }

    const totalSlots = [...blanks, ...daysArray];
    let rows: any[][] = [];
    let cells: JSX.Element[] = [];

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

    return rows.map((d, i) => <tr key={i}>{d}</tr>);
  };

  return (
    <div className={styles.CalenderWrapper}>
      <div className={styles.CalendarHeader}>
        {/* <button onClick={() => addYears(-1)}>Prev Year</button> */}
        <button onClick={() => addMonths(-1)}>
          <IoArrowUndoCircle />
        </button>
        <span>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </span>
        <button onClick={() => addMonths(1)}>
          <IoArrowRedoCircleSharp />
        </button>
        {/* <button onClick={() => addYears(1)}>Next Year</button> */}
      </div>
      <table>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>{renderCalendarDays()}</tbody>
      </table>
    </div>
  );
};
