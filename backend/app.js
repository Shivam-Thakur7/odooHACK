const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


// Routes

app.get('/', (req, res) => {
  res.send('Backend is up and running ✅');
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/issues', require('./routes/issueRoutes'));
app.use('/api/status', require('./routes/statusRoutes'));
app.use('/api/flags', require('./routes/flagRoutes'));

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.log(err));
