const express = require('express');
const router = express.Router();
const { requireSignin } = require('../common-middleware/index');
const { getStation, saveStation, getAllStation, updateStation } = require('../controller/station');

router.get('/getAllStation', getAllStation);
router.post('/saveStation', saveStation);
router.post('/getStation', getStation);
router.post('/updateStation', updateStation);

module.exports = router;