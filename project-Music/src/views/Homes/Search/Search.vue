<template>
  <div class="search-container">
    <div class="mod_search">
      <div>
        <SearchInput></SearchInput>
      </div>
      <div class="mod_search_hot">
        热门搜索: <span v-for="item in hotList" @click="getSearch(item.searchWord)">{{ item.searchWord }}</span>
      </div>
    </div>

    <div class="search_type" v-if="$route.path!=='/home/search/song'">
      <span><router-link to="/home/search/song" active-class="active">单曲</router-link></span>
      <span><router-link to="/home/search/album" active-class="active">专辑</router-link></span>
      <span><router-link to="/home/search/mv" active-class="active">MV</router-link></span>
      <span><router-link to="/home/search/musiclist" active-class="active">歌单</router-link></span>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>

import {getHotSearch} from "@/api/searchApi";
import {mapMutations} from "vuex"
import SearchInput from "@/views/Homes/Search/SearchInput";
export default {
  name:'Search',
  data(){
    return{
      hotList:[],
    }
  },
  methods:{
    ...mapMutations(['getSearch']),

    async getHot(){
      let {data:res} = await getHotSearch()
      this.hotList = res.data
    },

  },
  created() {
    this.getHot()
  },
  components:{
    SearchInput
  }
}
</script>

<style lang="less">
.search-container{
  font-size: 14px;
}
.mod_search{
  background-image: url("http://localhost:3001/images/bg_search.webp");
  position: relative;
  padding: 60px 0;
  background-position: 50%;
  background-size: cover;
  color: white;
  height:127px;
  .mod_search_hot{
    width: 70%;
    text-align: center;
    margin:10px auto 0 auto;
    line-height: 30px;
    &>span{
      margin-left: 20px;
      cursor: pointer;
      opacity: .93;
      &:hover{
        opacity:1;
      }
    }
  }
}
/deep/a{
  color: black;
  text-decoration: none;
}
.search_type{
  width: 1200px;
  margin:20px auto 0 auto;
  &>span{
    margin-right: 60px;
    cursor: pointer;
    &>a{
      color: black;
      text-decoration: none;
      &:hover{
        color: #31C27C;
      }
    }
  }
}
.active{
  color: #31C27C!important;
}

</style>
