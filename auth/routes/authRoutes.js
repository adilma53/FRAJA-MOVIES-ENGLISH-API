import express from 'express';
const router = express.Router();
import { signUp, login } from '../controllers/authController.js';
import { validateEmailPassLogin } from '../middleware/validateEmailPassLogin.js';
import { validateEmailPassSignup } from '../middleware/validateEmailPassSignup.js';
import { authorizeToken } from '../middleware/authorizeToken.js';

// ------------------------------------------------------------------------

router.post('/signup', validateEmailPassSignup, signUp);

router.post('/login', validateEmailPassLogin, login);

// testing token authorization
router.get('/private_profile', authorizeToken, async (req, res) => {
  console.log(req.currentUser);
  return res
    .status(200)
    .send(`you are in the private profile of ${req.currentUser.email}`);
});

export default router;
