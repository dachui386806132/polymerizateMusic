<template>
  <div class="my-create-itemT-container">
    <div>
      <img :src=" list_img" alt="" class="song-list-img">
      <span class="song-list-name"  @click="openMsg">{{ list_name }}</span>
      <div class="operate_box">
        <i class="iconfont" @click="openListen">&#xea6d;</i>
      </div>
    </div>
    <div>{{ songNum }}</div>
    <div>
      <span class="listenNum">{{ listen_num }}</span>
      <i class="iconfont remove_list" v-if="type!==1" @click="sureRemove=true">&#xe74b;</i>
    </div>

    <el-dialog title="聚合物音乐提示" :visible.sync="sureRemove" width="30%" >
      <div>
        确定要删除《{{ list_name }}》吗？
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sureRemove = false">取 消</el-button>
      <el-button type="primary" @click="remove">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import {getLikeNum, getListNum, removeList, searchListSong} from "@/api/songListApi";
import {mapMutations} from "vuex";

export default {
  props:{
    id:{
      type:Number,
      default:0
    },
    list_img:{
      type:String,
      default:''
    },
    list_name:{
      type:String,
      default:''
    },
    listen_num:{
      type:Number,
      default:0
    },
    type:{
      type:Number,
      default:0
    }
  },
  name:'CreateItemT',
  data(){
    return{
      songNum:0,
      sureRemove:false
    }
  },
  methods:{
    // 获取歌单歌曲数量
   async getNum(){
     if (this.type===0){
       let {data:res} = await getListNum(this.id)
       if (res.data[0].num>0){
         this.songNum = res.data[0].num
       }
     }else if(this.type===1){
       let {data:res} = await getLikeNum(this.$store.state.user.id)
       if (res.data[0].num>0){
         this.songNum = res.data[0].num
       }
     }
    },
   async remove(){
    let {data:res} = await removeList(this.id)
     if (res.code>=200&&res.code<300){
       this.$emit('removeList',this.id)
     }
    },
    ...mapMutations(['playAll']),
    openMsg(){
      window.open('http://localhost:8080/home/listmsg?id='+this.id,'_blank')
    },
    async openListen(){
      let {data:res} = await searchListSong(this.id)
      let idArr = []
      for (let i = 0; i < res.data.length; i++) {
        console.log(res.data[i].music_id)
        idArr.push({id: res.data[i].music_id})
      }
      await this.playAll(idArr)
    }
  },
  created() {
    this.getNum()
  }
}
</script>

<style lang="less" scoped>
.my-create-itemT-container{
  height:70px;
  width: 100%;
  line-height: 70px;
  padding: 0 20px;
  display: flex;
  font-size: 14px;
  text-align: left;
  &:hover .operate_box{
    display: block;
  }
  &:hover .listenNum{
    display: none;
  }
  &:hover .remove_list{
    display: block;
  }
  &>div{
    &:nth-child(1){
      position: relative;
      width: 46%;
      display: flex;
      &>.song-list-img{
        width: 50px;
        height: 50px;
        margin-right: 10px;
        vertical-align:middle;
        cursor: pointer;
        margin-top: 10px;
      }
      &>.song-list-name{
        cursor: pointer;
        &:hover{
          color: #31C27C;
        }
      }
    }&:nth-child(2){
       width: 46%;
     }&:nth-child(3){
        display: flex;
        width: 8%;
      }
  }
}
.hoverGreen{
  &:hover{
    color: #31c27c;
    cursor: pointer;
  }
}
.ifont{
  user-select: none;
  color: #A2A2A2;
  border: 1.5px solid  #A2A2A2;
  width: 30px;
  height:30px;
  line-height: 30px;
  text-align: center;
  border-radius: 100%;
  margin-right: 12px;
  &:hover{
    .hoverGreen();
    border:  1.5px solid   #31c27c;
  }
}
.operate_box{
  position: absolute;
  right: 10px;
  top: 2px;
  z-index: 999;
  display: none;
  i{
    display: inline-block;
    .ifont();
  }
}
.remove_list{
  display: none;
  margin-top: 8px;
  .ifont();
}
/deep/ .el-button--primary:focus, .el-button--primary:hover{
  background: #3dd088;
  border-color:#3dd088;
}
/deep/ .el-button--primary{
  background: #31c27c;
  border-color: #31c27c;
}
/deep/ .el-button:focus, .el-button:hover{
  color: black;
  border-color: #D0D0D0;
  background-color: #EDEDED;
}
/deep/ .el-button--primary:hover{
  background: #51d396;
  border-color:#3dd088;
  color: white;
}
/deep/ .el-dialog__body{
  padding: 0 20px;
}
/deep/ .el-dialog__header{
  padding: 0 20px;
}
/deep/ .el-dialog__footer{
  padding: 0 20px;
}
</style>
