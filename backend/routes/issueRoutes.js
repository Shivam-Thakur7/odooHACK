// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const auth = require('../middlewares/authMiddleware');
// const { createIssue, getNearbyIssues } = require('../controllers/issueController');

// const storage = multer.diskStorage({
//   destination: (_, __, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
// });
// const upload = multer({ storage });

// router.post('/', auth, upload.array('images', 5), createIssue);
// router.get('/nearby', getNearbyIssues);

// module.exports = router;



const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middlewares/authMiddleware');
const { createIssue, getNearbyIssues, getAllIssues } = require('../controllers/issueController');

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/', auth, upload.array('images', 5), createIssue);
router.get('/nearby', getNearbyIssues);

// ✅ Add this route for admin dashboard
router.get('/', auth, getAllIssues);

module.exports = router;
