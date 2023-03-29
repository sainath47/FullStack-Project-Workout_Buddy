require('dotenv').config()
const path = require('path')
const express = require('express');
const workoutRoutes = require('./routes/workout.routes')
const userRoutes = require('./routes/user.routes')
const mongoose = require('mongoose')
//express app
const app = express()
app.use(express.json())

//routes
app.use((req,res,next) => {
    console.log(req.path, req.method);
    next()
})

app.use('/api/workouts',workoutRoutes)
app.use('/api/user',userRoutes)

app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});



//listen for requests
app.listen(process.env.PORT,()=>{console.log('listening on port 4000')

mongoose.connect(process.env.MONGODB_URI).then(console.log('MongoDB connected')).catch((error)=>{console.log(error)})
})


