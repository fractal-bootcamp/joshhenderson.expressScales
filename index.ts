import cookieParser from 'cookie-parser';
import express from 'express';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => { res.send('Hello World') })

app.post('/login', (req, res) => {
    if (req.body.password === SITE_PASSWORD) {
        res.cookie('authToken', VALID_AUTH_TOKEN, { maxAge: 900000, httpOnly: true });
        return res.send('You are now logged in!');
    }
    else {
        return res.send('Incorrect password.');
    }
});

app.get('/dashboard', (req, res) => {
    if (req.cookies.authToken === VALID_AUTH_TOKEN) {
        return res.send('Welcome to the dashbaord, you are logged in!');
    }
    else {
        return res.redirect('/dashboard');
    }
    return res.sendFile(__dirname + '/login.html');
});

app.get('/logout', (req, res) => {
    res.clearCookie('authToken');
    return res.redirect('/login');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000, htttp://localhost:3000');
}); 