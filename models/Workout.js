const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User ID is required'],
    },
    name: {
        type: String,
        required: [true, 'Workout name is required']
    },
    duration: {
        type: String,
        required: [true, 'Workout duration is required']
    },
    status: {
        type: String,
        default: 'pending',
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Workout', workoutSchema);
