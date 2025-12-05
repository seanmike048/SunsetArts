# Deployment Guide for Sunset Art Lens

This guide provides detailed instructions for deploying Sunset Art Lens to various hosting platforms.

## Table of Contents
- [GitHub Pages](#github-pages)
- [Netlify](#netlify)
- [Vercel](#vercel)
- [Custom Server](#custom-server)

---

## GitHub Pages

### Prerequisites
- GitHub account
- Repository pushed to GitHub

### Step-by-Step Instructions

1. **Install gh-pages package**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update `package.json`**
   
   Add the following to your `scripts` section:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Update `vite.config.ts`**
   
   Add the `base` option (replace `sunset-art-lens` with your repository name):
   ```typescript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     base: '/sunset-art-lens/'  // Must match your repo name
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Configure GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select the `gh-pages` branch
   - Click **Save**
   - Your site will be available at: `https://<username>.github.io/sunset-art-lens/`

### Environment Variables on GitHub Pages

Since GitHub Pages serves static files, you cannot use server-side environment variables. Users must add their API key through the app's Settings UI.

---

## Netlify

### Method 1: Netlify UI (Recommended)

1. **Push code to GitHub**

2. **Create new site on Netlify**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click **Add new site** → **Import an existing project**
   - Choose **GitHub** and authorize Netlify

3. **Select repository**
   - Find and select your `sunset-art-lens` repository

4. **Configure build settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - Click **Deploy site**

5. **Add environment variables** (Optional)
   - Go to **Site settings** → **Environment variables**
   - Click **Add a variable**
   - Key: `VITE_GEMINI_API_KEY`
   - Value: Your Gemini API key
   - Click **Save**

6. **Trigger redeploy**
   - Go to **Deploys** tab
   - Click **Trigger deploy** → **Deploy site**

### Method 2: Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize site**
   ```bash
   netlify init
   ```
   
   Follow the prompts:
   - Create & configure a new site
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Custom Domain on Netlify

1. Go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Follow the instructions to configure DNS

---

## Vercel

### Method 1: Vercel UI (Recommended)

1. **Push code to GitHub**

2. **Import project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click **Add New** → **Project**
   - Import your GitHub repository

3. **Configure project**
   - **Framework Preset**: Vite (auto-detected)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add environment variables** (Optional)
   - Expand **Environment Variables**
   - Add: `VITE_GEMINI_API_KEY` = `your_api_key`
   - Select all environments (Production, Preview, Development)

5. **Deploy**
   - Click **Deploy**
   - Your site will be live at `https://<project-name>.vercel.app`

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   For production:
   ```bash
   vercel --prod
   ```

4. **Add environment variables**
   ```bash
   vercel env add VITE_GEMINI_API_KEY
   ```

### Custom Domain on Vercel

1. Go to your project dashboard
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Configure DNS as instructed

---

## Custom Server (VPS, AWS, etc.)

### Using Nginx

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Copy dist folder to server**
   ```bash
   scp -r dist/* user@your-server:/var/www/sunset-art-lens/
   ```

3. **Configure Nginx**
   
   Create `/etc/nginx/sites-available/sunset-art-lens`:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/sunset-art-lens;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # Enable gzip compression
       gzip on;
       gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
   }
   ```

4. **Enable site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/sunset-art-lens /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

5. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

### Using Apache

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Copy dist folder to server**
   ```bash
   scp -r dist/* user@your-server:/var/www/html/sunset-art-lens/
   ```

3. **Create .htaccess** in the dist folder:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /sunset-art-lens/
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /sunset-art-lens/index.html [L]
   </IfModule>
   ```

---

## Environment Variables Best Practices

### For Public Deployments

**Do NOT** commit your `.env` file with real API keys to GitHub!

Instead:
1. Use the app's Settings UI for API key management
2. Or set environment variables in your hosting platform's dashboard

### For Private/Internal Deployments

If deploying internally, you can:
1. Create a `.env` file (not committed to Git)
2. Add `VITE_GEMINI_API_KEY=your_key`
3. The app will use this as a default

---

## Continuous Deployment

### GitHub Actions + Netlify

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Netlify

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=dist
        env:
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
```

### GitHub Actions + Vercel

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## Troubleshooting

### Build fails on deployment platform

**Solution**: Ensure Node.js version is 18.x or higher
- Netlify: Add `NODE_VERSION=18` to environment variables
- Vercel: Automatically uses latest LTS

### 404 errors on page refresh

**Solution**: Configure your server to serve `index.html` for all routes
- This is handled automatically by Netlify and Vercel
- For custom servers, see the Nginx/Apache configurations above

### Environment variables not working

**Solution**: 
- Ensure variables are prefixed with `VITE_`
- Rebuild after adding environment variables
- Check that variables are set in the correct environment (production vs preview)

---

## Performance Optimization

### Enable Compression

Most platforms enable gzip/brotli automatically. For custom servers:

**Nginx**:
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
```

**Apache**:
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript
</IfModule>
```

### CDN Configuration

For better global performance:
- Netlify: Automatically uses CDN
- Vercel: Automatically uses Edge Network
- Custom: Use Cloudflare or AWS CloudFront

---

## Security Considerations

1. **API Keys**: Never commit API keys to Git
2. **HTTPS**: Always use HTTPS in production (free with Let's Encrypt, Netlify, Vercel)
3. **CORS**: The Gemini API handles CORS automatically
4. **Rate Limiting**: Implement client-side rate limiting if needed

---

For more help, see the main [README.md](README.md) or open an issue on GitHub.
