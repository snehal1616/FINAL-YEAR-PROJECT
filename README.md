# 🏥 Cureastic - AI-Powered Healthcare Assistant

An intelligent healthcare platform that provides personalized health guidance, disease awareness, and preventive care recommendations using AI.

## ✨ Features

- 🤖 **AI Chatbot** - Get instant health answers powered by Groq/Gemini AI
- 👶 **Child Care Mode** - Specialized health guidance for children
- 🌤️ **Weather Health Tips** - Smart health alerts based on weather conditions
- 📸 **Image Analysis** - Symptom checking through image recognition
- 💪 **Wellness Tracker** - Personalized daily health tasks
- 🏥 **Hospital Finder** - Locate nearby healthcare facilities
- 📊 **Health Reports** - Track your health consultation history

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/snehal1616/FINAL-YEAR-PROJECT.git
cd FINAL-YEAR-PROJECT
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Add your API keys to `.env`:
```env
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_MAPS_API_KEY=your_google_maps_key
OPENWEATHER_API_KEY=your_openweather_key
SESSION_SECRET=your_secret_key
PORT=3005
```

5. Start the server:
```bash
npm start
```

6. Open your browser:
```
http://localhost:3005
```

## 🌐 Deployment

### Recommended: Split Deployment (Best Performance)

**Frontend on Vercel + Backend on Render**

1. **Deploy Backend to Render**
   - See [RENDER_DEPLOYMENT_GUIDE.md](./RENDER_DEPLOYMENT_GUIDE.md)
   - Get your backend URL: `https://cureastic-app.onrender.com`

2. **Deploy Frontend to Vercel**
   - See [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)
   - Update `public/js/config.js` with your Render URL
   - Deploy to Vercel

3. **Architecture Overview**
   - See [DEPLOYMENT_ARCHITECTURE.md](./DEPLOYMENT_ARCHITECTURE.md)

### Alternative: All-in-One Deployment

Deploy everything to Render or Vercel (see respective guides)

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **AI**: Groq SDK, Google Gemini AI
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **APIs**: Weather API, OpenStreetMap (Overpass API)
- **Session Management**: Express-session
- **Authentication**: bcryptjs

## 📁 Project Structure

```
├── server.js              # Main server file
├── chatbot-engine.js      # AI chatbot logic
├── public/                # Frontend files
│   ├── index.html         # Landing page
│   ├── login.html         # Login page
│   ├── dashboard.html     # User dashboard
│   ├── chatbot.html       # Chatbot interface
│   ├── wellness.html      # Wellness tracker
│   ├── reports.html       # Health reports
│   └── css/styles.css     # Global styles
├── data/                  # Data storage
│   ├── users.json         # User data
│   └── who_dataset.json   # Health information
└── .env                   # Environment variables (not in git)
```

## 🔐 Security

- API keys stored in environment variables
- Password hashing with bcryptjs
- Session-based authentication
- `.env` file excluded from git

## 👥 Team

**Developed by**: Snehalkumar SB  
**Co-Lead**: Soumya R

## 📄 License

This project is part of a Final Year Project.

## 🤝 Contributing

This is an academic project. For suggestions or issues, please contact the developers.

## 📞 Support

For questions or support, please reach out to the development team.

---

**© 2026 Cureastic - AI Healthcare Assistant**
