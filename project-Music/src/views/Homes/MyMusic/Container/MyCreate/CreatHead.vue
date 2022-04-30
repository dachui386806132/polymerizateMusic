<template>
  <div class="my-create-head-container">
   <div class="new_create" @click="creatNew=true">
     <i class="iconfont">&#xe6ea;</i>新建歌单
   </div>
   <div class="show_type">
     <div @click="listType=1" :class="listType===1 ? 'choice_type' : '' " title="上图下文"><i class="iconfont">&#xe6e5;</i></div>
     <div @click="listType=2" :class="listType===2 ? 'choice_type' : '' " title="列表"><i class="iconfont">&#xe6e4;</i></div>
   </div>

    <el-dialog title="创建新歌单" :visible.sync="creatNew" width="30%" >

      <div>歌单名:
        <div class="create_dialog">
          <input type="text" v-model="songListName" class="listName_input">
          <span class="song-list-name-num">{{ songListNameNum -songListName.length }}</span>
        </div>
      </div>

      <div>歌单简介:
        <div class="create_dialog">
          <textarea  v-model="about" class="listAbout_textarea"></textarea>
          <span class="song-list-name-num">{{ songListAboutNum -about.length }}</span>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="creatNew = false">取 消</el-button>
      <el-button type="primary" @click="createNewList">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {createList} from "@/api/songListApi";

export default {
  name:'CreateHead',
  data(){
    return{
      listType:1, // 展示歌单类型 1为个人喜欢歌单 0为普通用户歌单
      creatNew:false, // 创建新歌单模态框打开状态
      songListName:'', // 创建新歌单输入的值
      songListNameNum:20, // 创建新歌单输入的字符长度
      about:'',
      songListAboutNum:150, // 创建新歌单输入的字符长度
    }
  },
  methods:{
    // 创建新歌单执行方法
    async createNewList(){
      if (this.songListName.trim() !== ''){
        if (this.about.trim() === ''){
          this.about='无'
        }
        await createList(this.$store.state.user.id,this.songListName,this.about)
        this.creatNew = false
        this.songListName =''
        // 触发父元素刷新歌单页面
        this.$emit('refreshList',null)
        this.songListName = ''
        this.about = ''
      }
    },

  },
  watch:{
    listType(newVal){
      this.$emit('ListType',newVal)
    },
    songListName(newVal,oldVal){
      if (newVal.length>20){
        this.songListName = oldVal
      }
    },
    about(newVal,oldVal){
      if (newVal.length>150){
        this.about = oldVal
      }
    },
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.my-create-head-container{
  user-select: none;
  display: flex;
  justify-content: space-between;
  width: 1200px;
  margin:30px auto 0 auto;
  .new_create{
    height: 38px;
    line-height: 38px;
    text-align: center;
    border: 1px solid #c9c9c9;
    color: #000;
    border-radius: 2px;
    font-size: 14px;
    margin-right: 6px;
    padding: 0 23px;
    display: inline-block;
    white-space: nowrap;
    box-sizing: border-box;
    overflow: hidden;
    background-color: white;
    cursor: pointer;
    &:hover{
      background-color: #EDEDED;
    }
    &>i{
      font-size: 16px;
      margin-right: 3px;
      color: #A2A2A2;
    }
  }

  .show_type{
    display: flex;
    //border: 1px solid #C9C9C9;
    //border-radius: 3px;
    background-color: white;
    &>div{
      border-radius: 3px;
      cursor: pointer;
      width: 40px;
      height: 38px;
      line-height: 38px;
      text-align: center;
    }
  }
}
.choice_type{
  background-color: #31C27C;
  color: white;
}
.listName_input{
  outline: none;
  width: 100%;
  height: 30px;
  border:1px solid #E5E5E5 ;
  padding: 0 5px;
  margin-top: 3px;
}
.listAbout_textarea{
  outline: none;
  width: 100%;
  height: 80px;
  border:1px solid #E5E5E5 ;
  padding: 0 5px;
  margin-top: 3px;
}

.create_dialog{
  position: relative;
  .song-list-name-num{
    position: absolute;
    right: 2px;
    top: 10px;
  }
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
</style>
