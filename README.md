# TB Image-to-Text OCR

AI-powered OCR web application for extracting and processing game leaderboard data from screenshots.

## Features

- 📤 Upload up to 10 images (mobile/desktop screenshots)
- 🔍 Client-side OCR using Tesseract.js (100% free)
- 📊 Automatic sorting by points (highest to lowest)
- ✏️ Manual data editing before export
- 📋 Export as TSV (tab-separated, Excel-ready) or CSV download
- 📈 Real-time progress indicator
- 🔒 Privacy-friendly (client-side processing)

## Tech Stack

### Frontend
- Vite + React + TypeScript
- Tailwind CSS
- React Query
- Axios

### Backend
- Node.js + Express + TypeScript
- Tesseract.js (OCR)
- Sharp (image preprocessing)
- Multer (file uploads)

## Project Structure

```
tb-image-to-text/
├── frontend/          # React application
├── backend/           # Express API server
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

Backend runs on `http://localhost:3001`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file (optional):
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## API Endpoints

- `POST /api/ocr/process` - Process up to 10 images and extract data
- `GET /api/health` - Health check

## Usage

1. Upload up to 10 leaderboard screenshots
2. Wait for OCR processing
3. Review and edit extracted data
4. Export as TSV (copy to clipboard) or download CSV

## License

MIT
