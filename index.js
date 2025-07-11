// [SECTION] Dependencies and Modules 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// [SECTION] Routes
const userRoutes = require('./routes/user');
const workoutRoutes = require('./routes/workout');

// [SECTION] Server setup
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow all resources
const corsOptions = {
    //to be updated when we connect this to our client
    origin: ['http://localhost:3000', 'http://localhost:4000'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// [SECTION] Database Setup
const MONGODB_URI = 'mongodb+srv://admin123:admin123@b546.is2c4ug.mongodb.net/FitnessTrackerAPI?retryWrites=true&w=majority&appName=b546';  


mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));

// [SECTION] JWT Secret Key Setup
const JWT_SECRET = "FitnessTrackerAPI"; 

// [SECTION] Backend Routes
app.use("/users", userRoutes);
app.use("/workouts", workoutRoutes);

// [SECTION] Server Gateway Response
if (require.main === module) {
    app.listen(4000, () => {
        console.log(`API is now online on port 4000`);
    });
}

module.exports = { app, mongoose };
