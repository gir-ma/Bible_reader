import { useState } from 'react';
import { readingPlan } from '../data/readingPlan';

export const useReadingPlan = () => {
  // Initialize with today's date
  const [currentDate, setCurrentDate] = useState(new Date());

  // Derive today's reading directly from the current date (no useEffect needed)
  const month = currentDate.getMonth() + 1; // 0-indexed to 1-indexed
  const day = currentDate.getDate();
  const todaysReading = readingPlan.find(p => p.month === month && p.day === day) || null;

  const nextDay = () => {
    const next = new Date(currentDate);
    next.setDate(currentDate.getDate() + 1);
    setCurrentDate(next);
  };

  const prevDay = () => {
    const prev = new Date(currentDate);
    prev.setDate(currentDate.getDate() - 1);
    setCurrentDate(prev);
  };

  const goToDate = (date) => {
    setCurrentDate(date);
  };

  const isToday = () => {
    const today = new Date();
    return currentDate.getDate() === today.getDate() &&
           currentDate.getMonth() === today.getMonth() &&
           currentDate.getFullYear() === today.getFullYear();
  };

  return {
    currentDate,
    todaysReading,
    nextDay,
    prevDay,
    goToDate,
    isToday: isToday()
  };
};
