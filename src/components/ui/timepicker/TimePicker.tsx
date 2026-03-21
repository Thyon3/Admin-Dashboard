"use client";
import React, { useState } from "react";

interface TimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
  format?: "12h" | "24h";
  disabled?: boolean;
  className?: string;
}

const TimePicker: React.FC<TimePickerProps> = ({
  value = "12:00",
  onChange,
  format = "24h",
  disabled = false,
  className = ""
}) => {
  const [hours, setHours] = useState(() => {
    const [h] = value.split(":");
    return parseInt(h) || 0;
  });
  
  const [minutes, setMinutes] = useState(() => {
    const [, m] = value.split(":");
    return parseInt(m) || 0;
  });
  
  const [period, setPeriod] = useState<"AM" | "PM">(() => {
    if (format === "12h") {
      const [h] = value.split(":");
      const hour = parseInt(h) || 0;
      return hour >= 12 ? "PM" : "AM";
    }
    return "AM";
  });

  const handleHoursChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newHours = parseInt(e.target.value);
    setHours(newHours);
    updateTime(newHours, minutes, period);
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMinutes = parseInt(e.target.value);
    setMinutes(newMinutes);
    updateTime(hours, newMinutes, period);
  };

  const handlePeriodChange = (newPeriod: "AM" | "PM") => {
    setPeriod(newPeriod);
    updateTime(hours, minutes, newPeriod);
  };

  const updateTime = (h: number, m: number, p: "AM" | "PM") => {
    let finalHours = h;
    if (format === "12h" && p === "PM" && h !== 12) {
      finalHours = h + 12;
    } else if (format === "12h" && p === "AM" && h === 12) {
      finalHours = 0;
    }
    
    const timeString = `${finalHours.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
    onChange?.(timeString);
  };

  const generateHourOptions = () => {
    const options = [];
    const max = format === "12h" ? 12 : 23;
    const min = format === "12h" ? 1 : 0;
    
    for (let i = min; i <= max; i++) {
      options.push(
        <option key={i} value={i}>
          {i.toString().padStart(2, "0")}
        </option>
      );
    }
    return options;
  };

  const generateMinuteOptions = () => {
    const options = [];
    for (let i = 0; i < 60; i += 5) {
      options.push(
        <option key={i} value={i}>
          {i.toString().padStart(2, "0")}
        </option>
      );
    }
    return options;
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <select
        value={format === "12h" ? (hours === 12 ? 12 : (period === "PM" && hours !== 12 ? hours - 12 : hours)) : hours}
        onChange={handleHoursChange}
        disabled={disabled}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
        aria-label="Hours"
      >
        {generateHourOptions()}
      </select>
      
      <span className="text-gray-500 dark:text-gray-400 text-xl font-bold">:</span>
      
      <select
        value={minutes}
        onChange={handleMinutesChange}
        disabled={disabled}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
        aria-label="Minutes"
      >
        {generateMinuteOptions()}
      </select>
      
      {format === "12h" && (
        <select
          value={period}
          onChange={(e) => handlePeriodChange(e.target.value as "AM" | "PM")}
          disabled={disabled}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          aria-label="AM/PM"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      )}
    </div>
  );
};

export default TimePicker;
