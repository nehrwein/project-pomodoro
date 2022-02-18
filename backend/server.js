import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import listEndpoints from 'express-list-endpoints'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/pomodoro"
mongoose.connect(mongoUrl, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true,
  useFindAndModify: false 
})
mongoose.Promise = Promise

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// check via middleware, if we are connected to the database
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next()
  } else {
    res.status(503).json({ error: 'Service unavailable' })
  }
})

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  },
  workMinutes: {
    type: Number,
    default: 25
  },
  shortBreakMinutes: {
    type: Number,
    default: 5
  },
  longBreakMinutes: {
    type: Number,
    default: 15
  }
})

const User = mongoose.model('User', UserSchema)

const TaskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    maxlength: 150,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: String,
    default: null
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})

const Task = mongoose.model('Task', TaskSchema)

const PomodoroSchema = new mongoose.Schema({
  pomodoro: {
    type: Number,
    default: 1
  },
  completedAt: {
    type: String,
    default: null
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})

const Pomodoro = mongoose.model('Pomodoro', PomodoroSchema)

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization')

  try {
    const user = await User.findOne({ accessToken })
    if (user) {
      next()
    } else {
      res.status(401).json({
        response: {
          message: 'Please, log in',
        },
        success: false
      })
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
}

// Home
app.get('/', (req, res) => {
  res.send({ 
    Welcome: 'Welcome to the Pomodoro-API',
    Contributers: 'Birgit Nehrwein, Darya Lapata, Rebecca Philipson',
    Endpoints: 'https://final-project-pomodoro-api.herokuapp.com/endpoints',
    Documentation: 'https://documenter.getpostman.com/view/18068162/UVkiSdnR'
  })
})

// all endpoints
app.get('/endpoints', (req, res) => {
  res.json({
    response: listEndpoints(app),
    success: true
  })  
})

// endpoint for getting all the tasks and pomodoros of a user
app.get('/tasks/:userId', authenticateUser)
app.get('/tasks/:userId', async (req, res) => {
  const { userId } = req.params

  const tasks = await Task.find({ user: userId }).sort({ createdAt: 'desc' })
  const pomodoros = await Pomodoro.find({ user: userId })
  res.status(201).json({ response: { tasks, pomodoros}, success: true })
})

// endpoint for posting a new task
app.post('/tasks', authenticateUser)
app.post('/tasks', async (req, res) => {
  const { description, user } = req.body

  try {
    const queriedUser = await User.findById(user)
    const newTask = await new Task ({ description, user: queriedUser._id}).save()

    res.status(201).json({ 
      response: {
        _id: newTask._id,
        description: newTask.description, 
        completed: newTask.completed,
        pomodoros: newTask.pomodoros,
        createdAt: newTask.createdAt
      }, 
      success: true 
    })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

// endpoint to complete existing tasks
app.patch('/tasks/:taskId/complete', authenticateUser)
app.patch('/tasks/:taskId/complete', async (req, res) => {
  const { taskId } = req.params
  const { user, completed, completedAt } = req.body

  try {
    const queriedUser = await User.findById(user)
    const completedTask = await Task.findOneAndUpdate(
      { _id: taskId, user: queriedUser._id},
      { completed, completedAt },
      { new: true }
    )

    if (!completedTask) {
      res.status(404).json({ response: 'No task found with this Id', success: false})
    } else {
      res.status(200).json({ response: completedTask, success: true})
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

// endpoint to update the description of an existing task. 
// The setup of the endpoint prevents changing the description of already completed tasks
app.patch('/tasks/:taskId/update', authenticateUser)
app.patch('/tasks/:taskId/update', async (req, res) => {
  const { taskId } = req.params
  const { description, user } = req.body

  try {
    const queriedUser = await User.findById(user)
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user: queriedUser._id},
      [
        {
          $set: {
            description: {
              $switch: {
                branches: [
                  {
                    case: { $eq: ['$completed', false] },
                    then: description,
                  },
                ],
              },
            },
          },
        },
      ],
      {
        new: true,
      }
    );

    if (!updatedTask) {
      res.status(404).json({ response: 'No task found with this Id', success: false})
    } else {
      res.status(200).json({ response: updatedTask, success: true})
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

// endpoint for increasing the no. of pomodoros
app.post('/tasks/:userId/pomodoro', authenticateUser)
app.post('/tasks/:userId/pomodoro', async (req, res) => {
  const { userId } = req.params
  const { completedAt } = req.body

  try {
    const queriedUser = await User.findById(userId)
    const addPomodoro = await new Pomodoro ({ completedAt, user: queriedUser._id}).save()

    res.status(201).json({ response: addPomodoro, success: true })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

// endpoint for deleting single tasks
app.delete('/tasks/:taskId', authenticateUser)
app.delete('/tasks/:taskId', async (req, res) => {
  const { taskId } = req.params
  const { user } = req.body

  try {
    const queriedUser = await User.findById(user)
    const deletedTask = await Task.deleteOne({ _id: taskId, user: queriedUser._id})

    if (!deletedTask) {
      res.status(404).json({ response: 'No task found with this Id', success: false})
    } else {
      res.status(200).json({ response: deletedTask, success: true})
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

// endpoint for register a new user
app.post('/signup', async (req, res) => {
  const { username, password } = req.body

  try {
    const salt = bcrypt.genSaltSync()

    if (password.length < 5) {
      throw "Password must be at least 5 characters long"
    }

    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt)
    }).save()

    res.status(201).json({
      response: {
        userId: newUser._id,
        username: newUser.username,
        accessToken: newUser.accessToken,
        workMinutes: newUser.workMinutes,
        shortBreakMinutes: newUser.shortBreakMinutes,
        longBreakMinutes: newUser.longBreakMinutes
      },
      success: true
    })
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

// endpoint for login of a registered user
app.post('/signin', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        response: {
          userId: user._id,
          username: user.username,
          accessToken: user.accessToken,
          workMinutes: user.workMinutes,
          shortBreakMinutes: user.shortBreakMinutes,
          longBreakMinutes: user.longBreakMinutes
        },
        success: true
      })
    } else {
      res.status(404).json({
        response: "Username or password doesn't match",
        success: false
      })
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

// endpoint for updating the settings of the Pomodoro-timer
app.patch('/users/:userId/settings', authenticateUser)
app.patch('/users/:userId/settings', async (req, res) => {
  const { userId } = req.params
  const { workMinutes, shortBreakMinutes, longBreakMinutes } = req.body

  try {
    const queriedUser = await User.findOneAndUpdate(
      { _id: userId },
      { workMinutes, shortBreakMinutes, longBreakMinutes },
      { new: true }
    )


    if (!queriedUser) {
      res.status(404).json({ response: 'No user found with this Id', success: false})
    } else {
      res.status(200).json({ response: {workMinutes, shortBreakMinutes, longBreakMinutes}, success: true})
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

// endpoint for deleting a user and all his tasks
app.delete('/users/:userId', authenticateUser)
app.delete('/users/:userId', async (req, res) => {
  const { userId } = req.params

  try {
    const queriedUser = await User.findById(userId)
    const deletedTasks = await Task.deleteMany({ user: queriedUser._id })
    const deletedUser = await User.deleteOne({ _id: queriedUser._id })

    if (!deletedUser) {
      res.status(404).json({ response: 'No user found with this Id', success: false})
    } else {
      res.status(200).json({ response: {deletedUser, deletedTasks}, success: true})
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
