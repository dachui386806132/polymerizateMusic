import Vue from 'vue'
import Vuex from 'vuex'
import {getIsLoginApi, userListenListApi} from "@/api/usersApi";
import {getMusicMessageApi} from "@/api/musicAPI";
import {addListenLot, removeListenLot} from "@/api/listenSongsApi";
import {getAlbumMsg, getSongList} from "@/api/searchApi";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null, // 存储用户数据
    isOpenDialog: 0, // 登录模态框是否打开的状态
    isStop: false,  //当前歌曲是否暂停

    songList: null, // 现在播放列表的歌曲
    likeList: null , // 当前喜欢列表的歌曲
    songMsg: null, // 当前音乐得数据
    songWords: null, // 当前音乐的歌词
    songUrl: null, // 当前歌曲url路径

    playIndex: 0, // 当前播放的音乐下标
    playLength: 0, // 歌曲的数量
    wordsMoveIndex:0, // 歌词滚动下标
    isLikeSongs:false, // 判断是否喜欢该歌曲
    checkedList:[], // 所有听歌列表的状态

    onlyWords:false, // 是否为纯净模式

    checkedLikeList:[], // 所有喜欢列表的状态

    mySearch:'难忘今宵', // 目前搜索的内容
    mySearchType:1, // 目前搜索的类型


  },
  mutations: {
    // 退出登录
    setLogout(state){
      localStorage.removeItem('token')
      state.user = null
    },
    // 根据传过来的值改变用户信息
    setUserMsg(state,val){
      state.user = val
    },
    // 用户登录
    userLogin(state,val){
      state.user = val
    },
    //  改变登录注册模态框状态
    changeDialogStatus(state,val){
      state.isOpenDialog = val
    },
    // 改变当前喜欢列表的歌曲
    changeLikeList(state,val){
      state.likeList = val
    },
    // 删除被取消喜欢的歌曲
    removeLikeList(state,val){
      state.likeList.some((item,index)=>{
        if (item.id===val){
          state.likeList.splice(index,1)
        }
      })
    },
    // 更新听歌列表
    setSongList(state,val){
      state.songList = val
    },
    // 改变当前播放音乐
    changePlaySongs(state,val){
      state.songMsg = val
    },
    // 改变当前播放音乐的歌词
    changeSongsWords(state,val){
      state.songWords = val
    },
    // 改变当前播放歌曲url地址
    changeSongUrlMsg(state,val){
      state.songUrl = val
    },
    // 改变暂停状态
    changIsStop(state,val){
      state.isStop = val
    },
    // 根据下标改变当前播放的音乐
    changPlayIndex(state,val){
      state.playIndex = val
    },
    // 获取播放列表歌曲数量
    changPlayLength(state,val){
      state.playLength = val
    },
    // 更改wordsMoveIndex歌词滚动下标
    changeWordsMoveIndex(state,val){
      state.wordsMoveIndex = val
    },
    // 修改歌曲喜欢状态
    changeIsLikeSongs(state,val){
      state.isLikeSongs = val
    },
    // 添加checkedList选中的数据
    addCheckedList(state,val){
      state.checkedList.push(val)
    },
    // 修改checkedList选中的数据
    changeCheckedList(state,val){
      state.checkedList.some((item,index)=>{
        if (item.id === val.id){
          state.checkedList[index].status = val.status
          return true
        }
      })
    },
    // 修改checkedList的喜欢数据
    changeCheckedListLike(state,val){
      console.log('changeCheckedListLike执行了')
      state.checkedList.some((item,index)=>{
        if (item.id === val.id){
          state.checkedList[index].like = val.like
          return true
        }
      })
    },
    // 修改checkedList的数据
    setCheckedList(state,val){
      state.checkedList = val
    },
    // 删除checkedList数据
    removeCheckedList(state,val){
      state.checkedList = state.checkedList.filter(item=>item.id!==val)
    },
    // 清空所有歌曲歌曲
    cleanSongsAllMsg(state){
      state.songList = null
      state.songMsg = null
      state.songWords = null
      state.songUrl = null
    },
    // 下载歌曲方法
    downloadSongs(state,val){
      // 使用获取到的blob对象创建的url
      const filePath = val.url // mp3的地址
      fetch(filePath).then(res => res.blob()).then(blob => {
        const a = document.createElement('a')
        document.body.appendChild(a)
        a.style.display = 'none'
        // 使用获取到的blob对象创建的url
        const url = window.URL.createObjectURL(blob)
        a.href = url
        // 指定下载的文件名
        a.download = val.name+'-'+val.author + '.mp3'
        a.click()
        document.body.removeChild(a)
        // 移除blob对象的url
        window.URL.revokeObjectURL(url)
      })
    },
    // onlyWords纯净模式状态更改
    changeOnlyWords(state,val){
      state.onlyWords = val
    },
    // 修改checkedLikeList(用户列表选中状态)的数据
    changeCheckedLikeList(state,val){
      if (val === null){
        state.checkedLikeList = []
      }else {
         state.checkedLikeList.push(val)
      }
    },
    // 修改checkedLikeList(用户列表选中状态)
    changeCheckedLikeStatus(state,val){
      state.checkedLikeList.some((item,index)=>{
        if(item.id===val.id){
          state.checkedLikeList[index].status = val.status
          return true
        }
      })
    },
    // 播放所有歌曲按钮
    async playAll(state,val){
      let userId = state.user.id
      let idList = []
      for (let i = val.length-1; i >=0; i--) {
        idList.push(val[i].id)
      }
      await removeListenLot(userId)
      await addListenLot(userId,idList)
      window.open('http://localhost:8080/play?id='+idList[idList.length-1],'_blank')
    },
    // 播放所有歌曲按钮
    async playSong(state,val){
      let userId = state.user.id
      let idList = []
      for (let i = val.length-1; i >=0; i--) {
        idList.push(val[i].id)
      }
      await addListenLot(userId,idList)
      window.open('http://localhost:8080/play?id='+idList[idList.length-1],'_blank')
    },
    // 获取目前搜索框的内容
    getSearch(state,val){
      state.mySearch = val
    },
    // 获取目前搜索的类型
    getSearchType(state,val){
      state.mySearchType = val
    },
    // 跳转到歌曲详情
    openSong(state,val){
      window.open('http://localhost:8080/home/mysong?id='+val,'_blank')
    },
    // 跳转到歌手详情
    openSinger(state,val){
      window.open('http://localhost:8080/home/Singer?id='+val,'_blank')
    },
    // 跳转到专辑详情
    openAlbum(state,val){
      window.open('http://localhost:8080/home/myalbum?id='+val,'_blank')
    },
    // 跳转到歌单详情
    openMusicList(state,val){
      window.open('http://localhost:8080/home/songlist?id='+val,'_blank')
    },
    // 跳转到mv详情
    openMv(state,val){
      window.open('http://localhost:8080/home/mv?id='+val,'_blank')
    },
    // 播放此歌曲
    listenSong(state,val){
      window.open('http://localhost:8080/play?id='+val,'_blank')
    },
  },

  actions: {
    async getUserMsg(context){
      let {data:res} =  await getIsLoginApi(localStorage.getItem('token'))
      context.commit('setUserMsg', res.data[0])
    },

    // 播放歌单所有歌曲
    async playAlbumSongs(context,args){
      args.e.stopPropagation()
      let {data:res} = await getAlbumMsg(args.id)
      context.commit('playAll', res.songs)
    },
    // 播放歌单所有歌曲
    async playSongListSongs(context,args){
      args.e.stopPropagation()
      let {data:res} = await getSongList(args.id)
      let idArr = []
      res.playlist.trackIds.forEach((item,index)=>{
          idArr.push(item.id)
      })
      let {data:res2} = await getMusicMessageApi(idArr)
      context.commit('playAll', res2.songs)
    }
  },
  getters:{
      // 监听用户的数据变化
      showUserMsg: state=>{
        if (state.user){
          return {
            id:state.user.id,
            username:state.user.username,
            headImg:'http://localhost:3001/'+state.user.user_img,
            userStr:state.user.user_str,
          }
        }
      },
      // 监听模态框的变化
      showOpenDialog:state=>{
          return state.isOpenDialog
      },
      // 监听当前歌曲的数据变化
      showNowSongMsg:state=>{
        return state.songMsg
      },
      showChoiceLike:state=>{
        let arr = []
        state.checkedLikeList.forEach(item=>{if (item.status)arr.push(item.id)})
        return arr
      },
  }
})
