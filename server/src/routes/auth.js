const express = require('express');
const router = express.Router();
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require('../validators/auth')
const { signup, signin, getUser, updateUser, signout } = require('../controller/auth');
const { requireSignin } = require('../common-middleware/index');

router.post('/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/signin', validateSigninRequest, isRequestValidated, signin);
router.get('/getUser', requireSignin, getUser);
router.post('/updateUser', requireSignin, updateUser);
router.post('/signout', signout);

module.exports = router;