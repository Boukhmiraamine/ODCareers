const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors package
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const testRoutes = require('./routes/testRoutes');
const adminRoutes = require('./routes/adminRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const profileRoutes = require('./routes/profileRoutes');
const { mongoURI, port } = require('./config/config');
const recruiterRoutes = require('./routes/recruiterRoutes');

const app = express();

// Use cors middleware
app.use(cors());

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/recruiters', recruiterRoutes);
//app.use('/api/profile', profileRoutes);

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
