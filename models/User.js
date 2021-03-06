/**
 * 用户模型
 * userName   : 用户名
 * userEmail  : 邮箱
 * userPwd    : 密码
 * lovelink   : 收藏文章，ref 指向 sharelink 模型
 * following  : 正在关注的用户
 * follower   : 粉丝
 * createTime : 注册时间
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const objectId = Schema.Types.ObjectId;
let sharelink = require('./ShareLink')

// let lovelinkSchema = new Schema({
//     linkid:{type: Schema.Types.ObjectId,ref: 'sharelink',},
//     isHeartClick:{type:Boolean,default:false}
// })

let UserSchema = new Schema({
    userName:{
        type:String,
        unique:true,
        required:true,
        trim:true,
    },
    userEmail:{
        type:String,
        unique:true,
        required:true,
        trim:true,
    },
    userPwd:{
        type:String,
        required:true,
        trim:true
    },
    createTime:{
        type: Date, 
        default: Date.now
    },

    // lovelink:[lovelinkSchema],

    lovelink: [{
        type: Schema.Types.ObjectId,
        ref: 'sharelink'
    }],
    following: Array,
    follower: Array
})

module.exports = mongoose.model('user',UserSchema);

