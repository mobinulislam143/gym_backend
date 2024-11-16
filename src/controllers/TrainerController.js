const TrainerModel = require('../models/TrainerModel');



exports.getTrainers  = async (req, res) => {
    try {
		const trainers = await TrainerModel.find().populate('user_id');
		       
        res.status(200).json({ status: "success", data: trainers });
       
    } catch (e) {
        res.status(400).json({ status: "fail", data: e.toString() });
    }
};
exports.addTrainer   = async (req, res) => {
	const { expertise, bio, available_days  } = req.body;
	const user_id = req.user._id

    try {
        const newTrainer = new TrainerModel({
            user_id,
            expertise,
            bio,
            available_days
        });

        await newTrainer.save();
        res.status(201).json({ message: 'Trainer added successfully', trainer: newTrainer });
    } catch (err) {
        res.status(500).json({ message: 'Error adding trainer', error: err });
    }
};
exports.updateTrainer   = async (req, res) => {
	const { id  } = req.params;
	const { expertise, bio, available_days } = req.body;

    try {
        const updateTrainer = await TrainerModel.findByIdAndUpdate(id, { expertise, bio, available_days }, { new: true })

        if (!updateTrainer) {
            return res.status(404).json({ message: 'Trainer not found' });
        }

        res.status(201).json({ message: 'Trainer added successfully', trainer: updateTrainer });
    } catch (err) {
        res.status(500).json({ message: 'Error adding trainer', error: err });
    }
};
exports.deleteTrainer   = async (req, res) => {
	const { id  } = req.params;

    try {
		const deletedTrainer = await TrainerModel.findByIdAndDelete(id);

        if (!deletedTrainer) {
            return res.status(404).json({ message: 'Trainer not found' });
        }

        res.status(201).json({ message: 'Trainer delete successfully' });
    } catch (err) {
		console.log(err)
        res.status(500).json({ message: 'Error deleting trainer', error: err.toString() });
    }
};


