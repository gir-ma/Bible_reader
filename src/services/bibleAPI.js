import bibleData from '../data/kjv.json';

// Map full book names to JSON abbreviations
const BOOK_MAPPING = {
  'Genesis': 'gn',
  'Exodus': 'ex',
  'Matthew': 'mt',
  'Mark': 'mk',
  'Luke': 'lk',
  'John': 'jn',
  'Psalm': 'ps',
  'Psalms': 'ps',
  // Add more as needed
};

/**
 * Parses a reference string like "Genesis 1-2" and returns the book abbreviation and chapter numbers
 */
const parseReference = (reference) => {
  const lastSpaceIndex = reference.lastIndexOf(' ');
  const bookName = reference.substring(0, lastSpaceIndex);
  const chaptersPart = reference.substring(lastSpaceIndex + 1);
  
  const bookAbbrev = BOOK_MAPPING[bookName];
  if (!bookAbbrev) {
    console.error(`Book not found: ${bookName}`);
    return { bookAbbrev: null, chapters: [] };
  }

  const chapters = [];
  
  if (chaptersPart.includes('-')) {
    const [start, end] = chaptersPart.split('-').map(Number);
    for (let i = start; i <= end; i++) {
      chapters.push(i);
    }
  } else {
    chapters.push(Number(chaptersPart));
  }

  return { bookAbbrev, chapters };
};

/**
 * Fetches text for a passage from local JSON data
 */
export const fetchPassageText = async (reference) => {
  const { bookAbbrev, chapters } = parseReference(reference);
  
  if (!bookAbbrev || chapters.length === 0) {
    return '<p class="text-red-500">Invalid reference</p>';
  }

  try {
    // Find the book in the JSON data
    const book = bibleData.find(b => b.abbrev === bookAbbrev);
    
    if (!book) {
      return '<p class="text-red-500">Book not found in Bible data</p>';
    }

    let htmlContent = '';
    
    // Fetch each requested chapter
    chapters.forEach(chapterNum => {
      const chapterIndex = chapterNum - 1; // Arrays are 0-indexed
      const verses = book.chapters[chapterIndex];
      
      if (!verses) {
        htmlContent += `<p class="text-red-500">Chapter ${chapterNum} not found</p>`;
        return;
      }

      // Format the chapter with verse numbers
      htmlContent += `<div class="chapter mb-6">`;
      htmlContent += `<h3 class="text-xl font-bold mb-3">${book.name} ${chapterNum}</h3>`;
      
      verses.forEach((verseText, index) => {
        const verseNum = index + 1;
        htmlContent += `<p class="mb-2">
          <sup class="text-xs text-gray-400 mr-1">${verseNum}</sup>
          <span>${verseText}</span>
        </p>`;
      });
      
      htmlContent += `</div>`;
    });

    return htmlContent;
  } catch (error) {
    console.error('Error fetching passage:', error);
    return `<p class="text-red-500">Error loading passage: ${error.message}</p>`;
  }
};
