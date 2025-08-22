const Flag = require('../models/Flag');

exports.flagIssue = async (req, res) => {
  const { issue_id, reason } = req.body;
  const flag = await Flag.create({
    issue_id,
    user_id: req.user.id,
    reason
  });
  res.json(flag);
};
