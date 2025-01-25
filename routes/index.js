import express from 'express';
import userRouter from './user';
import authRouter from './auth';
import homeRouter from './home';
import taskRouter from './task';
import categoryRouter from './category';
import logRouter from './log';
import { requireAuth, requireAuthAPI } from '../middleware/authMiddleware';
import tokenRouter from './token';
import tagRouter from './tag';

const router = express.Router();

router.use('/auth', authRouter);


router.use('/home', requireAuth, homeRouter);

router.get('/token/manage', requireAuth, (req, res) => {
    res.render('token');
});

router.use('/token', requireAuth, tokenRouter);
router.use('/user', requireAuthAPI, userRouter);
router.use('/task', requireAuthAPI, taskRouter);
router.use('/category', requireAuthAPI, categoryRouter);
router.use('/log', requireAuthAPI, logRouter);
router.use('/tag', tagRouter);


router.get('/', (req, res) => {
    res.redirect('/auth');
});

export default router;