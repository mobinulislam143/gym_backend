const ClassModel = require('../models/ClassModel');
const TrainerModel = require('../models/TrainerModel');

exports.getAllClasses = async (req, res) => {
    try {
      const classes = await ClassModel.find();  // Fetch all class schedules
      return res.status(200).json(classes);  // Send the list of all classes
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };



// Controller to add a class schedule
exports.addClassSchedule = async (req, res) => {
    const { trainerId, className, date, duration } = req.body;
  
    console.log(req.body); // Debugging: Check if className is received correctly
  
    try {
      // Validate if the class duration is greater than 2 hours
      if (duration > 2) {
        return res.status(400).json({ message: 'Class duration cannot exceed 2 hours' });
      }
  
      // Check if there are already 5 classes scheduled on the same day
      const existingClasses = await ClassModel.find({ date: new Date(date) });
      if (existingClasses.length >= 5) {
        return res.status(400).json({ message: 'Cannot have more than 5 classes per day' });
      }
  
      // Create new class schedule
      const newClass = new ClassModel({
        trainer: trainerId,
        className,
        date,
        duration
      });
  
      // Save the class to the database
      await newClass.save();
      return res.status(201).json({ message: 'Class scheduled successfully' });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  
  


  exports.getTrainerClasses = async (req, res) => {
    const { trainerId } = req.params;
    try {
      const trainerClasses = await Class.find({ trainer: trainerId });
      if (!trainerClasses) {
        return res.status(404).json({ message: 'No classes found for this trainer' });
      }
      return res.status(200).json(trainerClasses);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  exports.deleteClassSchedule = async (req, res) => {
    const { classId } = req.params;
    try {
      // Check if the class exists
      const existingClass = await Class.findById(classId);
      if (!existingClass) {
        return res.status(404).json({ message: 'Class not found' });
      }
  
      // Delete the class
      await existingClass.remove();
      return res.status(200).json({ message: 'Class deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };