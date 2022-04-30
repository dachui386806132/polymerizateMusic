<template>
  <li class="createItem_item_li" ref="item_li">
    <div class="createItem_item">
      <div>
          <span class="number" ref="itemI">
            {{ index +1 }}
          </span>
      </div>
      <div>
          <span class="songName"  @click="openSong(id)">
            {{ name }}
          </span>
        <Append :songId="id" ref="appendBox" v-if="isOpenAppend"></Append>
        <div class="operate_box">
          <i class="iconfont" @click="play_song">&#xea6d;</i>
          <i class="iconfont" @click="isOpenAppend=true" ref="appendIcon">&#xe622;</i>
          <i class="iconfont" @click="downloadThis">&#xe61a;</i>
        </div>
      </div>
      <div>
          <span class="artist" @click="openSinger(authorId)">
            {{ authorName }}
          </span>
      </div>
      <div>
          <span class="album" @click="openAlbum(albumId)">
            {{ albumName }}
          </span>
      </div>
      <div>
        <div class="delete">
          <span class="songTime">{{ time | handlerTime }}</span>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import {searchUserListenApi} from "@/api/listenSongsApi";
import {mapMutations,mapGetters} from 'vuex'
import {getMusicUrlApi} from "@/api/musicAPI";
import {removeLikeApi} from "@/api/likeApi";
import Append from "@/components/Little/Append";

export default {
  props: {
    index:{
      type:Number,
      default:0
    },
    id:{
      type:Number,
      default:0
    },
    name:{
      type:String,
      default:''
    },
    albumName:{
      type:String,
      default:''
    },
    albumId:{
      type:Number,
      default:0
    },
    authorName:{
      type:String,
      default:''
    },
    authorId:{
      type:Number,
      default:0
    },
    time:{
      type:Number,
      default:0
    },
  },
  name:'CreateItem',
  data(){
    return{
      isChecked:true,
      isOpenAppend:false
    }
  },
  methods:{
    ...mapMutations(['changeCheckedLikeList',
      'changeCheckedLikeStatus',
      'downloadSongs',
      'removeLikeList',
      'openSong',
      'openSinger',
      'openAlbum']),
    // 隔行改变颜色
    changeListColor(){
      if(this.index%2===0){
        this.$refs.item_li.style.backgroundColor = '#F7F7F7'
      }else {
        this.$refs.item_li.style.backgroundColor = 'white'
      }
    },
    // 跳转到播放页面
    play_song(){
      window.open('http://localhost:8080/play?id='+this.id,'_blank')
    },
    // 下载当前歌曲
    async downloadThis(){
      this.$notify({
        title: '聚合物音乐提示',
        message: '正在下载音乐,请稍后...'
      });

      let {data:urlRes} =await getMusicUrlApi(this.id)
      this.downloadSongs({
        url:urlRes.data[0].url,
        name:this.name,
        author:this.authorName
      })
    },
  },
  mounted() {
    this.changeListColor()
    document.addEventListener('click',(e)=>{
      if (e.target!==this.$refs.appendIcon){
        this.isOpenAppend = false
      }
    })
  },
  computed:{
    ...mapGetters(['showChoiceLike'])
  },
  watch:{
    isOperateLot(newVal){
      if (newVal){
        this.$refs.itemI.style.left = '30px'
        this.changeCheckedLikeList({id:this.songId,status:this.isChecked})
      }else {
        this.$refs.itemI.style.left = '18px'
        this.changeCheckedLikeList(null)
        this.isChecked = true
      }
    },
    isCheckedAll:{
      immediate:true,
      handler(newVal){
        this.isChecked = newVal
      }
    },
    isChecked:{
      handler(newVal){
        this.changeCheckedLikeStatus({id:this.songId,status:newVal})
      }
    }
  },
  components:{
    Append
  }
}
</script>

<style lang="less" scoped>
.hoverGreen{
  &:hover{
    color: #31c27c;
    cursor: pointer;
  }
}
.shenglue{
  overflow: hidden;/*超出部分隐藏*/
  white-space: nowrap;/*不换行*/
  text-overflow:ellipsis;/*超出部分文字以...显示*/
}
.ifont{
  color: #A2A2A2;
  border: 1px solid  #A2A2A2;
  background-color: white;
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-radius: 100%;
  margin-right: 12px;
  &:hover{
    .hoverGreen();
    border: 1px solid   #31c27c;
  }
}
.createItem_item_li{
  position: relative;
  list-style: none;
  height: 52px;
  &:hover .operate_box{
    display: block;
  }
  .songTime{
    display: inline-block;
  }

  .operate_box{
    position: absolute;
    right: 10px;
    top: 2px;
    z-index: 998;
    display: none;
    i{
      display: inline-block;
      .ifont();
    }
  }

  .createItem_item{
    font-weight: 400;
    margin-left: 46px;
    display: flex;
    line-height: 52px;
    font-size: 14px;
    >div{

      &:nth-child(2){

        width: 48%;
        position: relative;
      }
      &:nth-child(3){
        .shenglue();
        width: 23%;
      }
      &:nth-child(4){
        .shenglue();
        width: 22%;

      }
      &:nth-child(5){
        .shenglue();
        width: 6%;
        margin-left: 1%;
        color: #999999;
      }
    }

    .number{
      position: absolute;
      left: 18px; //30px
      color: #9999B1;
    }

    .songName{
      .hoverGreen();
    }
    .artist{
      .hoverGreen();
    }
    .album{
      .hoverGreen();
    }
  }
}
.checkbox{
  position: absolute;
  top: 15px;
  left: 8px;
}

/deep/.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background-color: rgba(255, 255, 255, 0);
  border: 1px solid #3bd389;
  &:hover{
    border-color: #3bd389;
  }
}
/deep/ .el-checkbox__inner{
  width: 17px;
  height: 17px;
  background-color: rgba(255, 255, 255, 0);
  &:hover{
    border-color: #3bd389;
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
  border-color:#3bd389;
  &:hover{
    border-color: #3bd389;
    color: #3bd389;
  }
}
/deep/ .el-checkbox__inner::after{
  box-sizing: content-box;
  content: "";
  border: 1px solid  #3bd389;
  border-left: 0;
  border-top: 0;
  height: 8px;
  left: 6px;
  position: absolute;
  top: 3px;
  transform: rotate(45deg) scaleY(0);
  width: 3px;
  transform-origin: center;
  font-weight: 600;
}
</style>
