"use client";
import React, { useState } from "react";

interface CalendarProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  className?: string;
}

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  minDate,
  maxDate,
  disabledDates = [],
  className = ""
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    
    return disabledDates.some(disabledDate => 
      date.toDateString() === disabledDate.toDateString()
    );
  };

  const isDateSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const isToday = (date: Date) => {
    return date.toDateString() === new Date().toDateString();
  };

  const handleDateClick = (date: Date) => {
    if (!isDateDisabled(date) && onDateSelect) {
      onDateSelect(date);
    }
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const disabled = isDateDisabled(date);
      const selected = isDateSelected(date);
      const today = isToday(date);

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(date)}
          disabled={disabled}
          className={`
            p-2 text-sm rounded-lg transition-colors
            ${disabled ? "text-gray-400 cursor-not-allowed" : "hover:bg-brand-100 dark:hover:bg-brand-900"}
            ${selected ? "bg-brand-500 text-white hover:bg-brand-600" : ""}
            ${today && !selected ? "bg-brand-100 dark:bg-brand-900 font-semibold" : ""}
          `}
          aria-label={`Select date ${day}`}
          aria-pressed={selected}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePreviousMonth}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Previous month"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Next month"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-xs font-medium text-gray-500 dark:text-gray-400 text-center p-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default Calendar;
