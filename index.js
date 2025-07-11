// [SECTION] Dependencies and Modules 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

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

//[SECTION] Database Setup
mongoose.connect(process.env.MONGODB_STRING)

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));

// [SECTION] Backend Routes
app.use("/users", userRoutes);
app.use("/workouts", workoutRoutes);


// [SECTION] Server Listener
if(require.main === module) {
    app.listen( process.env.PORT || 4000, () => {
        console.log(`API is now online on port ${ process.env.PORT || 4000 }`);
    })
}


module.exports = { app, mongoose };
