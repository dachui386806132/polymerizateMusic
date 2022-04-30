<template>
  <div class="my-like-container">
    <div class="mode_tab">
      <router-link to="/home/mymusic/mylike/musiclist" active-class="active">歌曲{{ songNum }}</router-link>
      <router-link to="/home/mymusic/mylike/musiclists" active-class="active">歌单{{ songListNum }}</router-link>
      <router-link to="/home/mymusic/mylike/album" active-class="active">专辑{{ albumNum }}</router-link>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>

  </div>
</template>

<script>
import {searchLikeAlbumNum, searchLikeSongListNum, searchLikeSongNum} from "@/api/likeApi";

export default {
  name:'MyLike',
  data(){
    return{
      songNum:0,
      albumNum:0,
      songListNum:0
    }
  },
  methods:{
    async getSongNum(){
      this.songNum = await searchLikeSongNum(this.$store.state.user.id)
    },
    async getAlbumNum(){
      this.albumNum = await searchLikeAlbumNum(this.$store.state.user.id)
    },
    async getSongListNum(){
      this.songListNum = await searchLikeSongListNum(this.$store.state.user.id)
    }
  },
  computed:{
    getLikeList(){
      return this.$store.state.likeList
    }
  },
  created() {
    this.getSongNum()
    this.getAlbumNum()
    this.getSongListNum()
  },
  watch:{
    getLikeList:{
      deep:true,
      immediate:true,
      handler(newVal){
        this.getSongNum()
      }
    }
  }
}
</script>


<style lang="less" scoped>
.my-like-container{
  width: 1200px;
  margin: auto;
  .mode_tab{
    display: flex;
    .active{
      color: #31c27c;
    }
    >a{
      font-weight: 350;
      color: black;
      display: block;
      text-decoration: none;
      padding: 15px 60px 10px 0;
      &:hover{
        color: #31c27c;
      }
    }
  }
}

</style>
