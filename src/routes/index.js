import { Router } from 'express';

const router = Router();
const MODE = process.env.MODE || 'production';
const PORT = process.env.PORT || 3000;

router.get('/', (req, res) => {
    const title = 'Home Page';
    res.render('index', { title, MODE, PORT });
});

export default router;