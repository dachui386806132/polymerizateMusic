var express = require('express');
var router = express.Router();
const mysql =require( '../model/mysql.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a userDetail');
});

// 根据用户id查询用户喜欢的歌曲id
router.get('/userLikeSong', function(req, res, next) {
  let {id,start}  = req.query
  let sql ='SELECT  music_id FROM user_like  WHERE user_id = ? AND status = 0 ORDER BY id  DESC limit ?,?;'
  mysql(sql,[id,parseInt(start),parseInt(start)+10],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'查询用户喜欢歌曲失败！'
      })
    }else {
      res.json({
        code:200,
        text:'查询用户喜欢歌曲成功!',
        data:result
      })
    }
  })
});

// 获取用户所有喜欢的歌曲
router.get('/userLikeSongAll', function(req, res, next) {
  let {id}  = req.query
  let sql ='SELECT music_id id FROM user_like WHERE user_id= ? AND `status` = 0'
  mysql(sql,[id],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'查询用户所有喜欢歌曲失败！'
      })
    }else {
      res.json({
        code:200,
        text:'查询用户所有喜欢歌曲成功!',
        data:result
      })
    }
  })
});

// 根据用户id查询用户喜欢的歌曲数量
router.get('/userLikeNum', function(req, res, next) {
  let {id}  = req.query
  let sql ='SELECT COUNT(*)music_id FROM user_like  WHERE user_id = ? AND status = 0'
  mysql(sql,[id],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'查询用户喜欢歌曲数量失败！'
      })
    }else {
      res.json({
        code:200,
        text:'查询用户喜欢歌曲数量成功!',
        data:result
      })
    }
  })
});

// 根据用户id查询用户的歌曲听歌列表歌曲id
router.get('/userListenList', function(req, res, next) {
  let {id}  = req.query
  let sql ='SELECT  music_id FROM user_listen_list  WHERE user_id = ? AND status = 0 ORDER BY id  DESC '
  mysql(sql,[id],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'查询用户听歌列表失败！'
      })
    }else {
      res.json({
        code:200,
        text:'查询用户听歌列表成功!',
        data:result
      })
    }
  })
});

// 查询歌单是否有这首歌
router.get('/searchListen', function(req, res, next) {
  let {id} = req.query
  let sql ='SELECT * FROM user_listen_list WHERE music_id=? AND status =0'
  mysql(sql,[id],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'查询歌单失败！'
      })
    }else {
      res.json({
        code:200,
        text:'查询歌单成功!',
        data:result
      })
    }
  })
});

// 添加播放列表歌曲
router.post('/addListen', function(req, res, next) {
  let { musicId, userId } = req.body
  let sql ='INSERT into user_listen_list(music_id,user_id) VALUES (?,?)'
  mysql(sql,[musicId,userId],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'添加歌曲失败!'
      })
    }else {
      res.json({
        code:200,
        text:'添加歌曲成功!',
        result
      })
    }
  })
});

// 更新这首歌的播放列表状态
router.post('/addUpdateListen', function(req, res, next) {
  let { musicId, userId } = req.body
  let sql ='UPDATE user_listen_list SET status = 0 WHERE music_id = ? AND user_id = ?'
  mysql(sql,[musicId,userId],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'更新歌曲失败!'
      })
    }else {
      res.json({
        code:200,
        text:'更新歌曲成功!',
        result
      })
    }
  })
});

// 取消喜欢
router.post('/removeLike', function(req, res, next) {
  let { id,userId } = req.body
  let sql =' UPDATE user_like SET status=1 WHERE music_id = ? AND user_id = ? '
  mysql(sql,[id,userId],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'取消失败！'
      })
    }else {
      res.json({
        code:200,
        text:'取消成功！',
        data:result
      })
    }
  })
});

// 个人信息
router.post('/getMyMessage', function(req, res, next) {
  let { id } = req.body
  let sql ='SELECT user_img img,user_str str,username name FROM user_info WHERE id = ?'
  mysql(sql,[id],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'获取个人信息失败！'
      })
    }else {
      res.json({
        code:200,
        text:'获取个人信息成功！',
        result
      })
    }
  })
});


module.exports = router;
