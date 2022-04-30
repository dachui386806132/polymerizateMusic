<template>
  <div class="home-category-container">
    <div class="home_category_choice_box">
      <div>
        <div>语种</div>
        <div class="category_type_box">
          <span class="choice_title">华语</span>
          <span>欧美</span>
          <span>日语</span>
          <span>韩语</span>
          <span>粤语</span>
        </div>
      </div>
      <div>
        <div>风格</div>
        <div class="category_type_box">
          <span>流行</span>
          <span>摇滚</span>
          <span>民谣</span>
          <span>电子</span>
          <span>舞曲</span>
          <span>说唱</span>
          <span>轻音乐</span>
          <span>爵士</span>
          <span>乡村</span>
          <span>R&B/Soul</span>
          <span>古典</span>
          <span>民族</span>
          <span>英伦</span>
          <span>金属</span>
          <span>蓝调</span>
          <span>雷鬼</span>
          <span>世界音乐</span>
          <span>拉丁</span>
          <span>New Age</span>
          <span>古风</span>
          <span>Bossa Nova</span>
        </div>
      </div>
      <div>
        <div>场景</div>
        <div class="category_type_box">
          <span>清晨</span>
          <span>夜晚</span>
          <span>学习</span>
          <span>工作</span>
          <span>午休</span>
          <span>下午茶</span>
          <span>地铁</span>
          <span>驾车</span>
          <span>运动</span>
          <span>旅行</span>
          <span>散步</span>
          <span>酒吧</span>
        </div>
      </div>
      <div>
        <div>情感</div>
        <div class="category_type_box">
          <span>怀旧</span>
          <span>清新</span>
          <span>浪漫</span>
          <span>伤感</span>
          <span>治愈</span>
          <span>放松</span>
          <span>孤独</span>
          <span>感动</span>
          <span>兴奋</span>
          <span>快乐</span>
          <span>安静</span>
          <span>思念</span>
        </div>
      </div>
      <div>
        <div>主题</div>
        <div class="category_type_box">
          <span>综艺</span>
          <span>影视原声</span>
          <span>ACG</span>
          <span>儿童</span>
          <span>校园</span>
          <span>游戏</span>
          <span>70后</span>
          <span>80后</span>
          <span>90后</span>
          <span>网络歌曲</span>
          <span>KTV</span>
          <span>经典</span>
          <span>翻唱</span>
          <span>吉他</span>
          <span>钢琴</span>
          <span>器乐</span>
          <span>榜单</span>
          <span>00后</span>
        </div>
      </div>
    </div>
    <div v-if="!playlists" class="not_find_song_list">
      没有找到相关的歌单
    </div>
    <div v-loading="loading" v-else-if="loading" class="loading_box"></div>
    <div v-else class="home_category_center_box" ref="homeCategoryCenter">
      <div class="song_list_item" v-for="item in playlists">
        <div class="song_list_img">
          <img v-lazy="item.coverImgUrl" :key="item.coverImgUrl" alt="">
          <div class="play_btn" @click="openAlbum(item.id)">
            <i class="iconfont play_icon" @click="playAlbumSongs({id:item.id,e:$event})">&#xe615;</i>
          </div>
        </div>
        <div class="song_list_msg">
          <div @click="openAlbum(item.id)"> <span class="hoverGreen">{{ item.name }}</span></div>
          <div @click="openSinger(item.artist.id)"> <span class="hoverGreen">{{ item.creator.nickname }}</span></div>
          <div>{{ item.publishTime | handlerPublishDayLine }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getTopPlayList} from "@/api/searchApi";

export default {
  name:'HomeCategory',
  data(){
    return{
      cat:'',
      playlists:null,
      loading:false
    }
  },
  methods:{
    async getMsg(cat){
      this.loading = true
      let {data:res} = await getTopPlayList(cat)
      if (res.playlists.length === 0){
        this.playlists = null
      }else {
        this.playlists = res.playlists
      }
      this.loading = false
    },
    // 设置按钮样式,和滚动加载功能
    setBtn() {
     this.$nextTick(()=>{
       setTimeout(()=>{
         let lines = document.querySelectorAll('.category_type_box>span')
         for (let j = 0; j < lines.length; j++) {
           lines[j].addEventListener('click', () => {
             this.getMsg(lines[j].innerHTML)
             for (let k = 0; k < lines.length; k++) {
               lines[k].removeAttribute('id')
             }
             lines[j].setAttribute('id', 'category_tag_select')
           })
           if (lines[j].className === 'choice_title') {
             lines[j].setAttribute('id', 'category_tag_select')
           }
         }
       },50)


     })
    }
  },
  created() {
    this.getMsg('华语')
  },
  mounted() {
    this.setBtn()
  }
}
</script>

<style lang="less" scoped>
.home-category-container{
 width: 1200px;
  margin: auto;
  .home_category_choice_box{
    padding: 15px 0;
    #category_tag_select{
      background-color: #31c27c!important;
      color: #fff!important;
    }
    &>div{
      padding: 0 10px;
      border-right: 1px solid #EEEEF0;
      margin-bottom: 16px;
      &>div:first-child{
        color: #999999;
        font-weight: 600;
        margin-bottom:5px;
      }
      .category_type_box{
        display: flex;
        flex-wrap: wrap;
        span{
          padding: 2px 6px;
          margin-right: 10px;
          cursor: pointer;

          &:hover{
            color: #3bd389;
          }
        }
      }
    }
  }
  .home_category_center_box{
    display: flex;
    flex-wrap: wrap;
    .song_list_item{
      user-select: none;
      width: 224px;
      height: 283px;
      margin-right: 16px;
      margin-bottom: 50px;
      .song_list_img{
        width: 224px;
        height: 224px;
        overflow: hidden;
        cursor: pointer;
        position: relative;
        &:hover{
          &>img{
            width: 240px;
            height: 240px;
            margin-left: -8px;
            margin-top: -8px;
          }
          &>.play_btn{
            opacity: 1;
            &>.play_icon{
              width: 66px;
              height: 66px;
              line-height: 66px;
              font-size: 30px;
              margin: 79px auto 0 auto;
            }
          }
        }
        &>img{
          width: 224px;
          height: 224px;
          transition: all .5s ease;
        }

        .play_btn{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition: all .5s ease;
          opacity: 0;
          background-color: rgba(0, 0, 0, 0.15);
          .play_icon{
            transition: all .5s ease;
            width: 40px;
            height: 40px;
            display: block;
            background-color: #F2F2F2;
            text-align: center;
            line-height:40px;
            border-radius: 100%;
            color: #545454;
            font-size: 20px;
            margin: 92px auto 0 auto;
          }
        }
      }

      .song_list_msg{
        font-size: 14px;
        margin-top: 15px;
        &>div{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          height: 22px;
          font-size: 14px;
          &:not(:nth-child(1)){
            color: #999;
          }
        }

      }
    }
  }

}
.not_find_song_list{
  width: 1200px;
  margin: auto;
  height: 200px;
  line-height: 200px;
  text-align: center;
}
/deep/.el-loading-mask{
  background-color: #F4F4F4;
}
.loading_box{
  width: 1200px;
  margin: auto;
}
</style>
