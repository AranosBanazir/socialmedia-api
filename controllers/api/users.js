const router = require('express').Router()

    //path from /api/users

    router.get('/', async (req, res)=>{
        //get all users
    })

    router.get('/:id', async (req, res)=>{
        const { id } = req.params
        //get specific user
    })

    router.post('/', async (req, res)=>{
        //create new user
    })

    router.post('/:userId/friends/:friendId', (req, res)=>{
        const { userId, friendId } = req.params

        //add a new friend


    })

    router.delete('/:userId/friends/:friendId', (req, res)=>{
        const { userId, friendId } = req.params

        //remove a friend
        

    })



module.exports = router