const {Schema, model} = require('mongoose')
const mongoose = require('mongoose')

const reactionSchema = new Schema({
    reactionId:{
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId
    },
    reactionBody:{
        type: String,
        required: true,
        maxLength: 280,
    },
    
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: formatDate
    }
},{
    toJSON: {
        getters: true
    }
})


function formatDate(date){
    return date.toLocaleDateString()
}

const thoughtSchema = new Schema({
    thoughtText: {type: String, maxLength: 280, minLength: 1 , required: true },
    createdAt: {type: Date, default: new Date().toLocaleDateString()},
    username: {type: String, required: true},
    reactions: [reactionSchema],
})



const Thought = model('Thought', thoughtSchema)


module.exports = Thought