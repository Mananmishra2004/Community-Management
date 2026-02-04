const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const userModel = require('./models/user');

// Configuration
const JWT_SECRET = "1234"; 
const ADMIN_CREDENTIALS = {
    email: "admin@gmail.com",
    password: "admin123" 
};


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


const isAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.redirect('/login');

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data; 
        next();
    } catch (err) {
        res.clearCookie("token");
        res.redirect('/login');
    }
};


app.get('/login', (req, res) => {
    res.render("login");
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        const token = jwt.sign({ email }, JWT_SECRET);
        res.cookie("token", token);
        return res.redirect("/admin");
    }
    res.send("Invalid Admin Credentials. <a href='/login'>Try again</a>");
});

app.get('/logout', (req, res) => {
    res.clearCookie("token");
    res.redirect("/read");
});


app.get('/read', async (req, res) => {
    let users = await userModel.find();
    const token = req.cookies.token;
    
    let loggedIn = false;
    if(token) {
        try { 
            jwt.verify(token, JWT_SECRET); 
            loggedIn = true; 
        } catch(e) {}
    }

    res.render("read", { users, isAdmin: loggedIn });
});


app.get('/admin', isAdmin, async (req, res) => {
    let users = await userModel.find();
    res.render("admin", { users, count: users.length });
});

app.get('/create-page', isAdmin, (req, res) => {
    res.render("index");
});

app.post('/create', isAdmin, async (req, res) => {
    let { name, email, image, password } = req.body;
    await userModel.create({ name, email, image, password });
    res.redirect("/admin");
});

app.get('/edit/:userid', isAdmin, async (req, res) => {
    let user = await userModel.findOne({ _id: req.params.userid });
    res.render("edit", { user });
});

app.post('/update/:userid', isAdmin, async (req, res) => {
    let { name, email, image } = req.body;
    await userModel.findOneAndUpdate(
        { _id: req.params.userid },
        { name, email, image },
        { new: true }
    );
    res.redirect("/admin");
});

app.get('/delete/:userid', isAdmin, async (req, res) => {
    await userModel.findOneAndDelete({ _id: req.params.userid });
    res.redirect("/admin");
});


app.get('/', (req, res) => res.redirect('/read'));

app.listen(3000, () => console.log("Server running on http://localhost:3000"));