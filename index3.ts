import cookieParser from 'cookie-parser';
import express, { urlencoded } from 'express'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("hello world")
});

app.listen(3003, () => {
    console.log("server is listening on port 3003, http://localhost:3003");
});

app.post("/login", (req, res) => {
    if (req.body.password === SITE_PASSWPRD) {
        res.cookie('authToken', VALID_AUTH_TOKEN, { maxAge: 900000, httpOnly: true }) //name , token , objext with age and http only 
    }
    else {
        return res.send('Incorrect Password');
    }
});

app.get("/dashboard", (req, res) => {
    if (req.cookies.authToken === VALID_AUTH_TOKEN) {
        return res.redirect("/dashboard")
    }
    return res.redirect("/login");
})

app.get("/login", (req, res) => {
    if (req.cookies.authToken === VALID_AUTH_TOKEN) {
        return res.redirect("/dashboard");
    }
    return res.sendFile("/login.html")
});

app.get("/logout", (req, res) => {
    res.clearCookie("authTokem");
    return res.redirect('/login');
});
