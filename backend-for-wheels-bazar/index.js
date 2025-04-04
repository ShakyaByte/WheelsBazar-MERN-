require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const connectToMongo = require('./db');
connectToMongo();

const app = express();
const port = 5500;

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Session setup for Passport
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key', // Use env variable for security
  resave: false,
  saveUninitialized: false,  // Fix: Should be false for proper session handling
  cookie: { secure: false } // Set to true in production with HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5500/auth/google/callback', // Fix: Ensure it matches Google Console
}, (accessToken, refreshToken, profile, done) => {
  console.log('Google Profile:', profile);
  return done(null, profile);
}));


// Fix: Only store user ID in session, not the whole object
passport.serializeUser((user, done) => done(null, user.id)); // Only store the user ID
passport.deserializeUser((id, done) => {
  done(null, { id }); // Fetch user from database if needed
});


// Google Auth Routes
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'], 
  accessType: 'offline',
  prompt: 'consent',
}));

app.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: 'http://localhost:5173/',
}), (req, res) => {
  console.log('Authenticated user:', req.user);
  res.redirect('http://localhost:5173/dashboard');
});

app.get('/auth/status', (req, res) => {
  res.json({ isAuthenticated: req.isAuthenticated(), user: req.user || null });
});

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.redirect('http://localhost:5173/');
  });
});

// Dashboard Redirect
app.get('/dashboard', (req, res) => {
  res.redirect('http://localhost:5173/dashboard');
});

// Import Routes
app.use('/admin', require('./controllers/admin-products')); //admin control
app.use('/admin', require('./AdminRoutes/Adminauth')); //admin auth
app.use('/user', require('./Routes/UserAuth'));
app.use('/product', require('./Routes/ProductRoutes'));

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
