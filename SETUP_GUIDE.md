# Imperial Estates - Complete Setup Guide

## 🎯 What Was Fixed?

**PROBLEM:** Your old website used `localStorage` which only saves data on individual devices. When admin adds a property, only they can see it on their computer.

**SOLUTION:** Created a proper backend with database. Now when admin adds/edits properties, it saves to a central database and **everyone visiting the website sees the same data**.

---

## 📁 Project Structure

```
imperial-estates/
├── server.js          # Backend API server (Node.js)
├── package.json       # Dependencies list
├── index.html         # Frontend website (updated)
└── properties.db      # SQLite database (auto-created)
```

---

## 🚀 Quick Start (Local Testing)

### Step 1: Install Node.js
1. Download from: https://nodejs.org/
2. Choose LTS version (recommended)
3. Install and verify:
   ```bash
   node --version
   npm --version
   ```

### Step 2: Setup Project
```bash
# Create project folder
mkdir imperial-estates
cd imperial-estates

# Copy the files:
# - server.js
# - package.json
# - index.html

# Install dependencies
npm install
```

### Step 3: Start the Server
```bash
npm start
```

You should see:
```
✅ Server running on http://localhost:3000
📁 Database: properties.db
🌐 API: http://localhost:3000/api/properties
```

### Step 4: Open Website
- Open browser: http://localhost:3000
- Your website is now live locally!

### Step 5: Test Admin Panel
1. Scroll to "Admin" section
2. Login:
   - Username: `admin`
   - Password: `1234`
3. Add a new property
4. **Open the website in another browser or incognito mode**
5. ✅ You'll see the new property there too!

---

## 🌐 Make It Public (Free Hosting Options)

### Option 1: Render.com (RECOMMENDED - FREE)

**Why?** Free tier, easy setup, includes database, custom domain support.

**Steps:**

1. **Create account:** https://render.com/
2. **Push code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

3. **Create Web Service on Render:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - Settings:
     - **Name:** imperial-estates
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Plan:** Free

4. **Deploy!**
   - Render will give you a URL like: `https://imperial-estates.onrender.com`
   - Your website is now PUBLIC!

5. **Update API URL in index.html:**
   ```javascript
   const API_URL = 'https://imperial-estates.onrender.com/api';
   ```

**⚠️ Note:** Free tier spins down after inactivity. First visit may take 30 seconds to wake up.

---

### Option 2: Railway.app (FREE)

1. Sign up: https://railway.app/
2. "New Project" → "Deploy from GitHub repo"
3. Select your repo
4. Railway auto-detects Node.js and deploys
5. Get your public URL
6. Update `API_URL` in index.html

---

### Option 3: Vercel (Frontend) + Render (Backend)

**For Frontend:**
- Push `index.html` to Vercel: https://vercel.com/
- Free custom domain support

**For Backend:**
- Deploy `server.js` to Render (as above)
- Update `API_URL` in frontend to point to Render backend

---

## 🔧 Advanced Configuration

### Change Admin Credentials

Edit `server.js` line 96-97:
```javascript
const ADMIN_USERNAME = 'yourusername';
const ADMIN_PASSWORD = 'yourpassword';
```

**⚠️ IMPORTANT:** For production, use environment variables:
```javascript
const ADMIN_USERNAME = process.env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASS || '1234';
```

Set in Render dashboard: Environment → Add `ADMIN_USER` and `ADMIN_PASS`

---

### Change WhatsApp Number

Edit `index.html` line 342:
```html
href="https://wa.me/919999999999"
```
Replace with your number (include country code, no spaces/symbols)

---

### Use MySQL/PostgreSQL Instead of SQLite

**Why?** Better for production, free tiers available on PlanetScale, Supabase, etc.

**For PostgreSQL:**
```bash
npm install pg
```

Update `server.js`:
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Replace db.run with pool.query
```

---

## 📝 API Endpoints

Your backend provides these APIs:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/properties` | Get all properties |
| GET | `/api/properties/:id` | Get single property |
| POST | `/api/properties` | Add new property (admin) |
| DELETE | `/api/properties/:id` | Delete property (admin) |
| POST | `/api/admin/login` | Admin login |

---

## 🎨 Customization

### Add More Fields
1. Edit database schema in `server.js` (add column)
2. Add input field in `index.html` admin panel
3. Update API handlers to include new field

### Change Colors
Edit `index.html` Tailwind classes:
- `bg-yellow-400` → `bg-blue-400` (change yellow to blue)
- `from-yellow-300 to-orange-500` → your gradient colors

---

## 🐛 Troubleshooting

### "Unable to connect to server"
- Make sure server is running: `npm start`
- Check if port 3000 is free
- Verify `API_URL` in index.html matches your server

### Database not saving
- Check `properties.db` exists in project folder
- Permissions issue? Run: `chmod 644 properties.db`

### CORS errors
- `server.js` already has CORS enabled
- If hosting frontend separately, update CORS origin in server.js

---

## 💰 Cost Breakdown

| Service | Free Tier | Limitations |
|---------|-----------|-------------|
| Render | ✅ Free | Spins down after 15min inactivity |
| Railway | ✅ $5 credit/month | ~500hrs runtime |
| Vercel | ✅ Free | Frontend only |
| Domain (optional) | ~$10/year | From Namecheap, Google Domains |

**Total for basic setup: FREE ✅**

---

## 🔒 Security Recommendations

**For Production:**

1. **Use Environment Variables** for passwords
2. **Add JWT Authentication** for admin
3. **Hash Passwords** with bcrypt
4. **Use HTTPS** (Render provides free SSL)
5. **Rate Limiting** to prevent abuse
6. **Input Validation** on backend
7. **SQL Injection Protection** (already using parameterized queries ✅)

---

## 📦 Database Backup

**SQLite (local):**
```bash
cp properties.db properties.backup.db
```

**Cloud Hosted:**
Use Render's disk snapshots or export to JSON:
```bash
curl https://your-app.onrender.com/api/properties > backup.json
```

---

## 🎓 Next Steps

1. ✅ **Test locally** - Make sure everything works
2. ✅ **Deploy to Render** - Get your public URL
3. ✅ **Add custom domain** - Buy from Namecheap ($10/year)
4. ✅ **Update WhatsApp number** - Add your real number
5. ✅ **Change admin password** - Use strong password
6. ✅ **Add more properties** - Populate your database
7. ✅ **Share your website** - Start getting inquiries!

---

## 📞 Support

If you get stuck:
1. Check server logs: `npm start` shows errors
2. Browser console: Press F12 to see errors
3. Verify all files are in correct locations

---

## 🎉 Success Checklist

- [ ] Node.js installed
- [ ] Dependencies installed (`npm install`)
- [ ] Server starts without errors
- [ ] Website opens in browser
- [ ] Admin can login
- [ ] Admin can add property
- [ ] New property shows for everyone
- [ ] 360 tour works
- [ ] WhatsApp button works
- [ ] Deployed to Render/Railway
- [ ] Public URL works
- [ ] Custom domain added (optional)

---

**Congratulations! You now have a PROPER real estate website with database! 🏡✨**
