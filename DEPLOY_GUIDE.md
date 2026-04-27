# SpidyUniverse V3 — Deployment & Download Guide

## 🔑 Zoom Download Method — How It Works

### URL Structure
```
https://us06web.zoom.us/rec/share/<recording_id>.<passcode>
```
SpidyUniverse ka data mein yeh format hai. Passcode URL mein hi encoded hai.

### Download Process
```
User clicks Download
    ↓
Browser → POST /api/download { token: "encrypted..." }
    ↓
Next.js Server decrypts token → gets zoom URL
    ↓
Server runs: yt-dlp "zoom_url" -o lecture.mp4
    ↓
yt-dlp internally:
  1. Zoom page se cookie/session fetch karta hai
  2. Passcode URL se auth karta hai  
  3. HLS m3u8 stream URL dhundhta hai
  4. ffmpeg se segments merge karta hai
  5. MP4 file ready
    ↓
Server streams MP4 → Browser automatically downloads
```

## ⚠️ CRITICAL: Vercel/Netlify Pe Download Kaam NAHI Karega

**Reason**: Vercel serverless functions mein:
- `yt-dlp` binary nahi hoti
- `ffmpeg` nahi hota  
- File system write nahi hota (read-only)
- Function timeout 10-60 seconds (video download = 2-10 min chahiye)

## ✅ Kahan Deploy Karo (Download ke liye)

### Option 1: Railway.app (RECOMMENDED - Free tier available)
```bash
1. railway.app pe account banao
2. GitHub repo connect karo
3. "Deploy from Dockerfile" select karo
4. Automatically yt-dlp + ffmpeg install hoga
5. ENV variables add karo (ENCRYPTION_KEY etc)
6. Done! Download button kaam karega
```

### Option 2: DigitalOcean Droplet / VPS
```bash
# Server pe:
apt install python3-pip ffmpeg -y
pip install yt-dlp
npm install -g pm2
git clone your-repo
npm install && npm run build
pm2 start npm --name spidy -- start
```

### Option 3: Render.com (Free tier)
- render.yaml add karo
- Docker deploy select karo
- Build hoga automatically

## 🎯 Netlify/Vercel Pe Kya Hoga?
- Video **iframe** mein chalegi (zoom player)
- Download button click karne pe **Zoom page** open hoga new tab mein
- Wahan se manually download kar sakte hain
- Server-side download available nahi hoga

## 🔧 Environment Variables
```env
ENCRYPTION_KEY=your-32-char-secret-key-here-12345
NEXT_PUBLIC_SITE_NAME=SpidyUniverse
```

## 📱 Testing Download
1. Railway pe deploy karo
2. Koi lecture kholo
3. "Download MP4" button click karo
4. "Server download available (yt-dlp)" message dikhega
5. 1-5 minute baad MP4 download hogi

## 🛡️ Security
- Zoom URL kabhi browser ko nahi milta
- Token encrypted hai (AES)
- Download bhi server-side hota hai
- Browser sirf MP4 file milti hai, URL nahi
