# 🏡 Imperial Estates - Luxury Real Estate Platform

A modern, full-stack real estate website with **centralized database** so all users see the same properties.

## ✨ Features

- 🎨 **Luxury UI** - Dark theme with gold accents
- 🏠 **Property Management** - Admin can add/delete properties
- 🌐 **360° Tours** - Immersive property viewing
- 💬 **WhatsApp Integration** - Direct inquiry button
- 🔒 **Admin Panel** - Secure login system
- 📱 **Responsive Design** - Works on all devices
- ☁️ **Cloud Database** - Changes visible to everyone instantly

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start server
npm start

# Open browser
http://localhost:3000
```

## 🔑 Admin Login

- **Username:** `admin`
- **Password:** `1234`

⚠️ Change these in production!

## 📂 Files

- `server.js` - Backend API with SQLite database
- `index.html` - Frontend website
- `package.json` - Dependencies
- `properties.db` - Database (auto-created)

## 🌐 Deploy for FREE

### Recommended: Render.com

1. Push to GitHub
2. Create Web Service on Render
3. Connect your repo
4. Deploy!

**Full guide:** See `SETUP_GUIDE.md`

## 🛠️ Tech Stack

- **Frontend:** HTML, TailwindCSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** SQLite (upgradable to PostgreSQL/MySQL)
- **Hosting:** Render, Railway, Vercel

## 📞 Customization

### Change WhatsApp Number
Line 342 in `index.html`:
```html
href="https://wa.me/YOUR_NUMBER"
```

### Change Admin Password
Lines 96-97 in `server.js`:
```javascript
const ADMIN_USERNAME = 'yourusername';
const ADMIN_PASSWORD = 'yourpassword';
```

## 📊 Database Structure

```sql
CREATE TABLE properties (
  id INTEGER PRIMARY KEY,
  title TEXT,
  location TEXT,
  price TEXT,
  type TEXT,
  area TEXT,
  image TEXT,
  panorama TEXT,
  description TEXT,
  amenities TEXT,
  created_at DATETIME
)
```

## 🎯 How It Works

1. **Frontend** (index.html) makes API calls to backend
2. **Backend** (server.js) handles requests and database
3. **Database** stores all properties
4. **Everyone** sees the same data from central database

### Old vs New System

| Old (localStorage) | New (Database) |
|-------------------|----------------|
| ❌ Data only on user's device | ✅ Data on central server |
| ❌ Admin changes invisible to others | ✅ Everyone sees updates |
| ❌ Not a real website | ✅ Proper public website |

## 📝 API Endpoints

```
GET    /api/properties      - List all properties
GET    /api/properties/:id  - Get one property
POST   /api/properties      - Add property (admin)
DELETE /api/properties/:id  - Delete property (admin)
POST   /api/admin/login     - Admin authentication
```

## 🔒 Security Notes

**Current setup is for DEVELOPMENT.** For production:

- Use environment variables for credentials
- Add JWT authentication
- Hash passwords with bcrypt
- Enable HTTPS
- Add rate limiting
- Validate all inputs

## 📄 License

MIT

## 🙏 Credits

Built with ❤️ for luxury real estate experiences

---

**Need help?** Check `SETUP_GUIDE.md` for detailed instructions!
