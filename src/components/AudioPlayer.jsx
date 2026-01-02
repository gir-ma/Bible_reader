import React, { useState, useEffect } from 'react';

const AudioPlayer = ({ text, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    // Load voices
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    // Voices might load asynchronously
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handlePlayPause = () => {
    if (!isPlaying) {
      // Start playing
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = speed;
      
      // Prefer English voices
      const englishVoice = voices.find(v => v.lang.startsWith('en'));
      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsPaused(false);
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };

      utterance.onerror = (e) => {
        console.error('Speech error:', e);
        setIsPlaying(false);
        setIsPaused(false);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      if (isPaused) {
        // Resume
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        // Pause
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
    
    // If currently playing, restart with new speed
    if (isPlaying) {
      handleStop();
      setTimeout(() => {
        handlePlayPause();
      }, 100);
    }
  };

  const speeds = [0.75, 1.0, 1.25, 1.5];

  return (
    <div className="fixed bottom-20 md:bottom-8 left-4 right-4 md:left-auto md:right-8 md:w-96 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-30">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Audio Player</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close player"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-center space-x-4 mb-4">
        <button
          onClick={handleStop}
          disabled={!isPlaying}
          className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Stop"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="6" width="12" height="12" />
          </svg>
        </button>

        <button
          onClick={handlePlayPause}
          className="p-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-lg"
          aria-label={isPaused ? "Resume" : isPlaying ? "Pause" : "Play"}
        >
          {!isPlaying || isPaused ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          )}
        </button>
      </div>

      <div className="mb-2">
        <label className="text-sm text-gray-600 font-medium mb-2 block">Speed</label>
        <div className="flex space-x-2">
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => handleSpeedChange(s)}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                speed === s
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {isPlaying && (
        <div className="flex items-center text-sm text-gray-600 mt-3">
          <div className="flex items-center">
            <div className="animate-pulse mr-2">
              <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
            </div>
            <span>{isPaused ? 'Paused' : 'Playing...'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
