import React, { useState, useEffect } from 'react';
import { fetchPassageText } from '../services/bibleAPI';
import AudioPlayer from './AudioPlayer';

const ReadingView = ({ readingData }) => {
  const [contents, setContents] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [audioText, setAudioText] = useState('');

  useEffect(() => {
    if (!readingData) return;

    const loadReadings = async () => {
      setLoading(true);
      setError(null);
      const newContents = {};

      try {
        // Fetch all readings in parallel
        const promises = readingData.readings.map(async (reading) => {
          const text = await fetchPassageText(reading.reference);
          newContents[reading.reference] = text;
        });

        await Promise.all(promises);
        setContents(newContents);
      } catch (err) {
        console.error("Failed to load readings", err);
        setError("Failed to load Bible text. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    loadReadings();
  }, [readingData]);

  const handleListen = () => {
    // Strip HTML tags and combine all readings into plain text
    let plainText = '';
    
    if (readingData && readingData.readings) {
      readingData.readings.forEach((reading) => {
        const htmlContent = contents[reading.reference] || '';
        // Remove HTML tags and clean up text
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        const text = tempDiv.textContent || tempDiv.innerText || '';
        plainText += text + ' ';
      });
    }

    setAudioText(plainText.trim());
    setShowAudioPlayer(true);
  };

  if (!readingData) {
    return (
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 pb-24 md:pb-8">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Reading Plan Found</h2>
          <p className="text-gray-600">
            We don't have a reading plan for this date yet. Please try selecting a date in early January.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 pb-24 md:pb-8">
      {/* Listen Button */}
      {!loading && !error && Object.keys(contents).length > 0 && (
        <div className="mb-6 flex justify-center">
          <button
            onClick={handleListen}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.414a2 2 0 002.828 0L12 11.414l3.586 3.586a2 2 0 002.828 0l6-6a2 2 0 000-2.828l-6-6a2 2 0 00-2.828 0L12 4.586 8.414 1a2 2 0 00-2.828 0l-6 6a2 2 0 000 2.828l6 6z" />
            </svg>
            <span>Listen to Today's Reading</span>
          </button>
        </div>
      )}

      <div className="space-y-6">
        {readingData.readings.map((reading, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
              <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                {reading.label}
              </span>
              <span className="text-lg font-bold text-gray-900">
                {reading.reference}
              </span>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed bible-text">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: contents[reading.reference] || '' }} />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Audio Player */}
      {showAudioPlayer && (
        <AudioPlayer 
          text={audioText} 
          onClose={() => setShowAudioPlayer(false)} 
        />
      )}
    </main>
  );
};

export default ReadingView;