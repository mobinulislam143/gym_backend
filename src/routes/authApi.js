const express =require('express');
const UserController=require("../controllers/UserController");
const TrainerController=require("../controllers/TrainerController");
const ClassController=require("../controllers/ClassController");
const Authmiddleware = require('../middleware/Authmiddleware');
const router =express.Router();


// auth
router.post('/registration', UserController.signUp)
router.get('/', UserController.test)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)

// trainer
router.get('/getTrainer',  TrainerController.getTrainers)
router.post('/addTrainer', Authmiddleware, TrainerController.addTrainer)
router.post('/updateTrainer/:id', Authmiddleware, TrainerController.updateTrainer)
router.delete('/deleteTrainer/:id', Authmiddleware, TrainerController.deleteTrainer)

//classes
router.get('/getAllClasses', Authmiddleware, ClassController.getAllClasses)
router.post('/addClassSchedule', Authmiddleware, ClassController.addClassSchedule)





module.exports=router;

// http://localhost:7000/api