// const Issue = require('../models/Issue');

// exports.createIssue = async (req, res) => {
//   const { title, desc, lat, long, category, is_anonymous } = req.body;
//   const images = req.files?.map(file => file.path) || [];

//   try {
//     const issue = await Issue.create({
//       title, desc, lat, long, category, is_anonymous,
//       images,
//       location: { type: 'Point', coordinates: [long, lat] },
//       user_id: req.user.id
//     });
//     res.json(issue);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// exports.getNearbyIssues = async (req, res) => {
//   const { lat, long, radius = 5000 } = req.query;
//   const issues = await Issue.find({
//     location: {
//       $nearSphere: {
//         $geometry: { type: 'Point', coordinates: [parseFloat(long), parseFloat(lat)] },
//         $maxDistance: parseInt(radius)
//       }
//     }
//   });
//   res.json(issues);
// };


const Issue = require('../models/Issue');

exports.createIssue = async (req, res) => {
  const { title, desc, lat, long, category, is_anonymous } = req.body;
  const images = req.files?.map(file => file.path) || [];

  try {
    const issue = await Issue.create({
      title, desc, lat, long, category, is_anonymous,
      images,
      location: { type: 'Point', coordinates: [long, lat] },
      user_id: req.user.id
    });
    res.json(issue);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getNearbyIssues = async (req, res) => {
  const { lat, long, radius = 5000 } = req.query;
  const issues = await Issue.find({
    location: {
      $nearSphere: {
        $geometry: { type: 'Point', coordinates: [parseFloat(long), parseFloat(lat)] },
        $maxDistance: parseInt(radius)
      }
    }
  });
  res.json(issues);
};

// ✅ This is the missing function causing your crash
exports.getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort('-createdAt');
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch issues' });
  }
};
