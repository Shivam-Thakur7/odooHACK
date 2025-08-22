
import React, { useEffect, useState } from 'react';
import api from '../api';

export default function AdminDashboard() {
  const [issues, setIssues] = useState([]);
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  const [statusLogs, setStatusLogs] = useState([]);
  const [flags, setFlags] = useState([]);
  const [newStatus, setNewStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await api.get('/issues');
      setIssues(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch issues', err);
    }
  };

  const fetchIssueDetails = async (issueId) => {
    setSelectedIssueId(issueId);
    setLoading(true);
    try {
      const [flagRes, statusRes] = await Promise.all([
        api.get(`/flags?issue=${issueId}`),
        api.get(`/status/logs?issue=${issueId}`)
      ]);
      setFlags(flagRes.data);
      setStatusLogs(statusRes.data);
    } catch (err) {
      console.error('❌ Failed to fetch issue details', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async () => {
    if (!newStatus || !selectedIssueId) return;
    try {
      await api.put(`/status/${selectedIssueId}`, { new_status: newStatus });
      alert('✅ Status updated');
      setNewStatus('');
      fetchIssueDetails(selectedIssueId);
    } catch (err) {
      console.error('❌ Failed to update status', err);
      alert('Failed to update status');
    }
  };

  const submitFlag = async () => {
    const reason = prompt("Enter flag reason:");
    if (!reason) return;
    try {
      await api.post('/flags', { issue_id: selectedIssueId, reason });
      alert('✅ Flag submitted');
      fetchIssueDetails(selectedIssueId);
    } catch (err) {
      console.error('❌ Flag submit failed', err);
      alert('Flag failed: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">🛠️ Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">📋 Reported Issues</h3>
          <div className="bg-white rounded shadow p-4 max-h-[70vh] overflow-y-auto">
            {issues.length === 0 ? (
              <p className="text-gray-500">No issues found.</p>
            ) : (
              <ul className="space-y-3">
                {issues.map((issue) => (
                  <li key={issue._id} className="border p-3 rounded shadow-sm bg-gray-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold">{issue.title}</p>
                        <p className="text-sm text-gray-600">{issue.category}</p>
                      </div>
                      <button
                        className="text-blue-600 underline text-sm"
                        onClick={() => fetchIssueDetails(issue._id)}
                      >
                        View
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {selectedIssueId && (
          <div>
            <h3 className="text-xl font-semibold mb-2">🔍 Issue Details</h3>
            <div className="bg-white rounded shadow p-4 space-y-4">
              {loading ? (
                <p className="text-gray-500 italic">Loading details...</p>
              ) : (
                <>
                  <div>
                    <h4 className="font-semibold">Status Logs:</h4>
                    {statusLogs.length === 0 ? (
                      <p className="text-sm text-gray-500">No logs yet.</p>
                    ) : (
                      <ul className="list-disc ml-5 text-sm">
                        {statusLogs.map(log => (
                          <li key={log._id}>
                            {log.status} - {new Date(log.timestamp).toLocaleString()} by {log.user_id?.name || 'Unknown'}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold">Flags:</h4>
                    {flags.length === 0 ? (
                      <p className="text-sm text-gray-500">No flags for this issue.</p>
                    ) : (
                      <ul className="list-disc ml-5 text-sm">
                        {flags.map(flag => (
                          <li key={flag._id}>
                            {flag.reason} by {flag.user_id?.name || 'Unknown'}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="border p-2 rounded"
                    >
                      <option value="">-- Change Status --</option>
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                    <button
                      onClick={updateStatus}
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Update
                    </button>

                    <button
                      onClick={submitFlag}
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                      🚩 Flag This Issue
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
