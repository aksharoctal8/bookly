import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './App/Database/db.js';
import models from './App/Models/EloquentCollection.js';
import router from './App/web/router.js';
import session from 'express-session';
import passport from 'passport';
import passportlocal from './App/Middleware/passport-local.js';
const app = express();


db();
models();

app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'App', 'View'));
app.use(express.static(path.join(__dirname, 'App', 'Assets')));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    name: "akshar",
    secret: "akshar",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 100,
        httpOnly: true,
    }
}))
app.use(passport.initialize());
app.use(passport.session())
app.use(passport.setAuth);
router(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(
        `⚡️[NodeJs server]: Server is running at http://localhost:${PORT}`);
    console.log("databse connected");
});
