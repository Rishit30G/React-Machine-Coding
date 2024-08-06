import Cell from './Cell'; 
import { endOfMonth, startOfMonth, differenceInDays, format, setDate } from 'date-fns';

const daysofWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface Props{
  value?: Date;
  onChange: (value: Date) => void;
}
const Calendar = ({value = new Date(), onChange}: Props) => {

  const startDate = startOfMonth(value);
  const endDate = endOfMonth(value);
  const numDays = differenceInDays(endDate, startDate) + 1;

  //Gets the number corresponding to the day of the week of the first day of the month
  const prefixDays = startDate.getDay();
  const suffixDays = 6 - endDate.getDay();

  const prevMonth = () => {
    const newDate = new Date(value);
    newDate.setMonth(value.getMonth() - 1);
    onChange(newDate);
  }

  const nextMonth = () => {
    const newDate = new Date(value);
    newDate.setMonth(value.getMonth() + 1);
    onChange(newDate);
  }

  const prevYear = () => {
    const newDate = new Date(value);
    newDate.setFullYear(value.getFullYear() - 1);
    onChange(newDate);
  }

  const nextYear = () => {
    const newDate = new Date(value);
    newDate.setFullYear(value.getFullYear() + 1);
    onChange(newDate);
  }

  const handleClickDate = (index: number) => {
    const date = setDate(value, index);
    onChange(date);
  }

  return (
    <div className="w-[400px] border">
        <div className="grid grid-cols-7 items-center justify-center text-center border-t border-l">
            <Cell onClick={prevYear}>{'<<'}</Cell>
            <Cell onClick={prevMonth}>{"<"}</Cell>
            <Cell className="col-span-3">{format(value, 'LLLL yyyy')}</Cell>
            <Cell onClick={nextMonth}>{">"}</Cell>
            <Cell onClick={nextYear}>{">>"}</Cell>
              {daysofWeek.map((day) => (
                <Cell className="text-sm font-bold" key={day}>{day}</Cell>
              ))}
              {Array.from({length: prefixDays}).map((_, index) => (
                <Cell key={index}></Cell>
              ))}
              {Array.from({length: numDays}).map((_, index) => {
                const isCurrentDate = index + 1 === value.getDate();
                return (
                    <Cell onClick={() => handleClickDate(index + 1)} key={index} isActive={isCurrentDate}>{index + 1}</Cell>
                );
            })}
              {Array.from({length: suffixDays}).map((_, index) => (
                <Cell key={index}></Cell>
              ))}
        </div>
    </div>
  )
}

export default Calendar