var express = require('express');
var router = express.Router();
var fs = require('fs');
const mysql =require( '../model/mysql.js')
const Token = require('../model/Token')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a user');
});

// 进入页面解密token
router.get('/isLogin', function(req, res, next) {
  let { TokenKey }  = req.query
  let n=TokenKey.split(" ")[1]
  let data = Token.de(n)
  let sql ='SELECT id,username,user_str,user_img FROM user_info WHERE username = ?'
  mysql(sql,[data.tokenKey],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'操作失败！'
      })
    }else {
      res.json({
        code:200,
        text:'操作成功!',
        data:result
      })
    }
  })
});

// 搜索所有用户
router.post('/userLogin', function(req, res, next) {
  let {username,password}  = req.body
  let sql ='SELECT * FROM user_info WHERE username = ? and password = ? '
  let tokenKey = Token.en(username)
  mysql(sql,[username,password],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'操作失败'
      })
    }else {
      if (result.length===1){
        res.json({
          code:200,
          data:result,
          tokenKey
        })
      }else {
        res.json({
          code:500,
          text:'用户名或密码错误'
        })
      }

    }
  })
});

// 判断账号是否被注册
router.get('/searchUser', function(req, res, next) {
  let {username}  = req.query
  let sql ='SELECT * FROM user_info WHERE username = ?'
  mysql(sql,[username],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'操作失败！'
      })
    }else {
      res.json({
        code:200,
        text:'操作成功!',
        data:result
      })
    }
  })
});

// 注册账号
router.post('/login', function(req, res, next) {
  let { username , password } = req.body
  let sql ='insert into user_info(username,password,user_str,user_img) values(?,?,?,?)'
  mysql(sql,[username,password,username,'/images/head.png'],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'注册失败！'
      })
    }else {
      res.json({
        code:200,
        text:'注册成功！',
        result
      })
    }
  })
});

// 更改用户名信息
router.post('/changeUsername', function(req, res, next) {
  let { username , userId } = req.body
  let sql ='update user_info set username = ? where id = ? '
  mysql(sql,[username,userId],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'修改用户名失败！'
      })
    }else {
      res.json({
        code:200,
        text:'修改用户名成功！',
        result
      })
    }
  })
});

// 更改网名
router.post('/changeStr', function(req, res, next) {
  let { str , userId } = req.body
  let sql ='update user_info set user_str = ? where id = ? '
  mysql(sql,[str,userId],(err,result)=>{
    if (err){
      res.json({
        code:500,
        text:'修改网名失败！'
      })
    }else {
      res.json({
        code:200,
        text:'修改网名成功！',
        result
      })
    }
  })
});

// 更改头像
router.post('/changeHead', function(req, res, next) {
  let { base64,userId } = req.body
  let now = Date.now()
  var path = 'public/images/jhw_'+now+'.png';//从app.js级开始找--在我的项目工程里是这样的
  var base = base64.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
  var dataBuffer = new Buffer(base, 'base64'); //把base64码转成buffer对象，
  console.log('dataBuffer是否是Buffer对象：'+Buffer.isBuffer(dataBuffer));
  console.log(path)
  fs.writeFile(path,dataBuffer,function(err){//用fs写入文件
    if(err){
      console.log(err);
    }else{
      console.log('写入成功！');
      let sql ='update user_info set user_img = ? where id = ? '
      mysql(sql,[`images/jhw_${now}.png`,userId],(err,result)=>{
        if (err){
          res.json({
            code:500,
            text:'修改头像失败！'
          })
        }else {
          res.json({
            code:200,
            text:'修改头像成功！',
            result
          })
        }
      })
    }
  })

});


module.exports = router;
