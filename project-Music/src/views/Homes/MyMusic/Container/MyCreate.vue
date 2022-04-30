<template>
  <div class="my-create-container">

    <div v-loading="loading" v-if="loading" class="loading_box">

    </div>
    <div v-else-if="songList.length===0">
      <NotFind></NotFind>
    </div>
    <div v-else>
      <CreatHead @ListType="getListType" @refreshList="refreshList"></CreatHead>
      <div class="creat_center" v-if="listType===1">
        <CreatItem v-for="item in songList" :key="item.id"
                   :id="item.id"
                   :list_img="item.list_img"
                   :list_name="item.list_name"
        ></CreatItem>
      </div>
      <div class="creat_center" v-if="listType===2">
        <div class="list_title_box">
          <div>歌单</div>
          <div>曲目数</div>
          <div>收听</div>
        </div>
        <CreatItemT v-for="item in songList" :key="item.id"
                    :id="item.id"
                    :list_img="item.list_img"
                    :list_name="item.list_name"
                    :listen_num="item.listen_num"
                    :type="item.type.data[0]"
                    @removeList="getRemoveList"
        ></CreatItemT>

      </div>
    </div>


  </div>
</template>

<script>
import CreatHead from "@/views/Homes/MyMusic/Container/MyCreate/CreatHead";
import CreatItem from "@/views/Homes/MyMusic/Container/MyCreate/CreatItem";
import CreatItemT from "@/views/Homes/MyMusic/Container/MyCreate/CreatItemT";
import NotFind from "@/components/Little/MyNotFind";
import {getSongList} from "@/api/songListApi";
import {mapGetters} from "vuex"

export default {
  name:'MyCreate',
  data(){
    return{
      listType:1,
      songList:[],
      loading:false
    }
  },
  components:{
    CreatHead,
    CreatItem,
    CreatItemT,
    NotFind
  },
  computed:{
    ...mapGetters(['showUserMsg']),
  },
  methods:{
    // 获取到列表展示的方式
    getListType(val){
      this.listType=val
    },
    // 发送请求,加载歌单页面
    async getList(){
      this.loading = true
       let {data:res} = await getSongList(this.$store.state.user.id)
      this.songList = res.data
      this.loading = false

    },
    // 触发刷新歌单页面
    refreshList(val){
      this.getList()
    },
    // 收到删除的歌单id
    getRemoveList(id){
      this.songList = this.songList.filter(item=>item.id!==id)
    }
  },
  created() {
    this.getList()
  },
}
</script>

<style lang="less" scoped>
  .my-create-container{
    width: 1200px;
    margin: auto;
    .creat_center{
      width: 1200px;
      margin:20px auto 50px auto;
      display: flex;
      flex-wrap: wrap;
    }
    .list_title_box{
      height: 50px;
      width: 100%;
      line-height: 50px;
      padding: 0 20px;
      display: flex;
      color: #999999;
      font-size: 14px;
      text-align: left;
      &>div{
        &:nth-child(1){
          width: 46%;
        }&:nth-child(2){
          width: 46%;
        }&:nth-child(3){
          width: 8%;
        }
      }
    }
  }
  .loading_box{
    width: 100%;
    height: 664px;
  }
</style>
