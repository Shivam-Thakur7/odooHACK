// const express = require('express');
// const router = express.Router();
// const auth = require('../middlewares/authMiddleware');
// const { flagIssue } = require('../controllers/flagController');

// router.post('/', auth, flagIssue);

// module.exports = router;



const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { flagIssue } = require('../controllers/flagController');
const Flag = require('../models/Flag');

router.post('/', auth, flagIssue);

// ✅ Add this for fetching flags per issue
router.get('/', auth, async (req, res) => {
  const { issue } = req.query;
  const query = issue ? { issue_id: issue } : {};
  const flags = await Flag.find(query).populate('user_id', 'name');
  res.json(flags);
});

module.exports = router;
