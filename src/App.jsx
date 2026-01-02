import React from 'react';
import Header from './components/Header';
import ReadingView from './components/ReadingView';
import Navigation from './components/Navigation';
import { useReadingPlan } from './hooks/useReadingPlan';

function App() {
  const { 
    currentDate, 
    todaysReading, 
    nextDay, 
    prevDay, 
    goToDate,
    isToday 
  } = useReadingPlan();

  const handleTodayClick = () => {
    goToDate(new Date());
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        currentDate={currentDate} 
        onNext={nextDay} 
        onPrev={prevDay}
        isToday={isToday}
      />
      <Navigation onTodayClick={handleTodayClick} isTodayActive={isToday} />
      <ReadingView readingData={todaysReading} />
    </div>
  );
}

export default App;
