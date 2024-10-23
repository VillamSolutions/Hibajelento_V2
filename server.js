const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// Store reports in memory
let reports = [];

const loginUrls = ["/index.html", "/", "/auth/login", "/js/login.js", "/css/index.css", "/images/ezgif-6-71f2ae52b4-modified.png",
    "/images/thumbnail_Jedlik_logo_2020_200_3c5beeccf8.webp", "/unauthorized.html"];
const formUrls = ["/form.html", "/submit", "/css/form.css", "/js/form.js"];
const dashboardUrls = ["/dashboard.html", "/js/dashboard.js", "/css/dashboard.css", "/images/kuka.png", "/reports"];

app.use(express.json({ limit: '1024mb' }));
app.use(express.urlencoded({ extended: true, limit: '1024mb' }));

app.use(session({
    secret: "798e6e140aca251a151fa7bd0f5540cc21f0124d08a985711c71e16803446e2b9a2814dda60cc0533b1543300089507051ac7bc5b69c056925e83eb9237460a8",
    resave: false,
    saveUninitialized: true,
    maxAge: 86400000 * 7 * 3 // 3 weeks
})); 

app.use((req, res, next) => {
    const url = req.url;
    if (loginUrls.includes(url)) {
        return next();
    }

    if (req.session && req.session.user) {
        if (formUrls.includes(req.url)) { return next(); }
        const userType = req.session.user.type;
        if ((userType === "admin" || userType === "rgazda" || userType === "mvezeto") && dashboardUrls.includes(url)) {
            return next();
        } else {
            return res.redirect("/unauthorized.html");
        }
    } else {
        return res.redirect("/unauthorized.html");
    }
});

app.use(express.static(path.join(__dirname, 'public')));

// Login handling
app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;
    const validUsers = [
        ["rgazda1", "123", "rgazda"],
        ["tanár1", "123", "tanár"],
        ["admin1", "123", "admin"],
        ["mvezeto1", "123", "mvezeto"]
    ];

    for (const user of validUsers) {
        if (user[0] === username && user[1] === password) {
            req.session.user = { username: user[0], type: user[2] };
            if (user[2] === "tanár") {
                res.send("/form.html");
            } else {
                res.send("/dashboard.html");
            }
            return; 
        }
    }
    res.status(401).send("");
});

app.get('/', (req, res) => {
    let url = "/index.html";
    if (req.session && req.session.user) {
        if (req.session.user.type === "tanár") { url = "/form.html"; }
        else if (req.session.user.type === "rgazda" || req.session.user.type === "mvezeto" || req.session.user.type === "admin") { url = "/dashboard.html"; }
    }
    res.redirect(url);
});

// Handle report submissions
app.post('/submit', (req, res) => {
    const report = {
        title: req.body['hiba-nev'],
        description: req.body['hiba-leiras'],
        tag: req.body['tag'],
        location: req.body['helyszin']
    };
    reports.push(report);
    res.send("Report submitted successfully.");
});

// Serve reports for the dashboard
app.get('/reports', (req, res) => {
    res.json(reports);

});

app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Server running and listening on port ${PORT}`);
    } else {
        console.log("Error occurred, server failed to start", error);
    }
});


/*
const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
const path = require('path');

const app = express();
const PORT = 3000;

const loginUrls = ["/index.html", "/", "/auth/login", "/js/login.js", "/css/index.css", "/images/ezgif-6-71f2ae52b4-modified.png",
    "/images/thumbnail_Jedlik_logo_2020_200_3c5beeccf8.webp", "/unauthorized.html"];
const formUrls = ["/form.html", "/submit", "/css/form.css", "/js/form.js"];
const dashboardUrls = ["/dashboard.html", "/js/dashboard.js", "/css/dashboard.css", "/images/kuka.png"];

var dash = [];

app.use(express.json({ limit: '1024mb' }));
app.use(express.urlencoded({ extended: true, limit: '1024mb' }));

//console.log(crypto.randomBytes(64).toString("hex")) random secret generállás

app.use(session({
    secret: "798e6e140aca251a151fa7bd0f5540cc21f0124d08a985711c71e16803446e2b9a2814dda60cc0533b1543300089507051ac7bc5b69c056925e83eb9237460a8",
    resave: false,
    saveUninitialized: true,
    maxAge: 86400000*7*3 // 3 hét
})); 

app.use((req, res, next) => {
    const url = req.url;
    if (loginUrls.includes(url)) {
        return next();
    }

    if (req.session && req.session.user) {
        if(formUrls.includes(req.url)) { return next();}
        const userType = req.session.user.type;
        if ((userType === "admin" || userType === "rgazda" || userType === "mvezeto") && dashboardUrls.includes(url)) {
            return next();
        } else {
            return res.redirect("/unauthorized.html");
        }
    } else {
        return res.redirect("/unauthorized.html");
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;

    const validUsers = [
        ["rgazda1", "123", "rgazda"],
        ["tanár1", "123", "tanár"],
        ["admin1", "123", "admin"],
        ["mvezeto1", "123", "mvezeto"]
    ];

    for (const user of validUsers) {
        if (user[0] === username && user[1] === password) {
            console.log('Sikeres bejelentkezés!', username);
            req.session.user = { username: user[0], type: user[2] };

            if (user[2] === "tanár") {
                res.send("/form.html");
            } else {
                res.send("/dashboard.html");
            }
            return; 
        }
    }
    res.status(401).send("");
});

app.get('/', (req, res) => {
    let url = "/index.html";
    if(req.session && req.session.user) {
        if(req.session.user.type === "tanár") {url = "/form.html"}
        else if(req.session.user.type === "rgazda" || req.session.user.type === "mvezeto" || req.session.user.type === "admin") 
            { url = "/dashboard.html"}
    }
    res.redirect(url);
});
// hiba beküldés
app.post("/submit", (req, res) => {
    const dat = req.body; 
    if(dat.hiba_foto) res.send(`<body><img src=${dat.hiba_foto}></body>`);
    else res.send("");
    
});
app.listen(PORT, (error) => {
    if (!error) {
        console.log(`A szerver fut, és az app figyeli a ${PORT}-res portot.`);
    } else {
        console.log("Hiba történt, a szerver nem tudott elindulni", error);
    }
});
*/