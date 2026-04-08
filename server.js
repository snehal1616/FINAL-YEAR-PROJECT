const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3005;
const upload = multer({ limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

// --- Middleware ---
app.use(cors({
    origin: [
        'https://final-year-project-rjja.vercel.app',
        'https://final-year-project-flame-three.vercel.app',
        'https://final-year-project-mu-rose.vercel.app',
        'http://localhost:3005'
    ],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET || 'Cureastic-secret-key-2026',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

// --- Data helpers ---
const USERS_FILE = path.join(__dirname, 'data', 'users.json');
const chatEngine = require('./chatbot-engine');

function readUsers() {
    if (!fs.existsSync(USERS_FILE)) {
        if (!fs.existsSync(path.join(__dirname, 'data'))) fs.mkdirSync(path.join(__dirname, 'data'));
        fs.writeFileSync(USERS_FILE, '[]');
    }
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
}
function writeUsers(users) { fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2)); }

// --- AUTH ROUTES ---
app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'All fields are required' });
    const users = readUsers();
    if (users.find(u => u.email === email)) return res.status(400).json({ error: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const user = { id: uuidv4(), name, email, password: hashed, lang: 'en', chatHistory: [], created: new Date().toISOString() };
    users.push(user);
    writeUsers(users);
    req.session.userId = user.id;
    res.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();
    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    req.session.userId = user.id;
    res.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
});

app.post('/api/guest', (req, res) => {
    const guestId = 'guest-' + uuidv4();
    req.session.userId = guestId;
    req.session.isGuest = true;
    res.json({ success: true, user: { id: guestId, name: 'Guest User', email: 'guest@demo.com' } });
});

app.get('/api/me', (req, res) => {
    if (!req.session.userId) return res.status(401).json({ error: 'Not authenticated' });
    if (req.session.isGuest) return res.json({ id: req.session.userId, name: 'Guest User', email: 'guest@demo.com', lang: 'en', chatHistory: [] });
    const users = readUsers();
    const user = users.find(u => u.id === req.session.userId);
    if (!user) return res.status(401).json({ error: 'User not found' });
    res.json({ 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        lang: user.lang || 'en', 
        age: user.age,
        gender: user.gender,
        height: user.height,
        weight: user.weight,
        bloodGroup: user.bloodGroup,
        conditions: user.conditions,
        chatHistory: user.chatHistory || [] 
    });
});

app.post('/api/logout', (req, res) => { req.session.destroy(); res.json({ success: true }); });

app.post('/api/profile', (req, res) => {
    if (!req.session.userId || req.session.isGuest) return res.status(401).json({ error: 'Not authorized' });
    const users = readUsers();
    const idx = users.findIndex(u => u.id === req.session.userId);
    if (idx === -1) return res.status(404).json({ error: 'User not found' });
    
    if (req.body.name) users[idx].name = req.body.name;
    if (req.body.lang) users[idx].lang = req.body.lang;
    
    // Save personal health details
    users[idx].age = req.body.age;
    users[idx].gender = req.body.gender;
    users[idx].height = req.body.height;
    users[idx].weight = req.body.weight;
    users[idx].bloodGroup = req.body.bloodGroup;
    users[idx].conditions = req.body.conditions;
    
    writeUsers(users);
    res.json({ success: true });
});

// --- WEATHER API ROUTE ---
app.get('/api/weather', async (req, res) => {
    const { lat, lon } = req.query;
    try {
        let url = 'https://wttr.in/?format=j1';
        if (lat && lon) {
            url = `https://wttr.in/${lat},${lon}?format=j1`;
        }
        
        const response = await axios.get(url, { 
            timeout: 8000,
            headers: { 'Accept-Language': 'en' }
        });
        const data = response.data;
        const current = data.current_condition && data.current_condition[0];
        
        if (current) {
            let areaName = 'Local Area';
            if (data.nearest_area && data.nearest_area[0]) {
                const area = data.nearest_area[0];
                const town = area.areaName && area.areaName[0] ? area.areaName[0].value : '';
                const region = area.region && area.region[0] ? area.region[0].value : '';
                areaName = town || region || 'Your Location';
                if (area.country && area.country[0]) areaName += `, ${area.country[0].value}`;
            }

            res.json({
                temp: current.temp_C,
                feelsLike: current.FeelsLikeC,
                humidity: current.humidity,
                condition: current.weatherDesc && current.weatherDesc[0] ? current.weatherDesc[0].value : 'Unknown',
                windSpeed: current.windspeedKmph,
                icon: current.weatherCode,
                location: areaName
            });
        } else {
            res.json({ error: 'Weather data unavailable' });
        }
    } catch (error) {
        console.error('Weather API Error:', error.message);
        res.status(500).json({ error: 'Weather service unavailable' });
    }
});

// --- CHATBOT ROUTE ---
app.post('/api/chat', async (req, res) => {
    const { message, mode = 'normal', weather = null } = req.body;
    if (!message) return res.status(400).json({ error: 'Message required' });

    let userLang = req.body.lang || 'en';
    console.log(`[API] /api/chat - Msg: "${message.substring(0,20)}..." | Lang: ${userLang} | Mode: ${mode}`);
    const reply = await chatEngine.processQuery(message, req.session.userId || 'anon', userLang, mode, weather);

    if (req.session.userId && !req.session.isGuest) {
        const users = readUsers();
        const idx = users.findIndex(u => u.id === req.session.userId);
        if (idx !== -1) {
            if (!users[idx].chatHistory) users[idx].chatHistory = [];
            users[idx].chatHistory.push({ q: message, a: reply.text, topic: reply.topic, ts: new Date().toISOString() });
            writeUsers(users);
        }
    }
    res.json(reply);
});

// --- IMAGE ANALYSIS API ---
app.post('/api/analyze-image', upload.single('image'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No image file provided' });
    
    const { mode = 'normal' } = req.body;
    let userLang = req.body.lang || 'en';
    const reply = await chatEngine.processImage(req.file.buffer, req.file.mimetype, req.session.userId || 'anon', userLang, mode);

    if (req.session.userId && !req.session.isGuest) {
        const users = readUsers();
        const idx = users.findIndex(u => u.id === req.session.userId);
        if (idx !== -1) {
            if (!users[idx].chatHistory) users[idx].chatHistory = [];
            users[idx].chatHistory.push({ 
                q: "[IMAGE_ANALYSIS]", 
                a: reply.text, 
                topic: reply.topic, 
                ts: new Date().toISOString() 
            });
            writeUsers(users);
        }
    }
    res.json(reply);
});

// --- HOSPITALS API ---
app.get('/api/hospitals', async (req, res) => {
    const { lat, lng } = req.query;
    if (!lat || !lng) return res.status(400).json({ error: 'Location coordinates required' });

    try {
        // Use Overpass API (OpenStreetMap) for free POI lookup
        const query = `[out:json];nwr["amenity"="hospital"](around:5000,${lat},${lng});out center 10;`;
        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
        
        const response = await axios.get(url, { timeout: 8000 });
        
        let hospitals = [];
        if (response.data && response.data.elements) {
            hospitals = response.data.elements.map(h => {
                const name = (h.tags && h.tags.name) ? h.tags.name : null;
                const addressCity = (h.tags && h.tags['addr:city']) ? h.tags['addr:city'] : '';
                const addressStreet = (h.tags && h.tags['addr:street']) ? h.tags['addr:street'] : '';
                let address = [addressStreet, addressCity].filter(Boolean).join(', ');
                if (!address) address = "Location available on map";
                
                const hLat = h.lat || (h.center && h.center.lat);
                const hLng = h.lon || (h.center && h.center.lon);
                
                return {
                    name: name || "Healthcare Facility",
                    rating: "OSM", // OpenStreetMap source indicator
                    address: address,
                    lat: hLat,
                    lng: hLng,
                    link: `https://www.openstreetmap.org/?mlat=${hLat}&mlon=${hLng}#map=16/${hLat}/${hLng}`
                };
            }).filter(h => h.name !== "Healthcare Facility"); // Filter unnamed unless necessary
        }

        // If no real hospitals found within 5km, return mock data relative to user
        if (hospitals.length === 0) {
            const baseLat = parseFloat(lat);
            const baseLng = parseFloat(lng);
            return res.json([
                { name: "Demo General Hospital", rating: "4.5", address: "City Center (Demo Data)", lat: baseLat + 0.005, lng: baseLng + 0.005, link: `https://www.openstreetmap.org/?mlat=${baseLat}&mlon=${baseLng}#map=15` },
                { name: "Demo Care Clinic", rating: "4.2", address: "West Avenue (Demo Data)", lat: baseLat - 0.005, lng: baseLng + 0.008, link: `https://www.openstreetmap.org/?mlat=${baseLat}&mlon=${baseLng}#map=15` }
            ]);
        }

        res.json(hospitals.slice(0, 5));
    } catch (error) {
        console.error("Overpass API Error:", error.message);
        // Fallback on error
        const baseLat = parseFloat(lat);
        const baseLng = parseFloat(lng);
        res.json([
             { name: "Demo Hospital (API Error)", rating: "N/A", address: "Please try again later", lat: baseLat, lng: baseLng, link: "#" }
        ]);
    }
});

app.get('/api/wellness-tasks', async (req, res) => {
    if (!req.session.userId) return res.status(401).json({ error: 'Not authenticated' });
    const { mode = 'normal' } = req.query;
    let weather = null;
    try {
        if (req.query.weather && req.query.weather !== 'undefined' && req.query.weather !== 'null') {
            weather = typeof req.query.weather === 'string' ? JSON.parse(req.query.weather) : req.query.weather;
        }
    } catch (e) { console.error("Weather Parse Error:", e.message); }
    
    let history = [];
    let userLang = 'en';
    if (!req.session.isGuest) {
        const users = readUsers();
        const user = users.find(u => u.id === req.session.userId);
        if (user) {
            history = user.chatHistory || [];
            userLang = user.lang || 'en';
        }
    }
    
    try {
        const tasks = await chatEngine.generateWellnessTasks(history, weather, mode, userLang);
        res.json({ tasks });
    } catch (err) {
        res.status(500).json({ error: 'AI Generation Failed' });
    }
});

// --- REPORTS API ---
app.get('/api/reports', (req, res) => {
    if (!req.session.userId) return res.status(401).json({ error: 'Not authenticated' });
    if (req.session.isGuest) return res.json({ chatHistory: [], stats: {} });
    const users = readUsers();
    const user = users.find(u => u.id === req.session.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const history = user.chatHistory || [];
    const topicCounts = {};
    history.forEach(h => { topicCounts[h.topic] = (topicCounts[h.topic] || 0) + 1; });
    res.json({ chatHistory: history, stats: { total: history.length, topics: topicCounts } });
});

// --- PAGE ROUTES ---
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/signup', (req, res) => res.sendFile(path.join(__dirname, 'public', 'signup.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'public', 'dashboard.html')));
app.get('/chatbot', (req, res) => res.sendFile(path.join(__dirname, 'public', 'chatbot.html')));
app.get('/wellness', (req, res) => res.sendFile(path.join(__dirname, 'public', 'wellness.html')));
app.get('/reports', (req, res) => res.sendFile(path.join(__dirname, 'public', 'reports.html')));
app.get('/profile', (req, res) => res.sendFile(path.join(__dirname, 'public', 'profile.html')));

app.listen(PORT, () => console.log(`✅ Cureastic Server running at http://localhost:${PORT} - Deployed: ${new Date().toISOString()}`));
