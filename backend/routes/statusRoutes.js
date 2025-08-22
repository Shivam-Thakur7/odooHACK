// const express = require('express');
// const router = express.Router();
// const auth = require('../middlewares/authMiddleware');
// const { addStatus, getStatusHistory } = require('../controllers/statusLogController');

// router.post('/', auth, addStatus);
// router.get('/:id', getStatusHistory);

// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const auth = require('../middlewares/authMiddleware');
// const { addStatus, getStatusHistory } = require('../controllers/statusLogController');
// const StatusLog = require('../models/StatusLog');

// // already exists
// router.post('/', auth, addStatus);
// router.get('/:id', getStatusHistory);

// // ✅ Add logs fetch (used in AdminDashboard)
// router.get('/logs', auth, async (req, res) => {
//   const { issue } = req.query;
//   const query = issue ? { issue_id: issue } : {};
//   const logs = await StatusLog.find(query).sort('-timestamp').populate('user_id', 'name');
//   res.json(logs);
// });

// // ✅ Add status update + log
// router.put('/:id', auth, async (req, res) => {
//   const { new_status } = req.body;
//   try {
//     const log = await StatusLog.create({
//       issue_id: req.params.id,
//       status: new_status,
//       user_id: req.user.id
//     });
//     res.json({ message: 'Status updated', log });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { addStatus, getStatusHistory } = require('../controllers/statusLogController');
const StatusLog = require('../models/StatusLog');

// ✅ 1. GET logs by query param (used in AdminDashboard)
router.get('/logs', auth, async (req, res) => {
  const { issue } = req.query;
  const query = issue ? { issue_id: issue } : {};

  try {
    const logs = await StatusLog.find(query)
      .sort('-timestamp')
      .populate({
        path: 'user_id',
        select: 'name',
        options: { strictPopulate: false } // ✅ avoid crash if user is missing
      });

    res.json(logs);
  } catch (err) {
    console.error("❌ Error in GET /status/logs:", err);
    res.status(500).json({ error: 'Failed to fetch status logs' });
  }
});

// ✅ 2. PUT to update status of an issue (adds a new log)
router.put('/:id', auth, async (req, res) => {
  const { new_status } = req.body;

  try {
    const log = await StatusLog.create({
      issue_id: req.params.id,
      status: new_status,
      user_id: req.user.id
    });

    res.json({ message: 'Status updated', log });
  } catch (err) {
    console.error("❌ Error in PUT /status/:id:", err);
    res.status(400).json({ error: err.message });
  }
});

// ✅ 3. POST to add a log manually (if needed)
router.post('/', auth, addStatus);

// ✅ 4. GET logs for an issue by ID (fallback)
router.get('/:id', getStatusHistory);

module.exports = router;
