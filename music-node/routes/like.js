var express = require('express');
const mysql = require("../model/mysql.js");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a like');
});

// 收藏专辑
router.post('/likeAlbum', function(req, res, next) {
  let { userId , albumId } = req.body
  let sql ='insert into user_like_album(user_id,album_id) values(?,?)'
  mysql(sql,[userId,albumId],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'收藏失败！'
      })
    }else {
      res.json({
        code:200,
        text:'收藏成功！',
        result
      })
    }
  })
});

// 收藏歌单
router.post('/likeSongList', function(req, res, next) {
  let { userId , songListId } = req.body
  console.log(userId)
  console.log(songListId)
  let sql ='insert into user_like_songlist(user_id,songlist_id) values(?,?)'
  mysql(sql,[userId,songListId],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'收藏失败！'
      })
    }else {
      res.json({
        code:200,
        text:'收藏成功！',
        result
      })
    }
  })
});

// 取消喜欢专辑
router.post('/removeLikeAlbum', function(req, res, next) {
  let { albumId,userId } = req.body
  let sql =' UPDATE user_like_album SET status=1 WHERE album_id = ? AND user_id = ? '
  mysql(sql,[albumId,userId],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'删除失败！'
      })
    }else {
      res.json({
        code:200,
        text:'删除成功！',
        data:result
      })
    }
  })
});

// 取消喜欢歌单
router.post('/removeLikeSongList', function(req, res, next) {
  let { songListId,userId } = req.body
  let sql =' UPDATE user_like_songlist SET status=1 WHERE songlist_id = ? AND user_id = ? '
  mysql(sql,[songListId,userId],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'删除失败！'
      })
    }else {
      res.json({
        code:200,
        text:'删除成功！',
        data:result
      })
    }
  })
});

// 查询是否喜欢专辑
router.post('/isAlbumLike', function(req, res, next) {
  let {albumId,userId}  = req.body
  let sql ='SELECT * FROM user_like_album WHERE album_id = ? AND user_id = ? AND status = 0'
  mysql(sql,[albumId,userId],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'查询喜欢失败！'
      })
    }else {
      res.json({
        code:200,
        text:'查询喜欢成功!',
        data:result
      })
    }
  })
});

// 查询是否喜欢歌单
router.post('/isSongListLike', function(req, res, next) {
  let {songListId,userId}  = req.body
  let sql ='SELECT * FROM user_like_songlist WHERE songlist_id = ? AND user_id = ? AND status = 0'
  mysql(sql,[songListId,userId],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'查询喜欢失败！'
      })
    }else {
      res.json({
        code:200,
        text:'查询喜欢成功!',
        data:result
      })
    }
  })
});

// 查询用户喜欢歌曲数量select sum(user_id=1) from user_like
router.post('/searchLikeSongNum', function(req, res, next) {
  let {userId}  = req.body
  console.log(userId)
  let sql ='select sum(user_id=?) num from user_like where status = 0'
  mysql(sql,[userId],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'查询喜欢数量失败！'
      })
    }else {
      res.json({
        code:200,
        text:'查询喜欢数量成功!',
        data:result
      })
    }
  })
});

// 查询用户喜欢专辑数量select sum(user_id=1) from user_like
router.post('/searchLikeAlbumNum', function(req, res, next) {
  let {userId}  = req.body
  let sql ='select sum(user_id=?) num from user_like_album where status = 0'
  mysql(sql,[userId],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'查询喜欢数量失败！'
      })
    }else {
      res.json({
        code:200,
        text:'查询喜欢数量成功!',
        data:result
      })
    }
  })
});

// 查询用户喜欢歌单数量select sum(user_id=1) from user_like
router.post('/searchLikeSongListNum', function(req, res, next) {
  let {userId}  = req.body
  let sql ='select sum(user_id=?) num from user_like_songlist where status = 0'
  mysql(sql,[userId],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'查询喜欢数量失败！'
      })
    }else {
      res.json({
        code:200,
        text:'查询喜欢数量成功!',
        data:result
      })
    }
  })
});

// 获取用户喜欢专辑
router.post('/getLikeAlbum', function(req, res, next) {
  let {userId}  = req.body
  let sql ='SELECT * FROM user_like_album WHERE user_id = ? AND status = 0'
  mysql(sql,[userId],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'查询喜欢专辑失败！'
      })
    }else {
      res.json({
        code:200,
        text:'查询喜欢专辑成功!',
        data:result
      })
    }
  })
});

// 获取用户喜欢歌单
router.post('/getLikeSongList', function(req, res, next) {
  let {userId}  = req.body
  let sql ='SELECT * FROM user_like_songlist WHERE user_id = ? AND status = 0'
  mysql(sql,[userId],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'查询喜欢歌单失败！'
      })
    }else {
      res.json({
        code:200,
        text:'查询喜欢歌单成功!',
        data:result
      })
    }
  })
});

module.exports = router;
