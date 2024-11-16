const mongoose = require('mongoose');

const trainerSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    expertise: { type: String, required: true },
    bio: { type: String, required: true },
    available_days: [String],  // Array of days, e.g., ['Monday', 'Wednesday', 'Friday']
}, { timestamps: true, versionKey: false });

const TrainerModel = mongoose.model('trainers', trainerSchema);
module.exports = TrainerModel;
