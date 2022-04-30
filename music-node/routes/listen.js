var express = require('express');
const mysql = require("../model/mysql.js");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a listen');
});

// 查询是否喜欢
router.get('/isListenLike', function(req, res, next) {
  let {id,userId}  = req.query
  let sql ='SELECT * FROM user_like WHERE music_id = ? AND user_id = ? AND status = 0'
  mysql(sql,[id,userId],(err,result)=>{
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

// 添加到喜欢1
router.post('/addLikeInsert', function(req, res, next) {
  let { id , userId } = req.body
  let sql ='insert into user_like(music_id,user_id) values(?,?)'
  mysql(sql,[id,userId],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'添加失败(Insert)！'
      })
    }else {
      res.json({
        code:200,
        text:'添加成功(Insert)！',
        data:result
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

// 从听歌列表清除
router.post('/removeListen', function(req, res, next) {
  let { id,userId } = req.body
  let sql =' UPDATE user_listen_list SET status=1 WHERE music_id = ? AND user_id = ? '
  mysql(sql,[id,userId],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'清除失败！'
      })
    }else {
      res.json({
        code:200,
        text:'清除成功！',
        data:result
      })
    }
  })
});

// 批量从听歌列表清除
router.post('/removeListenLot', function(req, res, next) {
  let { userId } = req.body
  let sql =' UPDATE user_listen_list SET status=1 WHERE  user_id = ?'
  mysql(sql,[userId],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'批量清除失败！'
      })
    }else {
      res.json({
        code:200,
        text:'批量清除成功！',
        data:result
      })
    }
  })
});

// 批量添加听歌列表内容(播放全部喜欢歌曲)
router.post('/addListenLot', function(req, res, next) {
  let { userId , musicIdArr } = req.body
  let errT
  let resultT=0
  let num = 0
  for (let i = 0; i < musicIdArr.length; i++) {
    let sql = 'insert into user_listen_list(music_id,user_id) values(?,?)'
    mysql(sql,[musicIdArr[i],userId],(err,result)=>{
      if (err) {
        errT = err
        num=musicIdArr.length
      }
      else{
        resultT++
      }
      num =resultT
      if (num===musicIdArr.length){
        if (errT){
          res.json({
            code:500,
            text:'批量添加失败！',
            data:resultT
          })
        }else {
          res.json({
            code:200,
            text:'批量添加成功！',
            data:resultT
          })
        }
      }
    })
  }

});



module.exports = router;
