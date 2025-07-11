const express = require('express');
const workoutController = require('../controllers/workout');

const { verify } = require("../auth");

//[SECTION] Routing Component
const router = express.Router();

// [SECTION] Creating Workout Routes
router.post('/addWorkout', verify, workoutController.createWorkout);

// [SECTION] Get All Workout Routes
router.get('/getMyWorkouts', verify, workoutController.getAllWorkouts);

// [SECTION] Update All Workout Routes
router.patch('/updateWorkout/:id', verify, workoutController.updateWorkout);

// [SECTION] Delete Workout Routes
router.delete('/deleteWorkout/:id', verify, workoutController.deleteWorkout);

// [SECTION] Update Workout Status Routes
router.patch('/completeWorkoutStatus/:id', verify, workoutController.completeWorkoutStatus);

module.exports = router;