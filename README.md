# TB Image-to-Text OCR

AI-powered OCR web application for extracting and processing game leaderboard data from screenshots.

**Live Demo**: [Deployed on Vercel](https://tb-image-to-text.vercel.app) _(after deployment)_

## Features

- 📤 Upload up to 10 images (mobile/desktop screenshots)
- 🔍 Free OCR using Tesseract.js (no API limits)
- 📊 Automatic sorting by points (highest to lowest)
- ✏️ Manual data editing before export
- 📋 Export as TSV (tab-separated, Excel-ready) or CSV download
- 📈 Real-time progress indicator
- ⚡ Serverless backend on Vercel

## Tech Stack

### Frontend
- Vite + React + TypeScript
- Tailwind CSS
- Axios
- React Dropzone

### Backend (Serverless)
- Vercel Serverless Functions
- Tesseract.js (OCR)
- Sharp (image preprocessing)
- Multiparty (file uploads)

## Project Structure

```
tb-image-to-text/
├── api/               # Vercel serverless functions
│   ├── ocr/
│   │   ├── process.ts # OCR processing endpoint
│   │   └── health.ts  # Health check endpoint
│   └── lib/          # Shared backend code (services, utils, types)
├── src/              # React frontend components
├── public/           # Static assets
├── examples/         # Example input images for testing
├── vercel.json       # Vercel configuration
├── vite.config.ts    # Vite configuration
└── package.json      # Dependencies and scripts
```

## Local Development

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/paocg01-ops/tb-image-to-text.git
cd tb-image-to-text
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will run on `http://localhost:5173`

> **Note**: For local development, the backend API runs within Vite's dev server using a proxy. In production, Vercel handles both frontend and serverless API functions.

## API Endpoints

- `POST /api/ocr/process` - Process up to 10 images and extract data
- `GET /api/ocr/health` - Health check

## Usage

1. Upload up to 10 leaderboard screenshots
2. Wait for OCR processing
3. Review and edit extracted data
4. Export as TSV (copy to clipboard) or download CSV

## Deployment to Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/paocg01-ops/tb-image-to-text)

### Manual Deployment

1. Push your code to GitHub (already done!)

2. Go to [Vercel](https://vercel.com) and sign in

3. Click "Add New Project"

4. Import your GitHub repository: `paocg01-ops/tb-image-to-text`

5. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)

6. Click **"Deploy"**

7. Wait 2-3 minutes for deployment to complete

8. Your app will be live at: `https://tb-image-to-text.vercel.app`

### Features of Vercel Deployment

✅ **Automatic HTTPS** - Secure by default
✅ **Global CDN** - Fast worldwide
✅ **Serverless Functions** - API runs in `/api` folder
✅ **Auto Deployments** - Push to main = instant deploy
✅ **Zero Configuration** - No environment variables needed
✅ **Free Tier** - Perfect for this project

## License

MIT
