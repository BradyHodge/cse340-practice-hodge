import { Router } from 'express';

const router = Router();
 
router.get('/', (req, res) => {
    res.render('index', { title: 'Home Page', MODE, PORT });
});

export default router;