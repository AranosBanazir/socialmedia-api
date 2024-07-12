const connection = require('../config/connection')
const { User, Thought } = require('../models')
const userSeeds = require('./usersData.json')
const thoughtSeeds = require('./thoughtData.json')

connection.once('connected', async ()=>{
 await User.deleteMany({})
 await Thought.deleteMany({})
 await User.insertMany(userSeeds)
 await Thought.insertMany(thoughtSeeds)
 process.exit(0)
})