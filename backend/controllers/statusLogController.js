const StatusLog = require('../models/StatusLog');

exports.addStatus = async (req, res) => {
  const { issue_id, status } = req.body;
  const log = await StatusLog.create({ issue_id, status });
  res.json(log);
};

exports.getStatusHistory = async (req, res) => {
  const logs = await StatusLog.find({ issue_id: req.params.id }).sort('-timestamp');
  res.json(logs);
};
