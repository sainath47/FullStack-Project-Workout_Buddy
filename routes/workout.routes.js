const express = require("express");
const router = express.Router();


const {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");

const {requireAuth} = require('../middleware/requireAuth')

//get all workouts
router.get("/", requireAuth,getAllWorkouts);
//get  a single workout
router.get("/:id",requireAuth, getWorkout);

//post a new workout
router.post("/", requireAuth,createWorkout);

//delete a workout
router.delete("/:id",requireAuth, deleteWorkout);

//patch a workout
router.patch("/:id", requireAuth,updateWorkout);



module.exports = router;
