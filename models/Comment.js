/*
**评论模型
*/
const mongoose = require('mongoose')
const Schema = mongoose.Schema;


let CommentSchema = new Schema({
    content: {
        type:String,
        required:true,
        trim:true
    },
    createTime: {type: Date, default: Date.now},
    author: {type: Schema.Types.ObjectId, ref: 'user'},
    replys: [{type: Schema.Types.ObjectId, ref: 'replys'}]
})

module.exports = mongoose.model('comment',CommentSchema)