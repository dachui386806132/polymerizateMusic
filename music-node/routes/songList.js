var express = require('express');
const mysql = require("../model/mysql.js");
const {LONG} = require("mysql/lib/protocol/constants/types");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a songList');
});

// 查询用户所有歌单
router.get('/getList', function(req, res, next) {
  let {userId}  = req.query
  let sql ='SELECT * FROM `song_list` WHERE user_id =? and status = 0'
  mysql(sql,[userId],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'查询用户歌单失败！'
      })
    }else {
      res.json({
        code:200,
        text:'查询用户歌单成功!',
        data:result
      })
    }
  })
});

// 查询用户单个歌单的歌曲数量
router.get('/getListNum', function(req, res, next) {
  let {listId}  = req.query
  let sql ='SELECT count(*) num FROM `song_list_music` WHERE song_list_id =? AND status = 0'
  mysql(sql,[listId],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'查询用户歌单歌曲数量失败！'
      })
    }else {
      res.json({
        code:200,
        text:'查询用户歌单歌曲数量成功!',
        data:result
      })
    }
  })
});

// 查询用户我喜欢歌单的歌曲数量
router.get('/getLikeNum', function(req, res, next) {
  let {userId}  = req.query
  let sql ='SELECT count(*) num FROM `user_like` WHERE user_id =?'
  mysql(sql,[userId],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'查询用户我喜欢歌单歌曲数量失败！'
      })
    }else {
      res.json({
        code:200,
        text:'查询用户我喜欢歌单歌曲数量成功!',
        data:result
      })
    }
  })
});

// 创建新歌单
router.post('/createList', function(req, res, next) {
  let { userId , listName , about='无' } = req.body
  let sql ='insert into song_list(user_id,list_name,about) values(?,?,?)'
  mysql(sql,[userId,listName,about],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'创建新歌单失败(Insert)！'
      })
    }else {
      res.json({
        code:200,
        text:'创建新歌单成功(Insert)！',
        data:result
      })
    }
  })
});

// 删除歌单
router.post('/removeList', function(req, res, next) {
  let { listId } = req.body
  let sql ='UPDATE song_list SET status=1 WHERE id = ? '
  mysql(sql,[listId],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'删除歌单失败！'
      })
    }else {
      res.json({
        code:200,
        text:'删除歌单成功！',
        data:result
      })
    }
  })
});

// 查询歌单是否有此歌曲
router.get('/isListSong', function(req, res, next) {
  let {listId,musicId}  = req.query
  let sql ='SELECT * FROM song_list_music WHERE song_list_id = ? AND music_id =? AND status = 0'
  mysql(sql,[listId,musicId],(err,result)=>{
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

// 给歌单添加歌曲
router.post('/appendListSong', function(req, res, next) {
  let { listId , songId } = req.body
  let sql ='insert into song_list_music(song_list_id,music_id) values(?,?)'
  mysql(sql,[listId,songId],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'给歌单添加歌曲失败！'
      })
    }else {
      res.json({
        code:200,
        text:'给歌单添加歌曲成功！',
        data:result
      })
    }
  })
});

// 给歌单更换封面
router.post('/setListImg', function(req, res, next) {
     let { listId , url } = req.body
     let sql ='UPDATE song_list SET list_img=? WHERE id = ?'
     mysql(sql,[url,listId],(err,result)=>{
       if (err){
         res.json({
           code:500,
           text:'给歌单更改封面失败！'
         })
       }else {
         res.json({
           code:200,
           text:'给歌单更改封面成功！',
           data:result
         })
       }
     })
   });

// 查询歌单信息
router.post('/searchList', function(req, res, next) {
     let { listId } = req.query
     let sql ='SELECT * FROM song_list WHERE id = ?  AND status = 0'
     mysql(sql,[listId],(err,result)=>{
       if (err){
         res.json({
           code:500,
           text:'查询歌单失败！'
         })
       }else {
         res.json({
           code:200,
           text:'查询歌单成功！',
           data:result
         })
       }
     })
   });

// 查询歌单所有歌曲
router.get('/searchListSong', function(req, res, next) {
  let {listId}  = req.query
  let sql ='SELECT * FROM song_list_music WHERE song_list_id = ?  AND status = 0'
  mysql(sql,[listId],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'查询歌单歌曲失败！'
      })
    }else {
      res.json({
        code:200,
        text:'查询歌单歌曲成功!',
        data:result
      })
    }
  })
});


module.exports = router;
