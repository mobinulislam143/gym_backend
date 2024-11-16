const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true },
    className: { type: String, required: true },  // Ensure this field is named 'className'
    date: { type: Date, required: true },
    duration: { type: Number, required: true } 
}, { timestamps: true, versionKey: false });

const ClassModel = mongoose.model('classes', classSchema);
module.exports = ClassModel;
