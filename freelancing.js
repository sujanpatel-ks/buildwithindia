document.addEventListener('DOMContentLoaded', () => {
    // Search functionality
    document.querySelector('.search-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const query = document.querySelector('.search-form input').value;
        // Implement search logic
        console.log('Searching for:', query);
    });

    // Dynamic feature cards
    const features = [
        { title: 'Development', content: 'Find development gigs' },
        { title: 'Design', content: 'UI/UX projects' },
        { title: 'Writing', content: 'Content creation jobs' }
    ];

    const featuresContainer = document.querySelector('.features');
    features.forEach(feature => {
        const card = document.createElement('div');
        card.className = 'feature-card';
        card.innerHTML = `
            <h3>${feature.title}</h3>
            <p>${feature.content}</p>
        `;
        featuresContainer.appendChild(card);
    });
});

const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Mock Database
const users = [];
const jobs = [
    { id: 1, title: 'Web Developer', client: 'Tech Corp', budget: '$500', deadline: '2023-12-31' },
    { id: 2, title: 'Mobile App Dev', client: 'StartupX', budget: '$1500', deadline: '2023-11-30' }
];

// Routes
app.get('/', (req, res) => res.render('index.ejs'));
app.get('/login', (req, res) => res.render('login.ejs'));
app.get('/register', (req, res) => res.render('register.ejs'));
app.get('/dashboard', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render('dashboard.ejs', { user: req.session.user, jobs });
});

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    users.push({ username, email, password });
    res.redirect('/login');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        req.session.user = user;
        res.redirect('/dashboard');
    } else {
        res.redirect('/login');
    }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));