# Tencent Cloud Streaming Assistant

A modern web application for managing streaming channels, clips, analytics, and storage - designed based on Restream UI.

## Features

- **Dashboard**: Overview of streaming statistics and recent streams
- **Channels**: Manage multiple streaming channels
- **Clips**: Create and manage video clips
- **Analytics**: Track streaming performance and insights
- **Storage**: Manage storage and media files
- **History**: View streaming history and past sessions

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React (Icons)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
src/
  ├── components/
  │   ├── Layout.tsx          # Main layout with sidebar navigation
  │   └── CreateStreamModal.tsx # Modal for creating new streams
  ├── pages/
  │   ├── Home.tsx            # Dashboard page
  │   ├── Channels.tsx        # Channels management
  │   ├── Clips.tsx           # Clips management
  │   ├── Analytics.tsx       # Analytics and insights
  │   ├── Storage.tsx         # Storage management
  │   └── History.tsx          # Streaming history
  ├── App.tsx                 # Main app component with routing
  ├── main.tsx                # Entry point
  └── index.css               # Global styles
```

## Notes

- The "Create New Stream" feature is implemented as a modal that appears when clicking the "New Stream" button on the Home page
- All pages are fully in English
- The design follows modern UI/UX principles with a clean, professional look

