<template>
  <div id="searchBtn-container">
    <!--    顶部导航搜索栏-->
    <div class="search_input_box">
      <input type="text" placeholder="搜索音乐、MV、歌单、用户" v-model="searchInput" @keydown.enter="mySearch(searchInput,1)" class="search_input" @focus="openFast=true" @blur="openFast=false"></input>
      <i class="iconfont searchBtn" @click="mySearch(searchInput,1)">&#xe621;</i>
    </div>

    <div class="search_input_fast" ref="fastBox">
      <div class="hot_box" v-if="!isWrite">
        <div class="hot_item" v-for="(item,index) in hotList" :key="index" @click="mySearch(item.searchWord,1)">
          <span class="hot_index">{{ index+1 }}</span>
          <span class="hot_text">{{ item.searchWord }}</span>
          <span class="hot_score">{{ item.score }}</span>
          <img :src="item.iconUrl" alt="" class="item_img">
        </div>
      </div>

      <div v-else class="fastSearch_box">
        <div class="search_item" v-if="searchList.songs">
          <div class="search_item_title"><i class="iconfont titleIcon">&#xe62e;</i>单曲</div>
          <div class="search_item_li" v-for="item in searchList.songs" :key="item.id" @click="openSong(item.id)">
            <span class="song_name" v-html="$options.filters.gaoLiang({text:item.name,input:searchInput})"></span> -
            <span class="aut_name" v-html="$options.filters.gaoLiang({text:item.ar[0].name,input:searchInput})"></span>
          </div>
        </div>

        <div class="search_item" v-if="searchList.artists">
          <div class="search_item_title"><i class="iconfont titleIcon">&#xe601;</i>歌手</div>
          <div class="search_item_li" v-for="item in searchList.artists" :key="item.id"  @click="openSinger(item.id)">
            <span v-html="$options.filters.gaoLiang({text:item.name,input:searchInput})"></span>
          </div>
        </div>

        <div class="search_item" v-if="searchList.albums">
          <div class="search_item_title"><i class="iconfont titleIcon">&#xe64c;</i>专辑</div>
          <div class="search_item_li" v-for="item in searchList.albums" :key="item.id" @click="openAlbum(item.id)">
            <span class="song_name" v-html="$options.filters.gaoLiang({text:item.name,input:searchInput})"></span> -
            <span class="aut_name" v-html="$options.filters.gaoLiang({text:item.artist.name,input:searchInput})"></span>
          </div>
        </div>

        <div class="search_item" v-if="searchList.playlists">
          <div class="search_item_title"><i class="iconfont titleIcon">&#xe620;</i>歌单</div>
          <div class="search_item_li" v-for="item in searchList.playlists" :key="item.id" @click="openMusicList(item.id)">
            <span v-html="$options.filters.gaoLiang({text:item.name,input:searchInput})"></span>
          </div>
        </div>

        <div class="search_item" v-if=" searchList.mv">
          <div class="search_item_title"><i class="iconfont titleIcon">&#xe62c;</i>MV</div>
          <div class="search_item_li" v-for="item in searchList.mv" :key="item.id" @click="openMv(item.id)">
            <span class="song_name" v-html="$options.filters.gaoLiang({text:item.name,input:searchInput})"></span> -
            <span class="aut_name" v-html="$options.filters.gaoLiang({text:item.artistName,input:searchInput})"></span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {getHotSearch, getSearch, getSuggest} from "@/api/searchApi";
import {mapMutations} from "vuex"
export default {
  name:'SearchBtn',
  data(){
    return{
      openFast:false,  // 是否开启快捷框
      searchInput:'',
      isWrite:false, // 是否正在输入
      hotList:[], // 热门搜索数组
      searchList:[] // 搜索快捷信息数组
    }
  },
  methods:{
    ...mapMutations(['getSearch',
      'getSearchType',
        'openSong',
        'openSinger',
        'openAlbum',
        'openMusicList',
        'openMv'
    ]),
   async getHot(){
     let {data:res} = await getHotSearch()
     this.hotList = res.data
    },
    async suggest(){
      let {data:res1} = await getSearch(this.searchInput,1,4)
      let {data:res2} = await getSearch(this.searchInput,100,2)
      let {data:res3} = await getSearch(this.searchInput,10,2)
      let {data:res4} = await getSearch(this.searchInput,1004,2)
      let {data:res5} = await getSearch(this.searchInput,1000,2)
      this.searchList ={
        songs:res1.result.songs,
        artists:res2.result.artists,
        albums:res3.result.albums,
        mv:res4.result.mvs,
        playlists:res5.result.playlists
      }
      this.$nextTick(()=>{
        this.setHoverW()
      })
    },
    mySearch(text,type){
     this.searchInput=text
     if(text.trim()!==''){
       this.getSearch(text)
       this.getSearchType(type)
         if (type===1 && this.$route.path!=='/home/search/song'){
           this.$router.push('/home/search/song')
         }else if (type===10 && this.$route.path!=='/home/search/album'){
           this.$router.push('/home/search/album')
         }else if (type===1004 && this.$route.path!=='/home/search/mv'){
           this.$router.push('/home/search/mv')
         }else if (type===1000 && this.$route.path!=='/home/search/musicList'){
           this.$router.push('/home/search/musicList')
         }
     }
    },
    setHoverW(){
      let li = document.querySelectorAll('.search_item_li')
      for (let i = 0; i < li.length; i++) {
        li[i].addEventListener('mouseover',()=>{
          let green = li[i].querySelectorAll('.green')
          for (let i = 0; i < green.length; i++) {
            green[i].style.color = 'white'
          }
        })
        li[i].addEventListener('mouseout',()=>{
          let green = li[i].querySelectorAll('.green')
          for (let i = 0; i < green.length; i++) {
            green[i].style.color = '#31C27C'
          }
        })
      }
    }
  },
  created() {
    this.getHot()
  },
  computed:{
    getMySearch(){
      return this.$store.state.mySearch
    }
  },
  watch:{
    openFast(newVal){
        clearTimeout(this.fastBoxTimer)
        clearTimeout(this.fastBoxTimer2)
        if (newVal){
          this.$refs.fastBox.style.display ='block'
          setTimeout(()=>{
            this.$refs.fastBox.style.height ='300px'
          },0)
        }else {
          this.fastBoxTimer = setTimeout(()=>{
            this.$refs.fastBox.style.height ='0px'
            this.fastBoxTimer2 = setTimeout(()=>{
              this.$refs.fastBox.style.display ='none'
            },300) },200)
        }
    },
    searchInput(newVal){
      if(newVal.trim()!==''){
        this.suggest()
        this.isWrite=true
      }else {
        this.isWrite=false
      }
    },
    // 监听vuex里的搜索内容
    getMySearch:{
      handler(newVal){
        this.searchInput = newVal
      }
    }
  },

}
</script>

<style lang="less" scoped>
.search_input_box{
  width: 174px;
  padding: 0 33px 0 11px;
  height: 36px;
  display: inline-block;
  margin-top: 26px;
  line-height: 33px;
  position: relative;
  border: 1px solid #C9C9C9;
  border-radius: 3px;
  margin-left: 20px;
  .search_input{
    font-size: 14px;
    height: 33px;
    outline: none;
    border: none;
  }
  .searchBtn{
    font-size: 30px;
    text-align: center;
    position: absolute;
    top: 0;
    right: 0;
    border: 0;
    width: 33px;
    height: 35px;
    overflow: visible;
    background: transparent;
    color: #7F7F7F;
    cursor: pointer;
    &:hover{
      color:#31C27C;
    }
  }
}
.search_input_fast{
  width: 218px;
  height: 0;
  margin-left: 20px;
  overflow: auto;
  transition: all .3s ease;
  border: 1px solid #C9C9C9;
  border-top: none;
  border-radius: 3px;
  background-color: white;
  z-index: 999;
  padding: 10px 0;
  display: none;
  position: absolute;
}
.hot_box{
  &>.hot_item:nth-child(-n+3){
    &>.hot_index{
      color: red;

    }
  }
}
.hot_item{
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  padding: 0 10px;
  cursor: pointer;
  overflow:hidden;
  text-overflow:ellipsis;
  &:hover{
    background-color: #31C27C;
    color: white!important;
    &>.hot_index {
      color: white!important;
    }
    &>.hot_score{
      color: white!important;
    }
  }
}
.search_input_fast::-webkit-scrollbar{
  width: 5px;
  height: 5px;
}
.search_input_fast::-webkit-scrollbar-thumb{
  border-radius: 5px;
  background-color: #CCCCCC;
}
.search_input_fast::-webkit-scrollbar-track{
  border-radius: 0;
  background-color: #F8F8F8;
}
.item_img{
  height: 12px;
  margin-left: 10px;
}
.hot_index{
  color: #C2C2C2;
  margin-right: 10px;
}
.hot_text{
  margin-right: 10px;
}
.hot_score{
  font-size: 10px;
  color: #999999;
}


.fastSearch_box{
  &>.search_item:not(:last-child){
    margin-bottom: 15px;
  }
  .search_item{
    font-size: 14px;
    &>.search_item_title{
      padding:0 10px;
      color: #999999;
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
  }
  .aut_name{
    color: #999999;
  }
}
.titleIcon{
  font-size: 16px;
  margin-right: 6px;
}

</style>
