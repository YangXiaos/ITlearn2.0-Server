var express = require('express')
var router = express.Router();
var mongoose = require('mongoose');
const User = require('./../models/User');
const ShareLink = require('./../models/ShareLink');

/**
 * 获取首页文章列表
 */
router.get("/", function (req, res, next) {

    let page = parseInt(req.param("page"));
    let pageSize = parseInt(req.param("pageSize"));
    let skip = (page - 1) * pageSize;

    let sharelinkModel = ShareLink.find().populate({path:'author',select:'userName userEmail lovelink'}).skip(skip).limit(pageSize);
    sharelinkModel.exec(function(err,doc) {
        if (err) {
            res.json({
                status:'0',
                msg:err.message
            });
        } else {
            res.json({
                status:'1',
                msg:'',
                result:{
                    count:doc.length,
                    list:doc,
                }
            });
        }
    })
});

/**
 * 分享文章链接
 */
router.post('/submit',function(req, res, next) {

    User.findOne({userName:req.body.userName}, (err, user) => {
        if(err){
            res.json({
                message:'找不到其用户，请重试！'
            })
        } else {
            let s_sharelink = new ShareLink({
                url:req.body.url,
                title:req.body.title,
                tags:req.body.tags,
                author:user._id
            })
            s_sharelink.save(err => {
                if(err) {
                    res.json({
                        message:'存入数据失败，请重试！'
                    })
                } else {
                    res.json({
                        status:"1",
                        message:"发布成功！",
                    })
                }
            })
        }
    })
})

/**
 * 添加收藏
 */
router.post('/addlovelink',function(req, res, next) {
    
    User.findOne({
        userName:req.body.userName,
    }, (err,user) => {
        if(err){
            res.json({
                status:'0',
                message:'用户不存在'
            })
        } else {

            let lovelink_id = req.body._id;
            lovelink_index = user.lovelink.indexOf(lovelink_id)
            if(lovelink_index === -1) {
                //不存在
                user.lovelink.push(lovelink_id);
                user.save();
                res.json({
                    status:"1",
                    lovelink:user.lovelink,
                    message:'成功添加收藏！'
                })
            } else {
                user.lovelink.splice(lovelink_index,1);
                user.save();
                res.json({
                    status:"2",
                    lovelink:user.lovelink,
                    message:'取消收藏！'
                })
            }
        }
    })
})

module.exports = router;