<template>
  <div class="home-index-container">
    <HotSongList></HotSongList>
    <NewSongs></NewSongs>
    <Wonderful></Wonderful>
    <NewAlbum></NewAlbum>
    <NewCharts></NewCharts>
    <NewMv></NewMv>
  </div>
</template>

<script>
import HotSongList from "@/views/Homes/MusicHall/HomeIndex/HotSongList";
import NewSongs from "@/views/Homes/MusicHall/HomeIndex/NewSongs";
import Wonderful from "@/views/Homes/MusicHall/HomeIndex/Wonderful";
import NewAlbum from "@/views/Homes/MusicHall/HomeIndex/NewAlbum";
import NewCharts from "@/views/Homes/MusicHall/HomeIndex/NewCharts";
import NewMv from "@/views/Homes/MusicHall/HomeIndex/NewMv";

export default {
  name:'HomeIndex',
  components:{
    HotSongList,
    NewSongs,
    Wonderful,
    NewAlbum,
    NewCharts,
    NewMv
  },
  data(){
    return{

    }
  },
  created() {

  },
  mounted() {

  },
  methods:{
  }
}
</script>

<style lang="less" scoped>
.home-index-container{

}
</style>
