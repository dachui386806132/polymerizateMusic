import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home'
import Play from "@/views/Play";

import MusicHall from "@/views/Homes/MusicHall/MusicHall";
import HomeAlbum from "@/views/Homes/MusicHall/HomeAlbum";
import HomeAlbumMall from "@/views/Homes/MusicHall/HomeAlbumMall";
import HomeCategory from "@/views/Homes/MusicHall/HomeCategory";
import HomeIndex from "@/views/Homes/MusicHall/HomeIndex";
import HomeMvList from "@/views/Homes/MusicHall/HomeMvList";
import HomeRadio from "@/views/Homes/MusicHall/HomeRadio";
import HomeSinger from "@/views/Homes/MusicHall/HomeSinger";
import HomeTopList from "@/views/Homes/MusicHall/HomeTopList";


import ClientSide from "@/views/Homes/ClientSide/ClientSide";
import MyMusic from "@/views/Homes/MyMusic/MyMusic";
import Openness from "@/views/Homes/Openness/Openness";
import Vip from "@/views/Homes/Vip/Vip";

import MyLike from "@/views/Homes/MyMusic/Container/MyLike";
import MusicList from "@/views/Homes/MyMusic/Container/MyLike/MusicList";
import MusicLists from "@/views/Homes/MyMusic/Container/MyLike/MusicLists";
import Album from "@/views/Homes/MyMusic/Container/MyLike/Album";


import MyCreate from "@/views/Homes/MyMusic/Container/MyCreate";
import ListMsg from "@/views/Homes/MyMusic/Container/MyCreate/CreateMsg";

import MyMessage from "@/views/Homes/MyMusic/Container/MyMessage";

import Search from "@/views/Homes/Search/Search";
import SearchSong from "@/views/Homes/Search/SearchSong";
import SearchAlbum from "@/views/Homes/Search/SearchAlbum";
import SearchMv from "@/views/Homes/Search/SearchMv";
import SearchMusicList from "@/views/Homes/Search/SearchMusicList";

import SongList from "@/components/Little/SongList";
import Mv from "@/components/Little/Mv";
import MyAlbum from "@/components/Little/Album";
import MySong from "@/components/Little/Song";
import Singer from "@/components/Little/Singer";

Vue.use(VueRouter)

const routes = [
  {path: '/', redirect:'/home'},
  {path: '/home', component: Home,redirect:'/home/musichall',
    children:[
      {path: 'musichall', component: MusicHall,redirect:'/home/musichall/index',
        children:[
          {path: 'index', component: HomeIndex},
          {path: 'album', component: HomeAlbum},
          {path: 'albummall', component: HomeAlbumMall},
          {path: 'category', component: HomeCategory},
          {path: 'mvlist', component: HomeMvList},
          {path: 'radio', component: HomeRadio},
          {path: 'singer', component: HomeSinger},
          {path: 'toplist', component: HomeTopList},
        ]
      },
      {path: 'mymusic', component: MyMusic,redirect:'/home/mymusic/mylike',
        children:[
          {path: 'mylike', component: MyLike,redirect:'/home/mymusic/mylike/musiclist',
            children:[
               {path: 'musiclist', component: MusicList},
               {path: 'musiclists', component: MusicLists},
               {path: 'album', component: Album}
            ]},
          {path: 'mycreate', component: MyCreate},
          {path: 'mymessage', component: MyMessage},
        ]
      },
      {path: 'listmsg', component: ListMsg},
      {path: 'search', component: Search,
        children:[
          {path: 'song', component: SearchSong},
          {path: 'album', component: SearchAlbum},
          {path: 'mv', component: SearchMv},
          {path: 'musiclist', component: SearchMusicList},
        ]
      },
      {path: 'songlist', component: SongList},
      {path: 'myalbum', component: MyAlbum},
      {path: 'MV', component: Mv},
      {path: 'mysong', component: MySong},
      {path: 'singer', component: Singer},
    ]},
  {path: '/play', component: Play},
  {path: '/clientside', component: ClientSide},
  {path: '/vip', component: Vip},
  {path: '/openness', component: Openness},
  {path: '*', redirect:'/home'},
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
