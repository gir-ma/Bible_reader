# Daily Bible Reading App

A Progressive Web App (PWA) for daily Bible reading with audio narration, built with React, Vite, and Tailwind CSS.

## Features

-  **Daily Reading Plan** - Follow a structured year-long Bible reading schedule
-  **Audio Narration** - Listen to daily readings with built-in text-to-speech
-  **Date Navigation** - Go back in time to catch up on missed readings
-  **Mobile-First Design** - Responsive layout optimized for all devices
-  **Offline Support** - All Bible text stored locally (KJV)

## Current Implementation

###  Completed Stages
- **Stage 1**: Project setup with React + Vite + Tailwind CSS
- **Stage 2**: Reading plan logic with date navigation
- **Stage 3**: Bible text display using local KJV JSON data
- **Stage 4**: Text-to-speech audio player with speed controls

### 🚧 In Development
- **Stage 5**: Audio caching (may be skipped)
- **Stage 6**: Progress tracking with streaks and completion status
- **Stage 7**: Full PWA features (service worker, offline mode, notifications)
- **Stage 8**: Deployment to Vercel

## Tech Stack

- **React 19.2.0** - UI framework
- **Vite 7.3.0** - Build tool and dev server
- **Tailwind CSS 3.x** - Utility-first styling
- **Web Speech API** - Browser-native text-to-speech
- **KJV Bible JSON** - 4.4MB complete King James Version

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Date display and navigation
│   ├── ReadingView.jsx     # Main content area with readings
│   ├── Navigation.jsx      # Bottom/top navigation bar
│   └── AudioPlayer.jsx     # Audio playback controls
├── hooks/
│   └── useReadingPlan.js   # Reading plan state management
├── services/
│   ├── bibleAPI.js         # Bible text fetching from local JSON
│   └── audioService.js     # Text-to-speech wrapper
├── data/
│   ├── readingPlan.js      # Daily reading schedule
│   └── kjv.json            # Complete KJV Bible text
└── App.jsx                 # Root component
```

## Reading Plan

Each day includes three reading sections:
- **Old Testament** - Sequential readings through the OT
- **Psalms & Proverbs** - One chapter per day
- **New Testament** - Sequential readings through the NT

## License

MIT
