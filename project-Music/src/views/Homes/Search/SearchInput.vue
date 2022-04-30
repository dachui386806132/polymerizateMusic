<template>
  <div class="search-input-container"  ref="inputBox">

    <div class="hidden_search_box" ref="hiddenBox">
      <div class="hidden_search_input">
        <input type="text"
               class="hidden_input"
               @keydown.enter="search"
               placeholder="搜索音乐、MV、歌单、用户"
               v-model="inputWords">
        <div class="hidden_input_icon_box" ref="hiddenIcon">
          <i class="iconfont hidden_input_icon"  @click="search" >&#xe621;</i>
        </div>

      </div>
    </div>

    <div class="main_box">

      <div class="input_box">
        <input type="text" class="search_input"
               placeholder="搜索音乐、专辑、歌单、用户"
               v-model="inputWords"
               @keydown.enter="search"
               @focus="clickInput"
               @blur="blurInput"
               ref="searchInput"
        >
        <i class="iconfont search_icon" @click="search" ref="searchIcon">&#xe621;</i>
      </div>

      <div class="fast_box" v-if="isOperate">
        <div v-if="isSHowHistory">
          <div v-if="historySearch===null&&!isWrite" class="not_find">暂无历史记录</div>
          <div class="history_box" v-if="historySearch">
            <div class="fast_title">
              <span>历史搜索</span><span><i class="iconfont" @click="cleanHistory">&#xe74b;</i></span>
            </div>
            <div class="history_list">
              <div class="history_item" v-for="item in historySearch" :key="item.id">
                <span class="history_item_name" @click="choiceHistoryItem(item.words,$event)">{{ item.words }}</span>
                <i class="iconfont deleteHistoryItem"  @click="deleteHistoryItem(item.id,$event)">&#xe66e;</i>
              </div>
            </div>
          </div>
        </div>

        <div class="get_box" v-if="isWrite">
          <div v-loading="loading" v-if="loading" class="loading_box">

          </div>
          <div class="get_box_son"  v-if="!loading&&searchList">
            <div class="get_left">
              <div v-if="searchList.songs" class="get_left_first"><i class="iconfont titleIcon">&#xe62e;</i>单曲</div>
              <div v-if="searchList.artists"><i class="iconfont titleIcon">&#xe601;</i>歌手</div>
              <div v-if="searchList.albums"><i class="iconfont titleIcon">&#xe64c;</i>专辑</div>
              <div v-if="searchList.mv"><i class="iconfont titleIcon">&#xe62c;</i>MV</div>
              <div v-if="searchList.playlists"><i class="iconfont titleIcon">&#xe620;</i>歌单</div>
            </div>
            <div class="get_right" >

              <div v-if="searchList.songs"  class="get_right_first">
                <div class="search_item_li" v-for="item in searchList.songs" :key="item.id" @click="openSong(item.id)">
                  <span class="song_name" v-html="$options.filters.gaoLiang({text:item.name,input:inputWords})"></span> -
                  <span class="aut_name" v-html="$options.filters.gaoLiang({text:item.ar[0].name,input:inputWords})"></span>
                </div>
              </div>

              <div v-if="searchList.artists">
                <div class="search_item_li" v-for="item in searchList.artists" :key="item.id"  @click="openSinger(item.id)">
                  <span v-html="$options.filters.gaoLiang({text:item.name,input:inputWords})"></span>
                </div>
              </div>

              <div v-if="searchList.albums">
                <div class="search_item_li" v-for="item in searchList.albums" :key="item.id" @click="openAlbum(item.id)">
                  <span class="song_name" v-html="$options.filters.gaoLiang({text:item.name,input:inputWords})"></span> -
                  <span class="aut_name" v-html="$options.filters.gaoLiang({text:item.artist.name,input:inputWords})"></span>
                </div>
              </div>

              <div v-if="searchList.mv">
                <div class="search_item_li" v-for="item in searchList.mv" :key="item.id" @click="openMv(item.id)">
                  <span class="song_name" v-html="$options.filters.gaoLiang({text:item.name,input:inputWords})"></span> -
                  <span class="aut_name" v-html="$options.filters.gaoLiang({text:item.artistName,input:inputWords})"></span>
                </div>
              </div>

              <div v-if="searchList.playlists">
                <div class="search_item_li" v-for="item in searchList.playlists" :key="item.id" @click="openMusicList(item.id)">
                  <span v-html="$options.filters.gaoLiang({text:item.name,input:inputWords})"></span>
                </div>

              </div>
            </div>
          </div>
          <div class="not_findSearch" v-if="!loading&&searchList===null">
            没有找到相关内容
          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<script>


import {getSearch, getSuggest} from "@/api/searchApi";
import {mapMutations} from "vuex";

export default {
  name:'Search',
  data(){
    return{
      // 搜索框内容
      inputWords:'',
      // 历史搜索内容
      historySearch:null,
      // 是否在输入
      isWrite:false,
      // 是否在操作搜索框
      isOperate:false,
      // 搜索出来的内容
      searchList:null,
      // 加载
      loading:false,
      // 历史框是否展示
      isSHowHistory:false,
      // 是否点击历史搜索
      isClickHistory:false
    }
  },
  created() {
    this.getHistorySearch()
  },
  mounted() {
    this.setInput()
  },
  methods:{
    ...mapMutations(['getSearch',
      'getSearchType',
      'openSong',
      'openSinger',
      'openAlbum',
      'openMusicList',
      'openMv',
    ]),
    // 点击搜索按钮
    search(){
      if (this.inputWords.trim()!==''){
        this.setHistorySearch()
        this.getSearch(this.inputWords)
        this.$refs.searchInput.blur()
      }
    },
    // 点击了搜索框
    clickInput(){
      this.isOperate=true
    },
    // 失去搜索框焦点
    blurInput(){
      setTimeout(()=>{
        this.isOperate=false
      },100)
    },
    // 存入历史记录
    setHistorySearch(){
      if (this.inputWords){
        let oldSearch = JSON.parse(localStorage.getItem('historySearch'))
        if (oldSearch===null){
          localStorage.setItem('historySearch','[]')
          oldSearch = []
        }
        let id = 0
        if (oldSearch.length!==0){
          id = oldSearch[oldSearch.length-1].id+1
          if (oldSearch[oldSearch.length-1].words !== this.inputWords){
            let str = JSON.stringify({words:this.inputWords,id:id});
            oldSearch.push(JSON.parse(str))
            this.historySearch = [...oldSearch].reverse()
            let newSearch = JSON.stringify(oldSearch)
            localStorage.setItem('historySearch',newSearch)
          }
        }else {
          let str = JSON.stringify({words:this.inputWords,id:id});
          oldSearch.push(JSON.parse(str))
          this.historySearch = [...oldSearch].reverse()
          let newSearch = JSON.stringify(oldSearch)
          localStorage.setItem('historySearch',newSearch)
        }

      }
    },
    // 获取历史记录
    getHistorySearch(){
      let str = localStorage.getItem('historySearch')
      if (str){
        this.historySearch =[...JSON.parse(str)].reverse()
      }else {
        this.historySearch = null
      }

    },
    // 清空历史
    cleanHistory(){
      localStorage.removeItem('historySearch')
      this.getHistorySearch()
    },
    // 删除单条历史记录
    deleteHistoryItem(id,e){
      e.stopPropagation()
      let oldSearch = JSON.parse(localStorage.getItem('historySearch'))
      let arr = oldSearch.filter(item=>item.id!==id)
      localStorage.setItem('historySearch',JSON.stringify(arr))
      if (arr.length===0)this.cleanHistory()
      this.getHistorySearch()
    },
    // 点击选择历史记录
    choiceHistoryItem(str,e){
      this.isClickHistory = true
      this.inputWords = str
      this.search()
      this.$nextTick(()=>{
        this.isClickHistory = false
      })
    },
    // 搜索建议
    async suggest(){
      this.loading = true
      let {data:res1} = await getSearch(this.inputWords,1,4)
      let {data:res2} = await getSearch(this.inputWords,100,2)
      let {data:res3} = await getSearch(this.inputWords,10,2)
      let {data:res4} = await getSearch(this.inputWords,1004,2)
      let {data:res5} = await getSearch(this.inputWords,1000,2)
      if (this.isWrite){
        try {
          this.searchList ={
            songs:res1.result.songs,
            artists:res2.result.artists,
            albums:res3.result.albums,
            mv:res4.result.mvs,
            playlists:res5.result.playlists
          }
          if (!this.searchList.songs&&!this.searchList.artists&&!this.searchList.albums&&!this.searchList.mv&&!this.searchList.playlists){
            this.searchList = null
          }
        }catch (err){
          this.searchList = null
        }
      }
      this.loading = false
      this.$nextTick(()=>{
        this.setHoverW()
      })
    },
    // hover变白
    setHoverW(){
      let li = document.querySelectorAll('.search_item_li')
      for (let i = 0; i < li.length; i++) {
        li[i].addEventListener('mouseover',()=>{
          let green = li[i].querySelectorAll('.green_g_l')
          for (let i = 0; i < green.length; i++) {
            green[i].style.color = 'white'
          }
        })
        li[i].addEventListener('mouseout',()=>{
          let green = li[i].querySelectorAll('.green_g_l')
          for (let i = 0; i < green.length; i++) {
            green[i].style.color = '#31C27C'
          }
        })
      }
    },
    // 给input框设置事件
    setInput(){
      this.$nextTick(()=>{
        window.addEventListener('scroll',()=>{
          let sTop = document.documentElement.scrollTop||document.body.scrollTop
          if (sTop>155){
            this.$refs.inputBox.style.width = 1000 + 'px'
            this.$refs.searchIcon.style.right = -370 + 'px'
            this.$refs.hiddenBox.style.display = 'block'
            this.$refs.hiddenIcon.style.animation = 'searchIconGo .5s ease forwards'
          }else {
            this.$refs.inputBox.style.width = 685 + 'px'
            this.$refs.searchIcon.style.right = -55 + 'px'
            this.$refs.hiddenBox.style.display = 'none'
            this.$refs.hiddenIcon.style.right = 315 + 'px'
            this.$refs.hiddenIcon.style.animation = 'searchIconBack .5s ease forwards'
          }

        })
      })

    }
  },
  computed:{
    getMySearch(){
      return this.$store.state.mySearch
    }
  },
  watch:{
    // 监听输入的内容
    inputWords:{
      immediate:true,
      handler(newVal){
        if (!this.isClickHistory){
          setTimeout(()=>{
            if(newVal.trim()!==''){
              this.suggest()
              this.isWrite=true
              setTimeout(()=>{
                this.isSHowHistory =false
              },100)
            }else {
              this.isWrite=false
              setTimeout(()=>{
                this.isSHowHistory =true
              },100)
            }
          },100)
        }
      }
    },
    // 监听vuex里的搜索内容
    getMySearch:{
      handler(newVal){
        this.inputWords = newVal
      }
    }
  }

}
</script>

<style lang="less">
.search-input-container{
  font-size: 14px;
  width: 685px;
  margin-top:0;
  margin-left: 420px;
  border: 0;
  left: 50%;
  top: 85px;
  background: #fff;
  border-radius: 3px;
  transition: all .5s ease;
  .main_box{
    height: 50px;
    width: 600px;
    padding: 0 70px 0 15px;
    position: relative;
  }
  .input_box{
    width: 100%;
    height: 100%;
    position: relative;
    .search_input{
      line-height: 50px;
      width: 100%;
      border: 0;
      font-size: 14px;
      background: transparent;
      transition: width .6s ease-out,visibility .6s ease-out 1ms;
      outline: none;
      height: 100%;
    }
    .search_icon{
      line-height: 50px;
      font-size: 30px;
      position: absolute;
      right: -55px;
      color: black;
      cursor: pointer;
      transition: all .5s ease;
      &:hover{
        color: #3dd088;
      }
    }
  }
  .fast_box{
    position: absolute;
    width: 683px;
    top: 50px;
    left: 0;
    z-index: 50;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    border: 1px solid #C9C9C9;
    background-color: white;
    color: black;
    .not_find{
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
    .fast_title{
      display: flex;
      justify-content: space-between;
      padding: 5px 10px;
      &>span:nth-child(1){
        color: #999
      }
      &>span:nth-child(2){
        cursor: pointer;
        color: #999
      }
    }
  }
  .history_item{
    color: black;
    height: 35px;
    line-height: 35px;
    padding: 0 10px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    .history_item_name{
      display: inline-block;
      width: 95%;
    }
    &:hover{
      background-color: #31C27C;
      color: white;
    }
    .deleteHistoryItem{
      line-height: 35px;
      text-align: center;
      width: 30px;
      height: 35px;
      color: white;
      display: inline-block;
    }
  }
}


.get_box{
  .get_box_son{

    overflow: auto;
    display: flex;

    .get_left{
      width: 100px;
      text-align: center;
      color: #999999;

      >.get_left_first{
        height: 140px;
        padding-top: 15px;
        border-right: 1px solid #D4D4D4;
      }
      >div:not(.get_left_first){
        padding-top: 15px;
        height: 67px;
        border-right: 1px solid #D4D4D4;
      }
      div{
        i{
          margin-right: 6px;
        }
      }
    }
    .get_right{
      width: 585px;
      >.get_right_first{
        height: 145px;
        padding-top: 10px;
      }
      >div:not(.get_right_first){
        padding-top: 10px;
        height: 72px;
      }
      >div{
        border-bottom: 1px solid #F2F2F2;
      }
    }
  }

}

.get_box::-webkit-scrollbar{
  width: 5px;
  height: 5px;
}
.get_box::-webkit-scrollbar-thumb{
  border-radius: 5px;
  background-color: #CCCCCC;
}
.get_box::-webkit-scrollbar-track{
  border-radius: 0;
  background-color: #F8F8F8;
}
.search_item_li{
  list-style: none;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  height: 32px;
  line-height: 32px;
  cursor: pointer;
  display: block;
  padding: 0 20px 0 32px;
  z-index: 999;
  &:hover{
    color: white!important;
    background-color: #31C27C;
    &>.aut_name{
      color: white;
    }
  }
}
.aut_name{
  color: #999999;
}
.not_findSearch{
  height:300px!important;
  width:685px!important;
  text-align: center;
  line-height: 300px;
  font-size: 20px;
}
.loading_box{
  height:300px!important;
  width:685px!important;
}
.hidden_search_box{
  display: none;
  top: 0;
  left: 0;
  width: 100%;
  position: fixed;
  height: 68px;
  background-color: #fff;
  border-bottom: 1px solid #dddbdb;
  box-shadow: 5px 6px 57px -17px rgba(0,0,0,0.49);
  -webkit-box-shadow: 5px 6px 57px -17px rgba(0,0,0,0.49);
  -moz-box-shadow: 5px 6px 57px -17px rgba(0,0,0,0.49);
  z-index: 999;
  .hidden_search_input{
    height: 100%;
    width: 1130px;
    margin: auto;
    position: relative;
    .hidden_input{
      width: 94%;
      height: 67px;
      line-height: 66px;
      font-size: 19px;
      border: none;
      outline: none;
      margin: 0;
      padding: 0;
    }
    .hidden_input_icon_box{
      width: 6%;
      height: 100%;
      display: inline-block;
      background-color: #31C27C;
      line-height: 68px;
      color: white;
      text-align: center;
      cursor: pointer;
      position: absolute;
      right: 0px;
      &:hover{
        background-color: #2CAF6F;
      }
      i{
        font-size: 30px!important;
      }
    }

  }
}
@keyframes searchIconGo{
  0%{
    right:300px;
  }
  100%{
    right:0;
  }
}
@keyframes searchIconBack{
  0%{
    right:0;
  }
  100%{
    right:300px;
  }
}
</style>
