const router = require('express').Router()
const { Thought, User } = require('../../models')

    //path from: /api/thoughts

    router.get('/', async (req, res)=>{
        //get all thoughts
        try {
            const thoughts = await Thought.find()

            res.send(thoughts).status(200)
        } catch (error) {
            res.json(error).status(500)
            console.log(error)
        }
    })

    router.get('/:id', async (req, res)=>{
        //get single thought
        try {
            const { id } = req.params
            const thought = await Thought.findById(id)
            res.json(thought).status(200)    
        } catch (error) {
            res.json(error).status(500)
            console.log(error)
        }
    })

    router.post('/', async (req, res)=>{
        //create a new thought and push it to the users thoughts field
        try {
           //creating the thought
          const thought = await Thought.create(req.body)
          //pushing the thought into the Users thoughts using the username
         //as the unique identifier
          const user =  await User.findOneAndUpdate({username: req.body.username}
            ,{
                $addToSet: {thoughts: thought._id}
            },
            {
                new: true
            }
          )
            res.json(user).status(200)
        } catch (error) {
            res.json(error).status(500)
            console.log(error)
        }

    })

    router.put('/:id', async (req, res)=>{
        //update thought by id
        try {
            const { id } = req.params
            const thought = await Thought.findByIdAndUpdate(id,
                {
                   thoughtText: req.body.thoughtText 
                },
                {
                    new: true
                }
            )
            res.json(thought).status(200)
        } catch (error) {
            res.json(error).status(500)
            console.log(error)
        }
    })

    router.delete('/:id', async (req, res)=>{
        //delete by id
        try {
            const {id} = req.params
            const deleted =   await Thought.findByIdAndDelete(id)
            res.json({...deleted._doc, message: "Thought Deleted Succsessfully"}).status(200)
        } catch (error) {
            res.json(error).status(500)
            console.log(error)
        }
    })


    router.post('/:thoughtId/reactions', async (req, res)=>{
        //create a reaction and store in thought's reaction field
        try {
            const { thoughtId } = req.params

            const thought = await Thought.findByIdAndUpdate(thoughtId,{
                $addToSet: {reactions: req.body}
            }, {
                new: true
            })

            res.json(thought).status(200)
        
        } catch (error) {
            res.json(error).status(500)
            console.log(error)
        }
    })

    
    router.delete('/:thoughtId/reactions/:reactionId', async (req, res)=>{
        try {
            const { thoughtId, reactionId } = req.params
            const thought = await Thought.findById(thoughtId)
            
            //deletes the reaction with the matching id from the array
            //and then saves the document.
            thought.reactions.id(reactionId).deleteOne()
            await thought.save()

            res.json(thought).status(200)
        } catch (error) {
            res.json(error).status(500)
            console.log(error)
        }
    })

module.exports = router