import express from 'express';
import { googleAuth } from '../controllers/google.js';

const router = express.Router();

// router.post('callback');
// router.get('/', passport.authenticate('google', {
//     scope: ['profile', 'email']
// }));

// router.get('/callback', passport.authenticate('google'), (req, res) => {
//     res.redirect('/users');
// })


router.post('/', googleAuth);

export default router;