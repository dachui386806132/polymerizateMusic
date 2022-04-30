<template>
  <div class="songs-container">
    <el-button :plain="true" style="display: none"></el-button>
    <div class="songlist_toolbar">
      <div @click="changeShouCang">
        <i class="iconfont" v-if="!isShouCang">&#xe603;</i>
        <i class="iconfont red" v-else>&#xe895;</i>收藏
      </div>
      <div><i class="iconfont">&#xe64b;</i>添加到</div>
      <div @click="downloadMultiple"><i class="iconfont">&#xe61a;</i>下载</div>
      <div @click="removeMultiple"><i class="iconfont">&#xe74b;</i>删除</div>
      <div @click="cleanListD = true"><i class="iconfont">&#xe946;</i>清空列表</div>
    </div>
    <div class="songlist_main">
      <div class="songlist_main_title">
        <div>
          <el-checkbox v-model="checkedAll"></el-checkbox></div>
        <div>歌曲</div>
        <div>歌手</div>
        <div>时长</div>
      </div>
      <div class="songlist_main_msg">
        <ul class="songs-item-container" >
          <SongsItem v-if="songsList" v-for="(item,index) in songsList" :key="item.id"
                     :index="index+1"
                     :id="item.id"
                     :name="item.name"
                     :authorId="item.ar[0].id"
                     :authorName="item.ar[0].name"
                     :time="item.dt"
                     :albumId="item.al.id"
                     :albumName="item.al.name"
                     :albumUrl="item.al.picUrl"
                     :checkedAll="checkedAll"
          >
          </SongsItem>
        </ul>
      </div>
    </div>

    <el-dialog
        title="聚合物音乐"
        :visible.sync="cleanListD"
        width="30%">
      <span>确定要清空列表？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="cleanListD = false">取 消</el-button>
    <el-button type="primary" @click="cleanList">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
import SongsItem from "@/components/Play/SongsItem";
import {mapGetters, mapMutations} from "vuex"
import {
  getIsListenLike, removeListen,
  removeListenLot,
  setAddLikeInsert,
  setAddLikeUpdate,
  setRemoveLike
} from "@/api/listenSongsApi";
import {userListenListApi} from "@/api/usersApi";
import {getMusicMessageApi, getMusicMsgApi, getMusicUrlApi} from "@/api/musicAPI";
export default {
  name:'Songs',
  data(){
    return{
      checkedAll:false,
      userMsg:this.showUserMsg,
      songsList:[],
      isShouCang:false,
      isCheckedList:[],
      cleanListD: false
    }
  },
  components:{
    SongsItem
  },
  methods:{
    ...mapMutations(['setCheckedList',
                    'changeCheckedListLike',
                    'cleanSongsAllMsg',
                    'setSongList',
                    'removeCheckedList',
                    'changPlayIndex',
                    'downloadSongs',
                    'changeIsLikeSongs'
    ]),
    // 更改用户的收藏/喜欢歌曲状态
   async changeShouCang(){
      if (this.isCheckedList.length===0){
        this.scNotNull('至少选择一首歌曲才能进行操作！')
      }else {
        this.isShouCang=!this.isShouCang
        if (this.isShouCang){
          for (let i = 0; i < this.isCheckedList.length; i++) {
            let id = this.isCheckedList[i]
            let userId = this.$store.state.user.id
            let res = await this.getIsLike(id)
            if (res.data[0]===undefined){//  如果没有此数据，就添加
              await setAddLikeInsert(id,userId)
              this.changeCheckedListLike({id:id, like:true})
            }
            // 取消喜欢到了当前正在播放的歌曲
            if (this.isCheckedList[i]===this.$store.state.songMsg.id){
              this.changeIsLikeSongs(true)
            }
          }
        }else {
          // 创建变量装入所有歌曲的状态信息
          let cList = this.$store.state.checkedList
          for (let i = 0; i < this.isCheckedList.length; i++) {
            // 调用removeLike函数,从数据库取消喜欢该歌曲
           await this.removeLike(this.isCheckedList[i])
            // 取消喜欢到了当前正在播放的歌曲
            if (this.isCheckedList[i]===this.$store.state.songMsg.id){
              this.changeIsLikeSongs(false)
            }
            cList.some((item,index)=>{
              if (item.id === this.isCheckedList[i]){
                cList[index].like = false
                return true
              }
            })
          }
          this.setCheckedList(cList)
        }
      }

    },
    // 从数据库取消喜欢该歌曲
    async removeLike(i){
      await setRemoveLike(i,this.$store.state.user.id)
    },
    // 获取用户是否喜欢该歌曲
    async getIsLike(id){
     let {data:res} = await getIsListenLike(id,this.$store.state.user.id)
      // 返回查询的状态值
      return await res
    },
    // 收藏不能为空的警告
    scNotNull(msg){
      this.$message({
        message: msg,
        duration:'1500'
      });
    },
    // 清空听歌列表
    async cleanList(){
      this.cleanListD = false
      await removeListenLot(this.$store.state.user.id)
      this.cleanSongsAllMsg()
    },
    // 批量删除听歌列表数据
    async removeMultiple(){
      let ifOne = false
      for (let i = 0; i < this.isCheckedList.length; i++) {
        await removeListen( this.isCheckedList[i], this.$store.state.user.id)
        this.removeCheckedList(this.isCheckedList[i])
        if (this.isCheckedList[i] === this.$store.state.songMsg.id){
          if (this.$store.state.playIndex!==1){
            // 如果删除的是正在播放的音乐,就自动播放第一首歌
            this.changPlayIndex(1)
          }else {
            // 判断是否删除了第一个
            ifOne = true
          }
        }
      }
      // 重新发起请求刷新页面
      let {data:res} = await userListenListApi(this.$store.state.user.id)
      let arr = []
      res.data.forEach(item=> arr.push(item.music_id))
      let {data} =  await getMusicMessageApi(arr)
      this.setSongList(data.songs)

         if (ifOne){
           this.changPlayIndex(0)
           setTimeout(()=>{
             this.changPlayIndex(1)
           },0)

         }
    },
    async downloadMultiple(){
      if (this.isCheckedList.length===0){
        this.scNotNull('至少选择一首歌曲才能进行下载！')
      }else {
        this.downloadNews()
        for (let i = 0; i < this.isCheckedList.length; i++) {
          let {data:urlRes} =await getMusicUrlApi(this.isCheckedList[i])
          let {data:msgRes} =await getMusicMsgApi(this.isCheckedList[i])
          this.downloadSongs({
            url:urlRes.data[0].url,
            name:msgRes.songs[0].name,
            author:msgRes.songs[0].ar[0].name
          })
        }

      }
    },
    downloadNews() {
      this.$notify({
        title: '聚合物音乐提示',
        message: '正在下载音乐,请稍后...'
      });
    },
  },
  computed:{
    ...mapGetters[('showUserMsg')],
    // 获取歌曲列表
    getSongList(){
      return this.$store.state.songList
    },
    // 获取选中的所有歌曲id
    showCheckedId(){
      return this.$store.state.checkedList
    }
  },
  watch:{
    // 操作 获取歌曲列表
    getSongList:{
      handler(newVal){
          this.songsList = newVal
      }
    },
    // 操作 获取选中的所有歌曲id
    showCheckedId:{
      immediate:true,
      deep:true,
      handler(checkedList){
        let arr=[]
        for (let i = 0; i < checkedList.length; i++) {
          if (checkedList[i].status){
            arr.push(checkedList[i].id)
          }
        }
        let choiceList = checkedList.filter(item=> item.status === true)
        if (choiceList.length!==0){
          this.isShouCang = choiceList.every(item=> item.like === true)
        }else{
          this.isShouCang = false
        }
        this.isCheckedList = arr
      }
    },
  },
}
</script>

<style lang="less" scoped>
.red{
  color:#F06868;
}
.songs-container{
  user-select: none;
  width:850px;
  height: 100%;
  //background-color: skyblue;
  .songlist_toolbar{
    width: 100%;
    display: flex;
    margin-bottom: 15px;
    &>div{
      width: 122px;
      text-align: center;
      height: 35px;
      line-height: 35px;
      margin-right: 5px;
      border: 1px solid hsla(0, 0%, 100%, 0.22);
      cursor: pointer;
      opacity: .8;
      color: #fff;
      border-radius: 3px;
      &:hover{
        background-color: transparent;
        border-color: white;
        opacity: 1;
      }
      &>i{
        display: inline-block;
        width: 17px;
        font-size: 17px;
        margin-right: 3px;
      }
    }
  }
  .songlist_main{
    width: 100%;
    overflow-x:hidden;
    overflow-y:auto;
    height: 480px;
    &::-webkit-scrollbar{
      width: 7px;
      height: 7px;
    }
    &::-webkit-scrollbar-thumb{
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.2);
    }
    &::-webkit-scrollbar-track{
      border-radius: 5px;
      background-color: rgba(248, 248, 248, 0);
    }
    .songlist_main_title{
      width: 850px;
      height: 50px;
      display: flex;
      position: relative;
      line-height: 50px;
      &>div{
        &:nth-child(1){
            width: 60px;
        } &:nth-child(2){
            width: 460px;
        } &:nth-child(3){
            width: 240px;
        } &:nth-child(4){
            width: 90px;
        }
      }
    }
  }
}
.songlist_main_msg{
.songs-item-container{
  margin: 0;
  padding: 0;
}
}
/deep/.songlist_main{
  color: hsla(0,0%,88.2%,.8);
}
/deep/.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background-color: rgba(255, 255, 255, 0);
  border: 1px solid hsla(0,0%,88.2%,.8);
  &:hover{
    border-color: white;
  }
}
/deep/ .el-checkbox__inner{
  width: 17px;
  height: 17px;
  background-color: rgba(255, 255, 255, 0);
  &:hover{
    border-color: white;
  }
}
/deep/ .el-checkbox__input{
  line-height: 17px;
}
/deep/ .el-checkbox__inner::after{
  height: 8px;
  width: 4px;
  left: 5px;
  top: 2px;
  transition: border-color 0s,background-color 0s;
}
/deep/.el-checkbox__input.is-focus .el-checkbox__inner{
  border-color: hsla(0,0%,88.2%,.8);
  &:hover{
    border-color: white;
    color: white;
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
