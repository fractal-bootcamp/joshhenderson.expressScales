import cookieParser from 'cookie-parser'
import express, { urlencoded } from 'express'

const app = express()

app.use(urlencoded({ extended: true }))
app.use(cookieParser())

app.get("/", (req, res) => {
    console.log("hello world")
});

app.listen(3004, () => { console.log("server is runnong on port 30004, http://localhost3004") })

app.post("/login", (req, res) => {
    if (req.body.password === VALID_AUTH_TOKEN) {
        res.cookie("authToken", VALID_AUTH_TOKEN, { maxAge: 900000, httpOnly: true })
    }
    else {
        return res.send("Incorrect Password");
    }
});

app.get("/dashboard", (req, res) => {
    if (req.cookies.authToken === VALID_AUTH_TOKEN) {
        return res.redirect("/dashboard");
    }
    return res.redirect("/login")

})

app.get("/login", (req, res) => {
    if (req.cookies.authTokem === VALID_AUTH_TOKEN) {
        return res.redirect("/dashboard");
    }
    return res.sendFile("/login.html")
})

app.get("/logout", (req, res) => {
    res.clearCookie("authToken");
    return res.redirect("/login")
})