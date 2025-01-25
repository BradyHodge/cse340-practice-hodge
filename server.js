import express from 'express';
import routes from './src/routes';
import session from 'express-session';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

dotenv.config();

if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET must be set in environment variables');
}


if (process.env.NODE_ENV === 'production' && !process.env.PRODUCTION_DOMAIN) {
    throw new Error('PRODUCTION_DOMAIN must be set in environment variables when in production mode');
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

store.on('error', function(error) {
    console.error('Session Store Error:', error);
});


app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax',
    },
    store: store,
    resave: false,
    saveUninitialized: false,
    name: 'sessionId'
}));

if (process.env.NODE_ENV === 'production'){
    app.set('trust proxy', 1);
}

app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_DOMAIN : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));

app.use(express.json());

app.use('/', routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke :(' });
});

app.listen(port, () => {
    console.log(`Server listening at ${port}`);
});