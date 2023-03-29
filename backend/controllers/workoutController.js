const workoutModel = require("../models/workoutModel");

async function getAllWorkouts(req, res) {
  try {
const user_id = req.user._id

     const workouts = await workoutModel.find({user_id}).sort({ createdAt: -1 });

    res.status(200).send({ status: true, data: workouts });
  } catch (e) {
    res.send({ status: false, msg: e.message });
  }
}

async function getWorkout(req, res) {
  try {
    const id = req.params.id;
    const workout = await workoutModel.findOne({ _id: id });

    res.status(200).send({ status: true, data: workout });
  } catch (e) {
    res.send({ status: false, msg: e.message });
  }
}

async function createWorkout(req, res) {
  try {
    const { title, load, reps } = req.body;
    let emptyFields = [];

    if (!title) {
      emptyFields.push("title");
    }
    if (!load) {
      emptyFields.push("load");
    }
    if (!reps) {
      emptyFields.push("reps");
    }
    if (emptyFields.length > 0) {
      return res
        .status(400)
        .json({ error: "Please fill in all fields", emptyFields });
    }
const user_id = req.user._id
    const workout = await workoutModel.create({ title, load, reps ,user_id});
    res.status(201).send({ status: true, data: workout });
  } catch (e) {
    res.send({ status: false, msg: e.message });
  }
}

// delete a workout
async function deleteWorkout(req, res) {
  try {
    const id = req.params.id;
    const workout = await workoutModel.findOneAndDelete({ _id: id });
    res.status(201).send({ status: true, data: workout });
  } catch (e) {
    res.send({ status: false, msg: e.message });
  }
}

// update a workout
async function updateWorkout(req, res) {
  try {
    const id = req.params.id;
    const workout = await workoutModel.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    );
    res.status(201).send({ status: true, data: workout });
  } catch (e) {
    res.send({ status: false, msg: e.message });
  }
}

module.exports = {
  getAllWorkouts,
  createWorkout,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};