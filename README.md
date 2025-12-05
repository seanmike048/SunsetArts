# Sunset Art Lens 🎨

A beautiful, fast, and intuitive web application for analyzing artworks using AI. Scan any artwork and instantly get expert explanations about the artist, style, historical context, and techniques.

![Sunset Art Lens](https://img.shields.io/badge/React-19.2-blue) ![Vite](https://img.shields.io/badge/Vite-7.2-purple) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)

## ✨ Features

- 🤖 **Real-time AI Analysis** - Powered by Google Gemini Vision API
- 🎨 **Beautiful UI** - Sunset-inspired design with smooth animations
- 🌓 **Light/Dark Themes** - Automatic system detection with manual override
- ⚙️ **Flexible Configuration** - Easy API key management via settings
- ♿ **Accessible** - WCAG AA compliant, reduced motion support
- 📱 **Responsive** - Works perfectly on mobile and desktop
- ⚡ **Fast** - Client-side image compression for quick uploads

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** 9.x or higher (comes with Node.js)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd sunset-art-lens
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```
   
   Get a free API key from [Google AI Studio](https://ai.google.dev/gemini-api/docs/api-key)

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:5173](http://localhost:5173) in your browser

5. **Build for production**
   ```bash
   npm run build
   ```
   
   The production-ready files will be in the `dist/` folder

6. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
sunset-art-lens/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── Layout.tsx          # Main layout with header
│   │   ├── Scanner.tsx         # Image upload interface
│   │   ├── ResultCard.tsx      # Analysis results display
│   │   └── SettingsModal.tsx   # API configuration
│   ├── context/         # React context providers
│   │   └── ThemeContext.tsx    # Theme management
│   ├── services/        # External API integrations
│   │   └── aiService.ts        # Gemini API client
│   ├── utils/           # Utility functions
│   │   ├── imageUtils.ts       # Image compression
│   │   └── storage.ts          # localStorage wrapper
│   ├── config/          # App configuration
│   │   └── config.ts           # Constants and strings
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # App entry point
│   └── index.css        # Global styles
├── .env.example         # Environment variables template
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── README.md            # This file
```

## 🌐 Deployment

### Option 1: GitHub Pages

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deploy script to package.json**
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```

4. **Update vite.config.ts** (add base path)
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/sunset-art-lens/' // Replace with your repo name
   })
   ```

5. **Deploy**
   ```bash
   npm run deploy
   ```

6. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages"
   - Select `gh-pages` branch as source
   - Your app will be live at `https://<username>.github.io/sunset-art-lens/`

### Option 2: Netlify

1. **Push your code to GitHub**

2. **Connect to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository

3. **Configure build settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Add environment variables**
   - In Netlify dashboard, go to "Site settings" → "Environment variables"
   - Add: `VITE_GEMINI_API_KEY` = `your_api_key`

5. **Deploy**
   - Netlify will automatically build and deploy
   - Your app will be live at `https://<random-name>.netlify.app`

### Option 3: Vercel

1. **Push your code to GitHub**

2. **Import to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository

3. **Configure project**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Add environment variables**
   - Add: `VITE_GEMINI_API_KEY` = `your_api_key`

5. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://<project-name>.vercel.app`

## 📝 Publishing to GitHub

If you haven't already pushed your code to GitHub:

1. **Create a new repository on GitHub**
   - Go to [github.com/new](https://github.com/new)
   - Name it `sunset-art-lens`
   - Don't initialize with README (we already have one)

2. **Initialize Git and push**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Sunset Art Lens web app"
   git branch -M main
   git remote add origin https://github.com/<your-username>/sunset-art-lens.git
   git push -u origin main
   ```

3. **Future updates**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```

> **Note:** Your `.env` file (containing `VITE_GEMINI_API_KEY`) is intentionally ignored by Git via `.gitignore`, so you must add
> that key directly in your hosting provider's environment variable settings when deploying.

## 🔧 Configuration

### API Key Management

The app stores API keys securely in the browser's localStorage with basic obfuscation. Users can:

1. Click the **Settings** icon (⚙️) in the header
2. Enter their Gemini API key
3. Click **Save**

The key persists across sessions and page refreshes.

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key | No* |

\* The API key can be provided either via environment variable OR through the app's settings UI. If not provided, users will see a prompt to add their key.

### Customization

- **Colors**: Edit `tailwind.config.js` to change the color palette
- **AI Prompt**: Modify `src/services/aiService.ts` to adjust the analysis prompt
- **Image Compression**: Adjust settings in `src/config/config.ts`

## 🎨 How to Use

1. **Get an API Key**
   - Visit [Google AI Studio](https://ai.google.dev/gemini-api/docs/api-key)
   - Create a free API key (15 requests/min, 1M tokens/day)

2. **Add API Key**
   - Click the **Settings** icon (⚙️)
   - Paste your API key
   - Click **Save**

3. **Scan Artwork**
   - Click **Scan Artwork**
   - Upload an image or take a photo
   - Wait ~1-2 seconds for AI analysis
   - Read the expert explanation!

4. **Toggle Theme**
   - Click the Sun/Moon icon to switch between light and dark modes

## 🛠️ Tech Stack

- **Framework**: React 19.2
- **Build Tool**: Vite 7.2
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 12.2
- **Icons**: Lucide React
- **AI**: Google Gemini 1.5 Flash API

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Troubleshooting

### "Please add your API key" error
- Verify your API key is entered in Settings
- Check that your key is active at [Google AI Studio](https://aistudio.google.com/apikey)
- Ensure you have API quota remaining

### Build errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Ensure you're using Node.js 18.x or higher

### API 404 errors
- The app uses Gemini API v1 endpoint
- Verify your API key has access to the Gemini 1.5 Flash model

## 📧 Support

For issues or questions, please [open an issue](https://github.com/<your-username>/sunset-art-lens/issues) on GitHub.

---

Made with ❤️ using React, Vite, and Google Gemini AI
