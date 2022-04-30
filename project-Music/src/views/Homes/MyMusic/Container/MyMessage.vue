<template>
  <div class="my-message-container" v-if="myMsg">
    <img :src="isChangeHead ? newHead : $imgUrl+myMsgClone.img" @click="watchImg($imgUrl+myMsgClone.img)" alt="头像" title="查看头像" class="my_head">
    <div class="message_item" title="更改账号">
      账号：<span @click="nameStatus=true" v-show="!nameStatus">{{ myMsgClone.name }}</span>
      <input type="text" v-show="nameStatus" v-model="myMsgClone.name" @blur="inp1Blur" @keydown.enter="$event.target.blur()" ref="inp1"></input>
    </div>
    <div class="message_item" title="更改用户名">
      用户名：<span @click="strStatus=true" v-show="!strStatus">{{ myMsgClone.str }}</span>
      <input type="text" v-show="strStatus" v-model="myMsgClone.str"  @blur="inp2Blur" @keydown.enter="$event.target.blur()"  ref="inp2"></input>
    </div>
    <div class="handlerMy">
      <div :class=" isChangeMsg ? 'change changeyes' : 'change changeno'" @click="safeMessage">保存个人信息</div>
      <div class="close changeno" v-if="isChangeMsg" @click="closeChange">取消</div>
    </div>


    <transition name="img">
      <div class="big_img" v-if="isWatchImg"  @click="hideenWatch" ref="bigImgBox">
        <img :src="isChangeHead ? newHead : $imgUrl+myMsgClone.img" alt="头像" title="更改图片" ref="bigImg"  @click="changeImg">
        <input type="file"  name="avatar" accept=".jpg, .jpeg, .png" style="display:none" ref="choiceFile" @change="getFile">
      </div>
    </transition>

  </div>
</template>

<script>
import {changeHead, changeStr, changeUsername, getIsUserApi, getMyMessage} from "@/api/usersApi";

export default {
  name:'MyMessage',
  data(){
    return{
      myMsg:null,
      myMsgClone:null,
      isChangeMsg:false,
      nameStatus:false,
      strStatus:false,
      isWatchImg:false,
      newHead:'',
      isChangeHead:false
    }
  },
  created() {
    this.getMsg()
  },
  methods:{
    async getMsg(){
      let {data:res} =await getMyMessage(this.$store.state.user.id)
      console.log(res.result[0])
      this.myMsg = res.result[0]
      this.myMsgClone =JSON.parse(JSON.stringify( res.result[0]))
      this.newHead = JSON.parse(JSON.stringify( res.result[0])).img
    },
    inp1Blur(){
      if (/^[0-9a-zA-Z]{6,16}$/.test(this.myMsgClone.name)){
        this.nameStatus=false
      }else {
        this.waring('账号输入格式有误')
      }
    },
    inp2Blur(){
      if (this.myMsgClone.str.length>0 && this.myMsgClone.str.length<12 ){
        this.strStatus=false
      }else {
        this.waring('用户名输入格式有误')
      }
    },
    async safeMessage(){
      if (this.isChangeMsg){
        if (this.nameStatus){
          this.waring('账号输入格式有误!')
        }else if(this.strStatus){
          this.waring('用户名输入格式有误!')
        }else {
          if (this.newHead!==this.myMsg.img){
            let {data:res} = await changeHead(this.newHead,this.$store.state.user.id)
            if (res.code>=200 && res.code<300 ){
              this.myMsg.img = this.newHead
              this.myMsgClone.img = this.newHead
              this.success('修改头像成功!')
            }else {
              this.waring('服务器返回错误!')
            }
          }
          if (this.myMsgClone.name!==this.myMsg.name){
              let {data:res} = await getIsUserApi(this.myMsgClone.name)
            if (res.code>=200 && res.code<300 && res.data.length!==0){
              this.waring('此用户名已被注册!')
            }else {
              let {data:res2} = await changeUsername(this.myMsgClone.name,this.$store.state.user.id)
              if (res2.code>=200 && res2.code<300 ){
                this.success('修改账号成功!')
                this.myMsg.name = this.myMsgClone.name
                this.isChangeMsg = false
              }else {
                this.waring('服务器返回错误!')
              }
            }
          }
          if (this.myMsgClone.str!==this.myMsg.str){
              let {data:res} = await changeStr(this.myMsgClone.str,this.$store.state.user.id)
              if (res.code>=200 && res.code<300 ){
                this.success('修改用户名成功!')
                this.myMsg.str = this.myMsgClone.str
                this.isChangeMsg = false
              }else {
                this.waring('服务器返回错误!')
              }
          }


        }
      }
    },
    waring(msg) {
      this.$notify.error({
        title: '聚合物提示',
        message: msg
      });
    },
    success(msg) {
      this.$notify({
        title: '成功',
        message: msg,
        type: 'success'
      });
    },
    watchImg(url){
      this.isWatchImg=true
        if (this.isWatchImg){
          this.$nextTick(()=>{
            document.querySelector('.big_img').style.top =  document.documentElement.scrollTop +'px'
          })
        }
    },
    hideenWatch(e){
      if (e.target===this.$refs.bigImgBox){
        this.isWatchImg =false
      }
    },
    changeImg(){
      this.$refs.choiceFile.click()
    },
    getFile(e){
      let file = e.srcElement.files[0]
      const imgURL = window.URL.createObjectURL(file)
      let filess = new FileReader()
      filess.readAsDataURL(file)
      filess.onloadend=()=>{
        console.log(filess.result)
        this.newHead = filess.result
        this.isChangeHead = true
      }
    },
    closeChange(){
      this.myMsgClone =JSON.parse(JSON.stringify( this.myMsg))
      this.newHead = JSON.parse(JSON.stringify(this.myMsg)).img
      this.isChangeMsg = false
      this.isChangeHead =false
    }
  },
  watch:{
    myMsgClone:{
      deep:true,
      immediate:true,
      handler(newVal){
        if (newVal){
          if (this.newHead!==this.myMsg.img||this.myMsgClone.name!==this.myMsg.name||this.myMsgClone.str!==this.myMsg.str)
            this.isChangeMsg = true
          }else {
            this.isChangeMsg = false
          }
      }
    },
    newHead:{
      immediate:true,
      handler(newVal){
        if (newVal){
          if (this.newHead!==this.myMsg.img)
            this.isChangeMsg = true
        }else {
          this.isChangeMsg = false
        }
      }
    },
    nameStatus(newVal){
      if (newVal){
        this.$nextTick(()=>{
          this.$refs.inp1.focus()
        })
      }
    },
    strStatus(newVal){
      if (newVal){
        this.$nextTick(()=>{
          this.$refs.inp2.focus()
        })
      }
    },
    isWatchImg(newVal){
      if (newVal){
        document.querySelector('body').style.overflowY= 'hidden'
      }else {
        document.querySelector('body').style.overflowY= 'visible'
      }
    }
  }
}
</script>


<style lang="less" scoped>
.my-message-container{
  input{
    width: 200px;
    font-size: 20px;
    border: 1px solid #999999;
    height: 30px;
    outline: none;
  }
  width: 1200px;
  margin:20px auto;
  .my_head{
    display: block;
    width: 150px;
    height: 150px;
    border-radius: 100%;
    margin:0 auto 10px auto;
    cursor: pointer;
  }
  .message_item{
    font-size: 20px;
    margin:20px auto 0 auto;
    text-align: center;
    height: 30px;
    line-height: 30px;
    span{
      display: inline-block;
      text-align: center;
      cursor: pointer;
    }
  }
  .change {
    display: inline-block;
    color: white;
    border: none;
    > i {
      color: white;
      margin-right: 3px;
      font-size: 16px;
    }

    font-size: 14px;
    cursor: pointer;
    border-radius: 2px;
    margin:20px auto 0 auto;
    height: 38px;
    line-height: 38px;
    white-space: nowrap;
    box-sizing: border-box;
    overflow: hidden;
    width: 150px;
    text-align: center;
  }
  .close {
    display: inline-block;
    color: white;
    border: none;
    > i {
      color: white;
      margin-right: 3px;
      font-size: 16px;
    }

    font-size: 14px;
    cursor: pointer;
    border-radius: 2px;
    margin:20px auto 0 auto;
    height: 38px;
    line-height: 38px;
    white-space: nowrap;
    box-sizing: border-box;
    overflow: hidden;
    width: 150px;
    text-align: center;
  }
}
.changeyes{
  background-color: #3dd088;
  &:hover {
    background-color: #31C27C;
  }
}
.changeno{
  background-color: #afafaf;
  &:hover {
    background-color: #999999;
  }

}
.big_img{
  width: 100%;
  height: 1340px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  img{
    display: block;
    height: 500px;
    margin:100px auto;
    cursor: pointer;
    border-radius: 5px;
  }
}
.img-enter,
.img-leave-to{
  opacity: 0;
}
.img-enter-active,
.img-leave-active{
  transition: all .5s ease;
}
#avatar{
  position: absolute;
  left: 910px;
  top: 562px;
  color: white;
  font-size: 25px;
  cursor: pointer;
}
.handlerMy{
  width: 400px;
  margin: auto;
  display: flex;
  justify-content: center;
}
</style>