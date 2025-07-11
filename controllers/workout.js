const bcrypt = require('bcrypt');
const User = require('../models/User');
const Workout = require('../models/Workout');
const auth = require('../auth');

const { errorHandler } = auth;

// [SECTION] Create Workout
module.exports.createWorkout = async (req, res) => {
    try {
        const { name, duration, status } = req.body;
        const userId = req.user._id;
        const newWorkout = new Workout({
            userId,
            name,
            duration,
            status: status || 'pending',
            dateAdded: new Date()
        });
        const savedWorkout = await newWorkout.save();
        res.status(201).json(savedWorkout);
    } catch (error) {
        errorHandler(error, req, res);
    }
};

// [SECTION] Get All Workout
module.exports.getAllWorkouts = async (req, res) => {
    try {
        const userId = req.user._id;
        const workouts = await Workout.find({ userId }).sort({ dateAdded: -1 });
        res.status(200).json({ workouts }); 
    } catch (error) {
        errorHandler(error, req, res);
    }
};

// [SECTION] Update Workout
module.exports.updateWorkout = async (req, res) => {
    try {
        const workoutId = req.params.id;
        const { name, duration, status } = req.body;
        const userId = req.user._id;
        // Find and update the workout, return the new document
        const updatedWorkout = await Workout.findOneAndUpdate(
            { _id: workoutId, userId },
            { name, duration, status },
            { new: true }
        );
        if (!updatedWorkout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.status(200).json({
            message: 'Workout updated successfully',
            updatedWorkout
        });
    } catch (error) {
        errorHandler(error, req, res);
    }
};


// [SECTION] Delete Workout
module.exports.deleteWorkout = async (req, res) => {
    try {
        const workoutId = req.params.id;
        const userId = req.user._id;
        const deleted = await Workout.findOneAndDelete({ _id: workoutId, userId });
        if (!deleted) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.status(200).json({ message: 'Workout deleted successfully' });
    } catch (error) {
        errorHandler(error, req, res);
    }
};

// [SECTION] Update Workout Status
module.exports.completeWorkoutStatus = async (req, res) => {
    try {
        const workoutId = req.params.id;
        const userId = req.user._id;
        // Only update the status to 'completed'
        const updatedWorkout = await Workout.findOneAndUpdate(
            { _id: workoutId, userId },
            { status: 'completed' },
            { new: true }
        );
        if (!updatedWorkout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        res.status(200).json({
            message: 'Workout status updated successfully',
            updatedWorkout
        });
    } catch (error) {
        errorHandler(error, req, res);
    }
};