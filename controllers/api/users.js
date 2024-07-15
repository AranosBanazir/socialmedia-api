const router = require('express').Router()
const {User, Thought} = require('../../models')
    //path from /api/users

    router.get('/', async (req, res)=>{
        try {
            //get all users
            const users = await User.find()
            res.json(users).status(200)
        } catch (error) {
            res.json(error).status(500)
        }
    })

    router.get('/:id', async (req, res)=>{
        const { id } = req.params
        try {
            //get specific user
            const user = await User.findOne({_id: id})
            res.json(user).status(200)
        } catch (error) {
            res.json(error).status(500)
        }


    })

    router.post('/', async (req, res)=>{
        try {
            //create new user
           const newUser = await User.create(req.body)
           res.json(newUser).status(200)
        } catch (error) {
            res.json(error).status(500)
        }
    })

    router.put('/:id', async (req, res)=>{
        try {
            const { id } = req.params
            const user = await User.findByIdAndUpdate(id, req.body, {new: true})
            res.json(user).status(200)
        } catch (error) {
            res.json(error).status(500)
        }
    })

    router.delete('/:id', async (req, res)=>{
        try {
            const { id } = req.params
            const user = await User.findByIdAndDelete(id)
            const thoughts = await Thought.deleteMany({username: user.username}) 
            res.send(`User ${user.username} deleted. ${thoughts.deletedCount} thoughts deleted.`).status(200)
        } catch (error) {
            res.json(error).status(500)
        }
    })







    router.post('/:userId/friends/:friendId', async (req, res)=>{
        const { userId, friendId } = req.params
        
        try {
            //add a new friend
            const user = await User.findByIdAndUpdate(userId, {
                $addToSet: {friends: friendId}
            },{
                new: true
            })
            res.json(user).status(200)
        } catch (error) {
            res.json(error).status(500)
        }
    })

    router.delete('/:userId/friends/:friendId', async (req, res)=>{
        const { userId, friendId } = req.params
        //remove a friend
        try {
            const user = await User.findByIdAndUpdate(userId, {
                $pull: {friends: friendId}
            },{
                new: true
            })
            res.json(user).status(200)
        } catch (error) {
            res.json(error).status(500)
        }

    })



module.exports = router