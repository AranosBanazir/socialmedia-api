const router = require('express').Router()

    //path from: /api/thoughts

    router.get('/', (req, res)=>{
        //get all thoughts
    })

    router.get('/:id', (req, res)=>{
        const { id } = req.params
        //get single thought
    })

    router.post('/', (req, res)=>{
        //create a new thought and push it to the users thoughts field
    })

    router.put('/:id', (req, res)=>{
        const { id } = req.params
        //update thought by id
    })

    router.delete('/:id', (req, res)=>{
        const {id} = req.params
        //delete by id
    })


    router.post('/:thoughtId/reactions', (req, res)=>{
        const { thoughtId } = req.params
        //create a reaction and store in thought's reaction field
    })

    
    router.delete('/:thoughtId/reactions/:reactionId', (req, res)=>{
        const { thoughtId, reactionId } = req.params

        //create a reaction and store in thought's reaction field
    })

module.exports = router